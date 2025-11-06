import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Participant, Category, District } from '../lib/mock-data';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { MapPin, Star } from 'lucide-react';

interface BrandsPageProps {
  participants: Participant[];
  onNavigate: (page: string, id?: string) => void;
}

export function BrandsPage({ participants, onNavigate }: BrandsPageProps) {
  const { t } = useLanguage();
  const [activeView, setActiveView] = useState<'all' | 'category' | 'district'>('all');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  
  // Get unique categories and districts
  const categories: Category[] = ['Clásica', 'Smash', 'Gourmet', 'Veggie', 'BBQ', 'Picante'];
  const districts: District[] = ['Triana', 'Nervión', 'Alameda', 'Los Remedios', 'Macarena', 'Centro', 'Bellavista', 'San Pablo'];
  
  // Filter participants
  let filteredParticipants = participants;
  if (activeView === 'category' && selectedFilter) {
    filteredParticipants = participants.filter(p => p.category === selectedFilter);
  } else if (activeView === 'district' && selectedFilter) {
    filteredParticipants = participants.filter(p => p.district === selectedFilter);
  }
  
  // Group by category or district
  const groupedParticipants = activeView === 'category' 
    ? categories.map(cat => ({
        name: cat,
        items: participants.filter(p => p.category === cat)
      }))
    : activeView === 'district'
    ? districts.map(dist => ({
        name: dist,
        items: participants.filter(p => p.district === dist)
      }))
    : [{ name: 'all', items: participants }];
  
  const BurgerCard = ({ participant }: { participant: Participant }) => (
    <div className="group bg-white rounded-2xl border border-[var(--sb-border)] overflow-hidden hover:shadow-lg transition-all hover:border-[var(--sb-orange)]">
      <button
        onClick={() => onNavigate('participant-detail', participant.id)}
        className="w-full text-left"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--sb-gray-100)]">
          <img
            src={participant.image}
            alt={participant.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {/* Category badge */}
          <div className="absolute top-3 right-3">
            <Badge className="bg-[var(--sb-orange)] text-white border-0">
              {participant.category}
            </Badge>
          </div>
          
          {/* Price */}
          <div className="absolute top-3 left-3">
            <div className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="font-display">{participant.price.toFixed(2)}€</span>
            </div>
          </div>
          
          {/* Dietary badges */}
          {(participant.isGlutenFree || participant.isVeggie) && (
            <div className="absolute bottom-3 left-3 flex gap-2">
              {participant.isGlutenFree && (
                <Badge variant="outline" className="bg-white/95 text-xs">
                  Sin Gluten
                </Badge>
              )}
              {participant.isVeggie && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                  Veggie
                </Badge>
              )}
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-4">
          <h3 className="font-display text-lg mb-2 group-hover:text-[var(--sb-orange)] transition-colors">
            {participant.name}
          </h3>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <MapPin size={16} />
            <span>{participant.district}</span>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {participant.description}
          </p>
        </div>
      </button>
      
      <div className="px-4 pb-4">
        <Button
          onClick={() => onNavigate('participant-detail', participant.id)}
          className="w-full bg-[var(--sb-orange)] hover:bg-[#E55F00] text-white"
          size="sm"
        >
          {t.participants.voteHere}
        </Button>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-[var(--sb-gray-100)]">
      <div className="max-w-[1400px] mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl md:text-6xl mb-4">
            {t.participants.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            {t.participants.subtitle}
          </p>
          
          {/* View Toggles */}
          <div className="inline-flex items-center gap-2 bg-white border border-[var(--sb-border)] rounded-2xl p-1">
            <Button
              onClick={() => {
                setActiveView('all');
                setSelectedFilter(null);
              }}
              variant={activeView === 'all' ? 'default' : 'ghost'}
              className={activeView === 'all' ? 'bg-[var(--sb-orange)] text-white' : ''}
            >
              {t.participants.allBurgers}
            </Button>
            <Button
              onClick={() => {
                setActiveView('category');
                setSelectedFilter(null);
              }}
              variant={activeView === 'category' ? 'default' : 'ghost'}
              className={activeView === 'category' ? 'bg-[var(--sb-orange)] text-white' : ''}
            >
              {t.participants.byCategory}
            </Button>
            <Button
              onClick={() => {
                setActiveView('district');
                setSelectedFilter(null);
              }}
              variant={activeView === 'district' ? 'default' : 'ghost'}
              className={activeView === 'district' ? 'bg-[var(--sb-orange)] text-white' : ''}
            >
              {t.participants.byDistrict}
            </Button>
          </div>
        </div>
        
        {/* Category/District Filters */}
        {activeView !== 'all' && (
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {(activeView === 'category' ? categories : districts).map((item) => {
              const count = participants.filter(p => 
                activeView === 'category' ? p.category === item : p.district === item
              ).length;
              
              return (
                <button
                  key={item}
                  onClick={() => setSelectedFilter(selectedFilter === item ? null : item)}
                  className={`px-4 py-2 rounded-xl border-2 transition-all ${
                    selectedFilter === item
                      ? 'bg-[var(--sb-orange)] border-[var(--sb-orange)] text-white'
                      : 'bg-white border-[var(--sb-border)] hover:border-[var(--sb-orange)]'
                  }`}
                >
                  {item} <span className="opacity-70">({count})</span>
                </button>
              );
            })}
          </div>
        )}
        
        {/* All View - Simple Grid */}
        {activeView === 'all' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {participants.map((participant) => (
              <BurgerCard key={participant.id} participant={participant} />
            ))}
          </div>
        )}
        
        {/* Grouped Views */}
        {activeView !== 'all' && (
          <div className="space-y-12">
            {groupedParticipants.map((group) => {
              if (group.items.length === 0) return null;
              if (selectedFilter && group.name !== selectedFilter) return null;
              
              return (
                <div key={group.name}>
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="font-display text-3xl">{group.name}</h2>
                    <div className="flex-1 h-px bg-[var(--sb-border)]" />
                    <span className="text-muted-foreground">
                      {group.items.length} {group.items.length === 1 ? 'burger' : 'burgers'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {group.items.map((participant) => (
                      <BurgerCard key={participant.id} participant={participant} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {/* Stats Footer */}
        <div className="mt-12 bg-gradient-to-br from-[var(--sb-orange)] to-[#E55F00] rounded-2xl p-8 text-center text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="font-display text-4xl mb-2">{participants.length}</div>
              <div className="text-white/90">Hamburguesas Participantes</div>
            </div>
            <div>
              <div className="font-display text-4xl mb-2">{categories.length}</div>
              <div className="text-white/90">Categorías</div>
            </div>
            <div>
              <div className="font-display text-4xl mb-2">{districts.length}</div>
              <div className="text-white/90">Distritos</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
