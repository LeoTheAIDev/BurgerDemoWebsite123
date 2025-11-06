import { MapPin, TrendingUp, TrendingDown } from 'lucide-react';
import { Participant } from '../lib/mock-data';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';

interface TarjetaParticipanteProps {
  participant: Participant;
  position?: number;
  averageScore?: number;
  voteCount?: number;
  trend?: 'up' | 'down' | 'stable';
  onVote?: () => void;
  onViewDetails?: () => void;
}

export function TarjetaParticipante({
  participant,
  position,
  averageScore,
  voteCount,
  trend,
  onVote,
  onViewDetails,
}: TarjetaParticipanteProps) {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white rounded-2xl border border-[var(--sb-border)] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--sb-gray-100)]">
        <img
          src={participant.image}
          alt={participant.name}
          className="w-full h-full object-cover"
        />
        
        {/* Position Badge */}
        {position && (
          <div className="absolute top-3 left-3 bg-[var(--sb-orange)] text-white px-3 py-1 rounded-full flex items-center gap-2">
            <span className="font-display">#{position}</span>
            {trend === 'up' && <TrendingUp size={16} />}
            {trend === 'down' && <TrendingDown size={16} />}
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <Badge className="bg-white/90 text-[var(--sb-carbon)] border-0">
            {participant.category}
          </Badge>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-display mb-2">{participant.name}</h3>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <MapPin size={16} />
          <span>{participant.district}</span>
          <span>•</span>
          <span>{participant.price.toFixed(2)}€</span>
        </div>
        
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {participant.isGlutenFree && (
            <Badge variant="outline" className="text-xs">
              Sin Gluten
            </Badge>
          )}
          {participant.isVeggie && (
            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
              Veggie
            </Badge>
          )}
        </div>
        
        {/* Score */}
        {averageScore !== undefined && (
          <div className="flex items-center justify-between mb-4 p-3 bg-[var(--sb-gray-100)] rounded-lg">
            <div>
              <div className="text-sm text-muted-foreground">{t.ranking.score}</div>
              <div className="text-2xl">{averageScore.toFixed(2)}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">{t.ranking.votes}</div>
              <div className="text-2xl">{voteCount}</div>
            </div>
          </div>
        )}
        
        {/* Actions */}
        <div className="flex gap-2">
          {onViewDetails && (
            <Button
              variant="outline"
              className="flex-1"
              onClick={onViewDetails}
            >
              {t.participants.viewDetails}
            </Button>
          )}
          {onVote && (
            <Button
              className="flex-1 bg-[var(--sb-orange)] hover:bg-[#E55F00] text-white"
              onClick={onVote}
            >
              {t.participants.voteHere}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
