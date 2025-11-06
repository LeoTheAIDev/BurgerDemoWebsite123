import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { RankingEntry, Category, District } from '../lib/mock-data';
import { TablaRanking } from '../components/TablaRanking';
import { Leaderboard } from '../components/Leaderboard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Filter, Trophy, List } from 'lucide-react';

interface RankingPageProps {
  ranking: RankingEntry[];
  onNavigate: (page: string, id?: string) => void;
}

export function RankingPage({ ranking, onNavigate }: RankingPageProps) {
  const { t } = useLanguage();
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [districtFilter, setDistrictFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'score' | 'votes'>('score');
  
  // Get unique categories and districts
  const categories: Category[] = ['Clásica', 'Smash', 'Gourmet', 'Veggie', 'BBQ', 'Picante'];
  const districts: District[] = ['Triana', 'Nervión', 'Alameda', 'Los Remedios', 'Macarena', 'Centro', 'Bellavista', 'San Pablo'];
  
  // Filter and sort
  let filteredRanking = [...ranking];
  
  if (categoryFilter !== 'all') {
    filteredRanking = filteredRanking.filter(
      (entry) => entry.participant.category === categoryFilter
    );
  }
  
  if (districtFilter !== 'all') {
    filteredRanking = filteredRanking.filter(
      (entry) => entry.participant.district === districtFilter
    );
  }
  
  filteredRanking.sort((a, b) => {
    if (sortBy === 'score') {
      return b.averageScore - a.averageScore;
    } else {
      return b.voteCount - a.voteCount;
    }
  });
  
  // Recalculate positions
  filteredRanking = filteredRanking.map((entry, index) => ({
    ...entry,
    position: index + 1,
  }));
  
  return (
    <div className="min-h-screen bg-[var(--sb-gray-100)]">
      <div className="max-w-[1400px] mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-5xl mb-2">{t.ranking.title}</h1>
          <p className="text-muted-foreground">
            Actualización en tiempo real • {ranking.length} participantes
          </p>
        </div>
        
        {/* Tabs for Leaderboard vs Table */}
        <Tabs defaultValue="leaderboard" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-white border border-[var(--sb-border)] p-1">
              <TabsTrigger value="leaderboard" className="data-[state=active]:bg-[var(--sb-orange)] data-[state=active]:text-white gap-2">
                <Trophy size={18} />
                {t.leaderboard.title}
              </TabsTrigger>
              <TabsTrigger value="table" className="data-[state=active]:bg-[var(--sb-orange)] data-[state=active]:text-white gap-2">
                <List size={18} />
                {t.ranking.title}
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="leaderboard" className="mt-0">
            <Leaderboard 
              ranking={filteredRanking}
              onParticipantClick={(id) => onNavigate('participant-detail', id)}
            />
          </TabsContent>
          
          <TabsContent value="table" className="mt-0 space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-2xl border border-[var(--sb-border)] p-4 md:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter size={20} className="text-[var(--sb-orange)]" />
                <h3 className="font-display">{t.ranking.filterBy}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    {t.ranking.category}
                  </label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t.ranking.allCategories}</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* District Filter */}
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    {t.ranking.district}
                  </label>
                  <Select value={districtFilter} onValueChange={setDistrictFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t.ranking.allDistricts}</SelectItem>
                      {districts.map((dist) => (
                        <SelectItem key={dist} value={dist}>
                          {dist}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Sort By */}
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    {t.ranking.sortBy}
                  </label>
                  <Select value={sortBy} onValueChange={(v) => setSortBy(v as 'score' | 'votes')}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="score">{t.ranking.sortByScore}</SelectItem>
                      <SelectItem value="votes">{t.ranking.sortByVotes}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Table */}
            <div className="bg-white rounded-2xl border border-[var(--sb-border)] overflow-hidden">
              <TablaRanking
                data={filteredRanking}
                onRowClick={(entry) => onNavigate('participant-detail', entry.participant.id)}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
