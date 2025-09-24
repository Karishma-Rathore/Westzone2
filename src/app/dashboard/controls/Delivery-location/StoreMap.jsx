'use client';

import { useEffect, useState } from 'react';

export default function StoreMap({ center = [19.076, 72.8777], polygonCoords = [] }) {
  const [LeafletMap, setLeafletMap] = useState(null);

  useEffect(() => {
    // dynamic import only on client-side
    import('react-leaflet').then((mod) => {
      import('leaflet/dist/leaflet.css');
      const { MapContainer, TileLayer, Marker, Polygon } = mod;

      // Fix default marker icon
      import('leaflet').then((L) => {
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        });

        setLeafletMap(() => () => (
          <MapContainer center={center} zoom={16} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={center} />
            {polygonCoords.length > 0 && (
              <Polygon
                positions={polygonCoords.map(([lng, lat]) => [lat, lng])}
                pathOptions={{ color: 'blue', fillOpacity: 0.2 }}
              />
            )}
          </MapContainer>
        ));
      });
    });
  }, [center, polygonCoords]);

  if (!LeafletMap) return <div className="h-96 w-full bg-gray-100 flex items-center justify-center">Loading Map...</div>;

  return <LeafletMap />;
}
