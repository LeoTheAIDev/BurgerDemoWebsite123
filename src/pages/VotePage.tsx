import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { QrCode, Check, Utensils, Sandwich, ChefHat, Eye, DollarSign } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Participant } from '../lib/mock-data';

interface VotePageProps {
  participants: Participant[];
  selectedParticipant?: Participant; // set by the QR link route (e.g., /vote/:slug)
  onVoteSubmit: (participantId: string, vote: VoteData) => void;
}

export interface VoteData {
  taste: number;
  bun: number;
  cooking: number;
  presentation: number;
  value: number;
  comment?: string;
}

export function VotePage({ participants, selectedParticipant, onVoteSubmit }: VotePageProps) {
  const { t } = useLanguage();

  // If a participant is provided (because user arrived via QR deep link), go straight to the form.
  const [activeStep, setActiveStep] = useState<'scan' | 'form' | 'success'>(
    selectedParticipant ? 'form' : 'scan'
  );
  const [currentParticipant, setCurrentParticipant] = useState<Participant | undefined>(selectedParticipant);

  const [voteData, setVoteData] = useState<VoteData>({
    taste: 0,
    bun: 0,
    cooking: 0,
    presentation: 0,
    value: 0,
    comment: '',
  });

  useEffect(() => {
    if (selectedParticipant) setCurrentParticipant(selectedParticipant);
  }, [selectedParticipant]);

  const handleSubmitVote = () => {
    if (!currentParticipant) return;

    if (
      voteData.taste === 0 ||
      voteData.bun === 0 ||
      voteData.cooking === 0 ||
      voteData.presentation === 0 ||
      voteData.value === 0
    ) {
      toast.error('Por favor completa todas las valoraciones');
      return;
    }

    onVoteSubmit(currentParticipant.id, voteData);
    setActiveStep('success');
  };

  const RatingInput = ({
    label,
    icon: Icon,
    value,
    onChange,
  }: {
    label: string;
    icon: any;
    value: number;
    onChange: (v: number) => void;
  }) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Icon size={20} className="text-[var(--sb-orange)]" />
        <Label>{label}</Label>
      </div>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            onClick={() => onChange(rating)}
            className={`flex-1 h-12 rounded-lg border-2 transition-all ${
              value === rating
                ? 'bg-[var(--sb-orange)] border-[var(--sb-orange)] text-white'
                : 'border-[var(--sb-border)] hover:border-[var(--sb-orange)]'
            }`}
          >
            {rating}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--sb-gray-100)]">
      <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
        {/* Instructions-only step */}
        {activeStep === 'scan' && (
          <div className="bg-white rounded-2xl border border-[var(--sb-border)] p-6 md:p-8 space-y-6">
            <h1 className="font-display text-3xl md:text-4xl text-center">{t.vote.title}</h1>

            <div className="flex items-center justify-center">
              <div className="w-14 h-14 bg-[var(--sb-orange)] text-white rounded-2xl flex items-center justify-center">
                <QrCode size={28} />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-xl">{t.vote.howToVote}</h2>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[var(--sb-orange)] text-white rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-xl">1</span>
                </div>
                <div>
                  <h3>{t.vote.step1}</h3>
                  <p className="text-sm text-muted-foreground">
                    Abre la <strong>cámara de tu móvil</strong> (o app de lector QR).
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[var(--sb-orange)] text-white rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-xl">2</span>
                </div>
                <div>
                  <h3>{t.vote.step2}</h3>
                  <p className="text-sm text-muted-foreground">
                    Escanea el <strong>QR del local</strong> que más te ha gustado.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[var(--sb-orange)] text-white rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-xl">3</span>
                </div>
                <div>
                  <h3>{t.vote.step3}</h3>
                  <p className="text-sm text-muted-foreground">
                    El QR te llevará a la <strong>página de voto del local</strong>. Ahí podrás puntuar y enviar tu voto.
                  </p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Consejo: si no se abre automáticamente, pulsa la notificación/enlace que aparece al enfocar el QR.
              </p>
            </div>
          </div>
        )}

        {/* Voting form (shown when user arrives via QR deep link and selectedParticipant is set) */}
        {activeStep === 'form' && currentParticipant && (
          <div className="space-y-6">
            {/* Participant Card */}
            <div className="bg-white rounded-2xl border border-[var(--sb-border)] p-6">
              <div className="flex gap-4 mb-4">
                <img
                  src={currentParticipant.image}
                  alt={currentParticipant.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div>
                  <h2 className="font-display text-xl mb-1">{currentParticipant.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {currentParticipant.district} • {currentParticipant.category}
                  </p>
                </div>
              </div>
            </div>

            {/* Rating Form */}
            <div className="bg-white rounded-2xl border border-[var(--sb-border)] p-6 space-y-6">
              <h2 className="font-display text-2xl">Valora tu experiencia</h2>

              <RatingInput
                label={t.vote.taste}
                icon={Utensils}
                value={voteData.taste}
                onChange={(v) => setVoteData({ ...voteData, taste: v })}
              />

              <RatingInput
                label={t.vote.bun}
                icon={Sandwich}
                value={voteData.bun}
                onChange={(v) => setVoteData({ ...voteData, bun: v })}
              />

              <RatingInput
                label={t.vote.cooking}
                icon={ChefHat}
                value={voteData.cooking}
                onChange={(v) => setVoteData({ ...voteData, cooking: v })}
              />

              <RatingInput
                label={t.vote.presentation}
                icon={Eye}
                value={voteData.presentation}
                onChange={(v) => setVoteData({ ...voteData, presentation: v })}
              />

              <RatingInput
                label={t.vote.value}
                icon={DollarSign}
                value={voteData.value}
                onChange={(v) => setVoteData({ ...voteData, value: v })}
              />

              <div className="space-y-2">
                <Label>{t.vote.comment}</Label>
                <Textarea
                  placeholder="Cuéntanos más sobre tu experiencia..."
                  value={voteData.comment}
                  onChange={(e) => setVoteData({ ...voteData, comment: e.target.value })}
                  rows={4}
                />
              </div>

              <Button
                size="lg"
                onClick={handleSubmitVote}
                className="w-full bg-[var(--sb-orange)] hover:bg-[#E55F00] text-white h-14"
              >
                {t.vote.submit}
              </Button>
            </div>
          </div>
        )}

        {/* Success */}
        {activeStep === 'success' && currentParticipant && (
          <div className="bg-white rounded-2xl border border-[var(--sb-border)] p-8 text-center">
            <div className="w-20 h-20 bg-[var(--sb-valid)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={40} className="text-[var(--sb-valid)]" />
            </div>

            <h2 className="font-display text-3xl mb-4">{t.vote.success}</h2>
            <p className="text-muted-foreground mb-8">
              Tu voto por <strong>{currentParticipant.name}</strong> se ha registrado correctamente.
            </p>

            <div className="space-y-3">
              <Button
                size="lg"
                onClick={() => {
                  setActiveStep('scan');
                  setCurrentParticipant(undefined);
                  setVoteData({
                    taste: 0,
                    bun: 0,
                    cooking: 0,
                    presentation: 0,
                    value: 0,
                    comment: '',
                  });
                }}
                className="w-full bg-[var(--sb-orange)] hover:bg-[#E55F00] text-white"
              >
                Votar otro local
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
