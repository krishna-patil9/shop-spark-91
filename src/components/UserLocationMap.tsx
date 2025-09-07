import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MapPin, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

/// <reference types="google.maps" />

interface UserLocationMapProps {
  className?: string;
}

const UserLocationMap: React.FC<UserLocationMapProps> = ({ className = "" }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const initMap = async () => {
      try {
        // Get Google Maps API key from Supabase Edge Function
        const { data, error: secretError } = await supabase.functions.invoke('get-google-maps-key');
        
        if (secretError) {
          console.error('Error getting API key:', secretError);
          setError('Unable to load maps. Please contact support.');
          setLoading(false);
          return;
        }

        const apiKey = data?.apiKey;
        if (!apiKey) {
          setError('Google Maps API key not configured.');
          setLoading(false);
          return;
        }

        const loader = new Loader({
          apiKey: apiKey,
          version: 'weekly',
          libraries: ['places', 'geometry']
        });

        await loader.load();

        // Get user's current location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              setUserLocation(location);

              // Initialize map
              if (mapRef.current) {
                const mapInstance = new google.maps.Map(mapRef.current, {
                  center: location,
                  zoom: 15,
                  styles: [
                    {
                      featureType: 'poi',
                      elementType: 'labels',
                      stylers: [{ visibility: 'off' }]
                    }
                  ]
                });

                // Add marker at user's location
                const marker = new google.maps.Marker({
                  position: location,
                  map: mapInstance,
                  title: 'Your Location',
                  icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 10,
                    fillColor: '#3B82F6',
                    fillOpacity: 1,
                    strokeColor: '#FFFFFF',
                    strokeWeight: 2,
                  }
                });

                setMap(mapInstance);

                // Get address from coordinates
                const geocoder = new google.maps.Geocoder();
                geocoder.geocode({ location }, (results, status) => {
                  if (status === 'OK' && results?.[0]) {
                    setAddress(results[0].formatted_address);
                  } else {
                    setAddress(`${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`);
                  }
                });
              }
              setLoading(false);
            },
            (error) => {
              console.error('Geolocation error:', error);
              setError('Location access denied. Please enable location services.');
              setLoading(false);
            }
          );
        } else {
          setError('Geolocation is not supported by this browser.');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error loading map:', error);
        setError('Failed to load map. Please try again.');
        setLoading(false);
      }
    };

    initMap();
  }, []);

  if (loading) {
    return (
      <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
        <div className="flex items-center justify-center space-x-2">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span className="text-sm text-muted-foreground">Loading map...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
        <div className="flex items-center space-x-2 text-destructive">
          <MapPin className="h-5 w-5" />
          <span className="text-sm">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-lg overflow-hidden ${className}`}>
      <div ref={mapRef} className="w-full h-64" />
      {address && (
        <div className="p-4 bg-secondary/20">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Deliver to:</span>
            <span className="text-sm text-muted-foreground">{address}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserLocationMap;