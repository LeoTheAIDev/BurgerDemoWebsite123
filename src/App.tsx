import { useState, useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { RankingPage } from './pages/RankingPage';
import { VotePage, VoteData } from './pages/VotePage';
import { BrandsPage } from './pages/BrandsPage';
import { ParticipantDetailPage } from './pages/ParticipantDetailPage';
import { CalendarPage } from './pages/CalendarPage';
import { MapPage } from './pages/MapPage';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';
import {
  mockParticipants,
  generateMockVotes,
  calculateRanking,
  Vote,
  Participant,
} from './lib/mock-data';

type Page = 'home' | 'ranking' | 'participants' | 'participant-detail' | 'vote' | 'calendar' | 'map';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [votes, setVotes] = useState<Vote[]>([]);
  
  // --- Hash-based routing helpers for shareable URLs ---
  const setHashFor = (page: Page, participantId?: string) => {
    if (page === 'vote' && participantId) {
      const p = mockParticipants.find(x => x.id === participantId);
      if (p) {
        window.location.hash = `#/vote/${p.slug}`;
        return;
      }
    }
    if (page === 'participant-detail' && participantId) {
      const p = mockParticipants.find(x => x.id === participantId);
      if (p) {
        window.location.hash = `#/participant/${p.slug}`;
        return;
      }
    }
    // Fallback simple pages
    window.location.hash = `#/${page}`;
  };

  const applyRouteFromHash = () => {
    const hash = window.location.hash || "";
    // Patterns: #/vote/:slug, #/participant/:slug, #/ranking, etc.
    const parts = hash.replace(/^#\/?/, "").split("/");
    const [route, maybeSlug] = parts;

    if (route === "vote" && maybeSlug) {
      const p = mockParticipants.find(x => x.slug === maybeSlug);
      if (p) {
        setCurrentPage('vote');
        setSelectedParticipantId(p.id);
        return;
      }
    }

    if (route === "participant" && maybeSlug) {
      const p = mockParticipants.find(x => x.slug === maybeSlug);
      if (p) {
        setCurrentPage('participant-detail');
        setSelectedParticipantId(p.id);
        return;
      }
    }

    // Simple routes
    const simpleRoutes: Page[] = ['home','ranking','vote','calendar','map'];
    if (route && simpleRoutes.includes(route as Page)) {
      setCurrentPage(route as Page);
      setSelectedParticipantId(undefined);
      return;
    }

    // Default
    setCurrentPage('home');
    setSelectedParticipantId(undefined);
  };

  useEffect(() => {
    // On first load, sync from hash if present
    applyRouteFromHash();
    const onHashChange = () => applyRouteFromHash();
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  // --- End hash routing helpers ---
const [selectedParticipantId, setSelectedParticipantId] = useState<string | undefined>();
  
  // Initialize mock votes on mount
  useEffect(() => {
    const initialVotes = generateMockVotes(mockParticipants);
    setVotes(initialVotes);
  }, []);
  
  // Calculate ranking
  const ranking = calculateRanking(mockParticipants, votes);
  
  // Get total stats
  const totalVotes = votes.length;
  const totalVenues = mockParticipants.length;
  
  // Handle navigation
  const handleNavigate = (page: string, id?: string) => {
    setCurrentPage(page as Page);
    setSelectedParticipantId(id);
    setHashFor(page as Page, id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Handle vote submission
  const handleVoteSubmit = (participantId: string, voteData: VoteData) => {
    const newVote: Vote = {
      id: `vote-${Date.now()}`,
      participantId,
      taste: voteData.taste,
      bun: voteData.bun,
      cooking: voteData.cooking,
      presentation: voteData.presentation,
      value: voteData.value,
      comment: voteData.comment,
      timestamp: Date.now(),
    };
    
    setVotes([...votes, newVote]);
    toast.success('¡Voto registrado correctamente!');
  };
  
  // Get selected participant for vote page and detail page
  const selectedParticipant = selectedParticipantId
    ? mockParticipants.find((p) => p.id === selectedParticipantId || p.slug === selectedParticipantId)
    : undefined;
  
  // Get ranking info for selected participant
  const selectedParticipantRanking = selectedParticipant
    ? ranking.find((r) => r.participant.id === selectedParticipant.id)
    : undefined;
  
  return (
    <div className="min-h-screen bg-white">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      
      {currentPage === 'home' && (
        <HomePage
          totalVotes={totalVotes}
          totalVenues={totalVenues}
          topParticipants={ranking.slice(0, 5)}
          onNavigate={handleNavigate}
        />
      )}
      
      {currentPage === 'ranking' && (
        <RankingPage ranking={ranking} onNavigate={handleNavigate} />
      )}
      
      {currentPage === 'participants' && (
        <BrandsPage participants={mockParticipants} onNavigate={handleNavigate} />
      )}
      
      {currentPage === 'participant-detail' && selectedParticipant && (
        <ParticipantDetailPage
          participant={selectedParticipant}
          onNavigate={handleNavigate}
          onVoteSubmit={handleVoteSubmit}
          currentScore={selectedParticipantRanking?.averageScore}
          currentVotes={selectedParticipantRanking?.voteCount}
          currentPosition={selectedParticipantRanking?.position}
        />
      )}
      
      {currentPage === 'vote' && (
        <VotePage
          participants={mockParticipants}
          selectedParticipant={selectedParticipant}
          onVoteSubmit={handleVoteSubmit}
        />
      )}
      
      {currentPage === 'calendar' && (
        <CalendarPage />
      )}
      
      {currentPage === 'map' && (
        <MapPage participants={mockParticipants} onNavigate={handleNavigate} />
      )}
      
      <Toaster position="top-center" />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
