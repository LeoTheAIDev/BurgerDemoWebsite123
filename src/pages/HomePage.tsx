import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';
import { RankingEntry } from '../lib/mock-data';
import { TarjetaParticipante } from '../components/TarjetaParticipante';
import { Trophy, Users, Clock } from 'lucide-react';
import logo from 'figma:asset/258365824ad1037955a42e676b969cfb54fcdf75.png';

interface HomePageProps {
  totalVotes: number;
  totalVenues: number;
  topParticipants: RankingEntry[];
  onNavigate: (page: string, participantId?: string) => void;
}

export function HomePage({ totalVotes, totalVenues, topParticipants, onNavigate }: HomePageProps) {
  const { t } = useLanguage();
  
  const endDate = new Date('2025-07-15');
  const now = new Date();
  const daysRemaining = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[var(--sb-orange)] to-[#E55F00] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-4 py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <img src={logo} alt="Sevilla Burger League" className="h-24 md:h-32 w-auto mx-auto mb-8" />

            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl mb-6">
              {t.home.hero}
            </h1>

            {/* Buttons: left (Ranking) and right (How to vote). Middle removed */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button
                size="lg"
                onClick={() => onNavigate('ranking')}
                className="bg-white text-[var(--sb-orange)] hover:bg-gray-100 h-14 px-8"
              >
                {t.home.viewRanking}
              </Button>

              <Button
                size="lg"
                onClick={() => onNavigate('vote')}
                variant="outline"
                className="border-2 border-white text-[rgb(255,106,0)] hover:bg-white/10 h-14 px-8"
              >
                {t.home.howToVote}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-[var(--sb-border)] bg-[var(--sb-gray-100)]">
        <div className="max-w-[1200px] mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-[var(--sb-border)] text-center">
              <div className="w-12 h-12 bg-[var(--sb-orange)]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="text-[var(--sb-orange)]" size={24} />
              </div>
              <div className="font-display text-4xl text-[var(--sb-orange)] mb-2">
                {totalVotes.toLocaleString()}
              </div>
              <div className="text-muted-foreground">{t.home.totalVotes}</div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[var(--sb-border)] text-center">
              <div className="w-12 h-12 bg-[var(--sb-orange)]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="text-[var(--sb-orange)]" size={24} />
              </div>
              <div className="font-display text-4xl text-[var(--sb-orange)] mb-2">
                {totalVenues}
              </div>
              <div className="text-muted-foreground">{t.home.totalVenues}</div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[var(--sb-border)] text-center">
              <div className="w-12 h-12 bg-[var(--sb-orange)]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="text-[var(--sb-orange)]" size={24} />
              </div>
              <div className="font-display text-4xl text-[var(--sb-orange)] mb-2">
                {daysRemaining}
              </div>
              <div className="text-muted-foreground">
                {t.home.timeRemaining} ({t.home.days})
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top 5 Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl text-center mb-8 md:mb-12">
            {t.home.topNow}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topParticipants.slice(0, 5).map((entry) => (
              <TarjetaParticipante
                key={entry.participant.id}
                participant={entry.participant}
                position={entry.position}
                averageScore={entry.averageScore}
                voteCount={entry.voteCount}
                trend={entry.trend}
                onVote={() => onNavigate('participant-detail', entry.participant.id)}
                onViewDetails={() => onNavigate('participant-detail', entry.participant.id)}
              />
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              size="lg"
              onClick={() => onNavigate('ranking')}
              className="bg-[var(--sb-orange)] hover:bg-[#E55F00] text-white"
            >
              {t.home.viewRanking}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
