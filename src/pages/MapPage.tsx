import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Participant } from '../lib/mock-data';
import { MapPin, Navigation, Phone, Instagram } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

interface MapPageProps {
  participants: Participant[];
  onNavigate: (page: string, id?: string) => void;
}

export function MapPage({ participants, onNavigate }: MapPageProps) {
  const { t } = useLanguage();
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  
  // Calculate center of Seville
  const centerLat = 37.3886;
  const centerLng = -5.9953;
  
  return (
    <div className="min-h-screen bg-[var(--sb-gray-100)]">
      <div className="max-w-[1200px] mx-auto px-4 py-8 md:py-12">
        <h1 className="font-display text-3xl md:text-5xl mb-8">{t.nav.map}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Placeholder */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-[var(--sb-border)] overflow-hidden">
              <div className="aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-200 relative">
                {/* Simple mock map visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <MapPin size={48} className="mx-auto mb-4 text-[var(--sb-orange)]" />
                    <p className="text-lg mb-2">Mapa Interactivo</p>
                    <p className="text-sm text-muted-foreground max-w-md">
                      En producción, aquí se mostraría un mapa interactivo con todos los participantes.
                      Haz clic en la lista para ver los detalles de cada local.
                    </p>
                  </div>
                </div>
                
                {/* Mock pins scattered */}
                {participants.slice(0, 8).map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedParticipant(p)}
                    className="absolute w-8 h-8 bg-[var(--sb-orange)] rounded-full border-4 border-white shadow-lg hover:scale-110 transition-transform cursor-pointer"
                    style={{
                      left: `${20 + (i % 4) * 20}%`,
                      top: `${20 + Math.floor(i / 4) * 40}%`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Participants List */}
          <div className="space-y-4">
            <h2 className="font-display text-xl">Participantes ({participants.length})</h2>
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {participants.map((participant) => (
                <button
                  key={participant.id}
                  onClick={() => setSelectedParticipant(participant)}
                  className={`w-full bg-white rounded-xl border-2 p-4 text-left transition-all hover:shadow-md ${
                    selectedParticipant?.id === participant.id
                      ? 'border-[var(--sb-orange)]'
                      : 'border-[var(--sb-border)]'
                  }`}
                >
                  <div className="flex gap-3">
                    <img
                      src={participant.image}
                      alt={participant.name}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-sm mb-1 truncate">{participant.name}</h3>
                      <p className="text-xs text-muted-foreground mb-2">
                        {participant.district}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {participant.category}
                      </Badge>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Selected Participant Detail */}
        {selectedParticipant && (
          <div className="mt-6 bg-white rounded-2xl border border-[var(--sb-border)] p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img
                  src={selectedParticipant.image}
                  alt={selectedParticipant.name}
                  className="w-full aspect-[4/3] object-cover rounded-xl mb-4"
                />
              </div>
              
              <div>
                <h2 className="font-display text-2xl mb-2">{selectedParticipant.name}</h2>
                <p className="text-muted-foreground mb-4">{selectedParticipant.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="text-[var(--sb-orange)] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm">{t.participants.address}</div>
                      <div>{selectedParticipant.address}</div>
                    </div>
                  </div>
                  
                  {selectedParticipant.phone && (
                    <div className="flex items-center gap-3">
                      <Phone size={20} className="text-[var(--sb-orange)]" />
                      <a href={`tel:${selectedParticipant.phone}`} className="hover:underline">
                        {selectedParticipant.phone}
                      </a>
                    </div>
                  )}
                  
                  {selectedParticipant.instagram && (
                    <div className="flex items-center gap-3">
                      <Instagram size={20} className="text-[var(--sb-orange)]" />
                      <a
                        href={`https://instagram.com/${selectedParticipant.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {selectedParticipant.instagram}
                      </a>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=${selectedParticipant.lat},${selectedParticipant.lng}`,
                        '_blank'
                      )
                    }
                    variant="outline"
                    className="flex-1"
                  >
                    <Navigation size={18} className="mr-2" />
                    {t.participants.directions}
                  </Button>
                  <Button
                    onClick={() => onNavigate('participant-detail', selectedParticipant.id)}
                    className="flex-1 bg-[var(--sb-orange)] hover:bg-[#E55F00] text-white"
                  >
                    {t.participants.voteHere}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
