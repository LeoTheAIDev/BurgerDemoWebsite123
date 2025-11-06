import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Participant } from '../lib/mock-data';
import { VoteData } from './VotePage';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Slider } from '../components/ui/slider';
import { Textarea } from '../components/ui/textarea';
import { MapPin, Clock, Phone, Instagram, ChevronLeft, Star, TrendingUp } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ParticipantDetailPageProps {
  participant: Participant;
  onNavigate: (page: string, id?: string) => void;
  onVoteSubmit: (participantId: string, voteData: VoteData) => void;
  currentScore?: number;
  currentVotes?: number;
  currentPosition?: number;
}

export function ParticipantDetailPage({
  participant,
  onNavigate,
  onVoteSubmit,
  currentScore,
  currentVotes,
  currentPosition,
}: ParticipantDetailPageProps) {
  const { t } = useLanguage();
  
  const [voteData, setVoteData] = useState<VoteData>({
    taste: 5,
    bun: 5,
    cooking: 5,
    presentation: 5,
    value: 5,
    comment: '',
  });
  
  const handleSliderChange = (field: keyof VoteData, value: number[]) => {
    setVoteData({ ...voteData, [field]: value[0] });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onVoteSubmit(participant.id, voteData);
    
    // Reset form
    setVoteData({
      taste: 5,
      bun: 5,
      cooking: 5,
      presentation: 5,
      value: 5,
      comment: '',
    });
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const criteriaWeights = {
    taste: 40,
    bun: 15,
    cooking: 20,
    presentation: 10,
    value: 15,
  };
  
  return (
    <div className="min-h-screen bg-[var(--sb-gray-100)]">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px] bg-[var(--sb-carbon)] overflow-hidden">
        <img
          src={participant.image}
          alt={participant.name}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={() => onNavigate('brands')}
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full p-3 transition-all shadow-lg"
        >
          <ChevronLeft size={24} />
        </button>
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-3">
                  <Badge className="bg-[var(--sb-orange)] text-white border-0">
                    {participant.category}
                  </Badge>
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
                
                <h1 className="font-display text-4xl md:text-6xl text-white mb-2">
                  {participant.name}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-white/90">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    <span>{participant.district}</span>
                  </div>
                  <span>•</span>
                  <span className="font-display text-2xl">{participant.price.toFixed(2)}€</span>
                </div>
              </div>
              
              {/* Stats */}
              {currentScore !== undefined && (
                <div className="flex gap-4">
                  <Card className="bg-white/95 backdrop-blur-sm p-4 text-center">
                    <div className="text-sm text-muted-foreground mb-1">Posición</div>
                    <div className="font-display text-3xl text-[var(--sb-orange)]">
                      #{currentPosition}
                    </div>
                  </Card>
                  <Card className="bg-white/95 backdrop-blur-sm p-4 text-center">
                    <div className="text-sm text-muted-foreground mb-1">Media</div>
                    <div className="font-display text-3xl text-[var(--sb-orange)]">
                      {currentScore.toFixed(2)}
                    </div>
                  </Card>
                  <Card className="bg-white/95 backdrop-blur-sm p-4 text-center">
                    <div className="text-sm text-muted-foreground mb-1">Votos</div>
                    <div className="font-display text-3xl text-[var(--sb-orange)]">
                      {currentVotes}
                    </div>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-[1200px] mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Description */}
            <Card className="p-6">
              <h2 className="font-display text-2xl mb-4">Descripción</h2>
              <p className="text-muted-foreground leading-relaxed">
                {participant.description}
              </p>
            </Card>
            
            {/* Ingredients */}
            <Card className="p-6">
              <h2 className="font-display text-2xl mb-4">{t.participants.ingredients}</h2>
              <div className="flex flex-wrap gap-2">
                {participant.ingredients.map((ingredient, index) => (
                  <Badge key={index} variant="outline">
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </Card>
            
            {/* Location & Contact */}
            <Card className="p-6 space-y-4">
              <h2 className="font-display text-2xl mb-4">Información</h2>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-[var(--sb-orange)] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">{t.participants.address}</div>
                    <div>{participant.address}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock size={20} className="text-[var(--sb-orange)] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">{t.participants.openingHours}</div>
                    <div>{participant.hours}</div>
                  </div>
                </div>
                
                {participant.phone && (
                  <div className="flex items-start gap-3">
                    <Phone size={20} className="text-[var(--sb-orange)] mt-0.5 flex-shrink-0" />
                    <div>
                      <a href={`tel:${participant.phone}`} className="hover:text-[var(--sb-orange)] transition-colors">
                        {participant.phone}
                      </a>
                    </div>
                  </div>
                )}
                
                {participant.instagram && (
                  <div className="flex items-start gap-3">
                    <Instagram size={20} className="text-[var(--sb-orange)] mt-0.5 flex-shrink-0" />
                    <div>
                      <a
                        href={`https://instagram.com/${participant.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--sb-orange)] transition-colors"
                      >
                        {participant.instagram}
                      </a>
                    </div>
                  </div>
                )}
              </div>
              
              <Button
                onClick={() => onNavigate('map', participant.id)}
                variant="outline"
                className="w-full mt-4"
              >
                {t.participants.directions}
              </Button>
            </Card>
          </div>
          
          {/* Right Column - Vote Form */}
          <div className="lg:col-span-2">
            <Card className="p-6 md:p-8 sticky top-4">
              <div className="flex items-center gap-3 mb-6">
                <Star className="text-[var(--sb-orange)]" size={32} />
                <h2 className="font-display text-3xl">{t.vote.title}</h2>
              </div>
              
              <p className="text-muted-foreground mb-8">
                {t.vote.step3Desc}
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Taste - 40% */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-display text-xl">
                      {t.vote.taste}
                    </label>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {criteriaWeights.taste}%
                      </Badge>
                      <span className="font-display text-2xl text-[var(--sb-orange)] min-w-[3ch] text-right">
                        {voteData.taste}
                      </span>
                    </div>
                  </div>
                  <Slider
                    min={1}
                    max={5}
                    step={1}
                    value={[voteData.taste]}
                    onValueChange={(val) => handleSliderChange('taste', val)}
                    className="cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                  </div>
                </div>
                
                {/* Bun - 15% */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-display text-xl">
                      {t.vote.bun}
                    </label>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {criteriaWeights.bun}%
                      </Badge>
                      <span className="font-display text-2xl text-[var(--sb-orange)] min-w-[3ch] text-right">
                        {voteData.bun}
                      </span>
                    </div>
                  </div>
                  <Slider
                    min={1}
                    max={5}
                    step={1}
                    value={[voteData.bun]}
                    onValueChange={(val) => handleSliderChange('bun', val)}
                    className="cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                  </div>
                </div>
                
                {/* Cooking - 20% */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-display text-xl">
                      {t.vote.cooking}
                    </label>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {criteriaWeights.cooking}%
                      </Badge>
                      <span className="font-display text-2xl text-[var(--sb-orange)] min-w-[3ch] text-right">
                        {voteData.cooking}
                      </span>
                    </div>
                  </div>
                  <Slider
                    min={1}
                    max={5}
                    step={1}
                    value={[voteData.cooking]}
                    onValueChange={(val) => handleSliderChange('cooking', val)}
                    className="cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                  </div>
                </div>
                
                {/* Presentation - 10% */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-display text-xl">
                      {t.vote.presentation}
                    </label>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {criteriaWeights.presentation}%
                      </Badge>
                      <span className="font-display text-2xl text-[var(--sb-orange)] min-w-[3ch] text-right">
                        {voteData.presentation}
                      </span>
                    </div>
                  </div>
                  <Slider
                    min={1}
                    max={5}
                    step={1}
                    value={[voteData.presentation]}
                    onValueChange={(val) => handleSliderChange('presentation', val)}
                    className="cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                  </div>
                </div>
                
                {/* Value - 15% */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-display text-xl">
                      {t.vote.value}
                    </label>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {criteriaWeights.value}%
                      </Badge>
                      <span className="font-display text-2xl text-[var(--sb-orange)] min-w-[3ch] text-right">
                        {voteData.value}
                      </span>
                    </div>
                  </div>
                  <Slider
                    min={1}
                    max={5}
                    step={1}
                    value={[voteData.value]}
                    onValueChange={(val) => handleSliderChange('value', val)}
                    className="cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                  </div>
                </div>
                
                {/* Comment */}
                <div>
                  <label className="font-display text-xl block mb-3">
                    {t.vote.comment}
                  </label>
                  <Textarea
                    value={voteData.comment}
                    onChange={(e) => setVoteData({ ...voteData, comment: e.target.value })}
                    placeholder="Cuéntanos tu experiencia..."
                    rows={4}
                    className="resize-none"
                  />
                </div>
                
                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[var(--sb-orange)] hover:bg-[#E55F00] text-white h-14"
                >
                  {t.vote.submit}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
