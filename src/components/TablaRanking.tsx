import { ArrowUp, ArrowDown, Minus, TrendingUp, TrendingDown } from 'lucide-react';
import { RankingEntry } from '../lib/mock-data';
import { useLanguage } from '../contexts/LanguageContext';
import { Badge } from './ui/badge';

interface TablaRankingProps {
  data: RankingEntry[];
  onRowClick?: (entry: RankingEntry) => void;
}

export function TablaRanking({ data, onRowClick }: TablaRankingProps) {
  const { t } = useLanguage();
  
  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return <TrendingUp size={16} className="text-green-600" />;
    if (trend === 'down') return <TrendingDown size={16} className="text-red-600" />;
    return <Minus size={16} className="text-gray-400" />;
  };
  
  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-[var(--sb-orange)]">
              <th className="text-left p-4 font-display">{t.ranking.position}</th>
              <th className="text-left p-4 font-display">{t.ranking.restaurant}</th>
              <th className="text-left p-4 font-display">{t.ranking.score}</th>
              <th className="text-left p-4 font-display">{t.ranking.votes}</th>
              <th className="text-left p-4 font-display">{t.ranking.district}</th>
              <th className="text-left p-4 font-display">{t.ranking.category}</th>
              <th className="text-center p-4 font-display">{t.ranking.trending}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr
                key={entry.participant.id}
                onClick={() => onRowClick?.(entry)}
                className="border-b border-[var(--sb-border)] hover:bg-[var(--sb-gray-100)] transition-colors cursor-pointer"
              >
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-xl text-[var(--sb-orange)]">
                      #{entry.position}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={entry.participant.image}
                      alt={entry.participant.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <div>{entry.participant.name}</div>
                      {entry.participant.isVeggie && (
                        <Badge variant="outline" className="mt-1 text-xs bg-green-50 text-green-700 border-green-200">
                          Veggie
                        </Badge>
                      )}
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-xl">{entry.averageScore.toFixed(2)}</span>
                </td>
                <td className="p-4 text-muted-foreground">{entry.voteCount}</td>
                <td className="p-4 text-muted-foreground">{entry.participant.district}</td>
                <td className="p-4">
                  <Badge variant="outline">{entry.participant.category}</Badge>
                </td>
                <td className="p-4">
                  <div className="flex justify-center">
                    {getTrendIcon(entry.trend)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {data.map((entry) => (
          <div
            key={entry.participant.id}
            onClick={() => onRowClick?.(entry)}
            className="bg-white border border-[var(--sb-border)] rounded-2xl p-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              {/* Position */}
              <div className="flex-shrink-0 w-12 h-12 bg-[var(--sb-orange)] text-white rounded-xl flex items-center justify-center">
                <span className="font-display text-xl">#{entry.position}</span>
              </div>
              
              {/* Image */}
              <img
                src={entry.participant.image}
                alt={entry.participant.name}
                className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
              />
              
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-display text-sm">{entry.participant.name}</h4>
                  {getTrendIcon(entry.trend)}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {entry.participant.district} • {entry.participant.category}
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <div>
                    <span className="text-xs text-muted-foreground">{t.ranking.score}</span>
                    <div className="text-lg">{entry.averageScore.toFixed(2)}</div>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">{t.ranking.votes}</span>
                    <div className="text-lg">{entry.voteCount}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
