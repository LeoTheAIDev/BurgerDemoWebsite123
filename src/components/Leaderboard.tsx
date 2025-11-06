import { Trophy, Medal, Award, TrendingUp, TrendingDown } from 'lucide-react';
import { RankingEntry } from '../lib/mock-data';
import { useLanguage } from '../contexts/LanguageContext';
import { Badge } from './ui/badge';

interface LeaderboardProps {
  ranking: RankingEntry[];
  onParticipantClick?: (participantId: string) => void;
}

export function Leaderboard({ ranking, onParticipantClick }: LeaderboardProps) {
  const { t } = useLanguage();
  
  if (ranking.length === 0) return null;
  
  const topThree = ranking.slice(0, 3);
  const rest = ranking.slice(3, 10);
  
  // Reorder for podium display: 2nd, 1st, 3rd
  const podiumOrder = topThree.length >= 3 
    ? [topThree[1], topThree[0], topThree[2]]
    : topThree.length === 2
    ? [topThree[1], topThree[0]]
    : [topThree[0]];
  
  const getPodiumHeight = (position: number) => {
    if (position === 1) return 'h-48';
    if (position === 2) return 'h-40';
    return 'h-32';
  };
  
  const getPodiumColor = (position: number) => {
    if (position === 1) return 'from-yellow-400 to-yellow-600';
    if (position === 2) return 'from-gray-300 to-gray-400';
    return 'from-amber-600 to-amber-800';
  };
  
  const getMedalIcon = (position: number) => {
    if (position === 1) return <Trophy className="text-yellow-500" size={32} />;
    if (position === 2) return <Medal className="text-gray-400" size={28} />;
    return <Award className="text-amber-700" size={24} />;
  };
  
  return (
    <div className="w-full">
      {/* Podium Section */}
      <div className="mb-12">
        <h2 className="font-display text-3xl md:text-4xl text-center mb-8">
          {t.leaderboard.topThree}
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end justify-center gap-4 md:gap-6 px-4">
            {podiumOrder.map((entry) => {
              if (!entry) return null;
              const position = entry.position;
              const isFirst = position === 1;
              
              return (
                <div
                  key={entry.participant.id}
                  className={`flex-1 max-w-[200px] group ${isFirst ? 'order-2' : position === 2 ? 'order-1' : 'order-3'}`}
                >
                  <button
                    onClick={() => onParticipantClick?.(entry.participant.id)}
                    className="w-full"
                  >
                  {/* Image and Medal */}
                  <div className="relative mb-4">
                    <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow">
                      <img
                        src={entry.participant.image}
                        alt={entry.participant.name}
                        className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      {/* Medal Badge */}
                      <div className="absolute top-3 right-3 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                        {getMedalIcon(position)}
                      </div>
                      
                      {/* Score */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-2 text-center">
                          <div className="text-2xl">{entry.averageScore.toFixed(2)}</div>
                          <div className="text-xs text-muted-foreground">{entry.voteCount} votos</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Name */}
                    <div className="mt-3 text-center">
                      <h3 className="font-display text-sm md:text-base line-clamp-2">
                        {entry.participant.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {entry.participant.district}
                      </p>
                    </div>
                  </div>
                  
                  </button>
                  
                  {/* Podium Base */}
                  <div className={`${getPodiumHeight(position)} bg-gradient-to-b ${getPodiumColor(position)} rounded-t-2xl flex items-center justify-center shadow-lg`}>
                    <span className="font-display text-4xl md:text-5xl text-white drop-shadow-lg">
                      {position}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Rest of Top 10 */}
      {rest.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <h3 className="font-display text-2xl mb-6 px-4">
            {t.leaderboard.restOfRanking}
          </h3>
          
          <div className="space-y-3 px-4">
            {rest.map((entry) => (
              <button
                key={entry.participant.id}
                onClick={() => onParticipantClick?.(entry.participant.id)}
                className="w-full bg-white border border-[var(--sb-border)] rounded-2xl p-4 hover:shadow-md transition-all hover:border-[var(--sb-orange)] group"
              >
                <div className="flex items-center gap-4">
                  {/* Position */}
                  <div className="w-12 h-12 bg-[var(--sb-gray-100)] group-hover:bg-[var(--sb-orange)] group-hover:text-white rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                    <span className="font-display text-xl">{entry.position}</span>
                  </div>
                  
                  {/* Image */}
                  <img
                    src={entry.participant.image}
                    alt={entry.participant.name}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                  />
                  
                  {/* Info */}
                  <div className="flex-1 text-left min-w-0">
                    <h4 className="font-display text-base md:text-lg truncate">
                      {entry.participant.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-muted-foreground">
                        {entry.participant.district}
                      </span>
                      <span className="text-muted-foreground">•</span>
                      <Badge variant="outline" className="text-xs">
                        {entry.participant.category}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Score & Trend */}
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-xl md:text-2xl">{entry.averageScore.toFixed(2)}</div>
                      <div className="text-xs text-muted-foreground">{entry.voteCount} votos</div>
                    </div>
                    
                    {entry.trend === 'up' && (
                      <TrendingUp size={20} className="text-green-600" />
                    )}
                    {entry.trend === 'down' && (
                      <TrendingDown size={20} className="text-red-600" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
