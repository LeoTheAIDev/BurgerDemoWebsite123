import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Calendar, Clock, MapPin, Trophy, Vote, PartyPopper, Users, Timer } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  time?: string;
  location?: string;
  type: 'league' | 'voting' | 'awards' | 'special';
  isPast: boolean;
}

export function CalendarPage() {
  const { t } = useLanguage();
  const [selectedView, setSelectedView] = useState<'all' | 'upcoming' | 'past'>('upcoming');
  
  const events: CalendarEvent[] = [
    {
      id: '1',
      title: t.calendar.leagueStart,
      description: 'Arranca la primera edición de la Sevilla Burger League. ¡Que empiece la batalla!',
      date: new Date('2025-11-01'),
      time: '00:00',
      type: 'league',
      isPast: true,
    },
    {
      id: '2',
      title: t.calendar.votingOpen,
      description: 'Se abre el periodo de votación. Visita los locales participantes y vota por tu burger favorita.',
      date: new Date('2025-11-01'),
      time: '00:00',
      type: 'voting',
      isPast: true,
    },
    {
      id: '3',
      title: 'Meet & Greet con Participantes',
      description: 'Conoce a los chefs y equipos detrás de las mejores burgers de Sevilla.',
      date: new Date('2025-11-15'),
      time: '19:00',
      location: 'Plaza del Altozano, Triana',
      type: 'special',
      isPast: true,
    },
    {
      id: '4',
      title: 'Actualización de Ranking',
      description: 'Primera actualización oficial del ranking con las estadísticas acumuladas.',
      date: new Date('2025-11-30'),
      time: '20:00',
      type: 'league',
      isPast: false,
    },
    {
      id: '5',
      title: 'Burger Fest Sevilla',
      description: 'Festival especial con degustaciones, música en vivo y experiencias gastronómicas.',
      date: new Date('2025-12-07'),
      time: '12:00',
      location: 'Muelle de la Sal, Guadalquivir',
      type: 'special',
      isPast: false,
    },
    {
      id: '6',
      title: 'Último Día de Votación',
      description: 'Última oportunidad para votar. Se cierran las votaciones a las 23:59.',
      date: new Date('2025-12-15'),
      time: '23:59',
      type: 'voting',
      isPast: false,
    },
    {
      id: '7',
      title: t.calendar.votingClosed,
      description: 'Fin del periodo de votación. Comienza el recuento final.',
      date: new Date('2025-12-16'),
      time: '00:00',
      type: 'voting',
      isPast: false,
    },
    {
      id: '8',
      title: t.calendar.winnersAnnouncement,
      description: 'Anuncio oficial de los ganadores de la Sevilla Burger League 2025.',
      date: new Date('2025-12-20'),
      time: '20:00',
      type: 'awards',
      isPast: false,
    },
    {
      id: '9',
      title: t.calendar.awards,
      description: 'Gran ceremonia de premios con entrega de trofeos, medallas y reconocimientos especiales.',
      date: new Date('2025-12-22'),
      time: '20:30',
      location: 'Teatro Lope de Vega, Sevilla',
      type: 'awards',
      isPast: false,
    },
    {
      id: '10',
      title: 'Celebración de Clausura',
      description: 'Cierre de temporada con afterparty y networking entre participantes y público.',
      date: new Date('2025-12-22'),
      time: '23:00',
      location: 'Teatro Lope de Vega, Sevilla',
      type: 'special',
      isPast: false,
    },
  ];
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const filteredEvents = events.filter(event => {
    if (selectedView === 'upcoming') return !event.isPast;
    if (selectedView === 'past') return event.isPast;
    return true;
  });
  
  const getEventIcon = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'league':
        return <Trophy className="text-[var(--sb-orange)]" size={24} />;
      case 'voting':
        return <Vote className="text-blue-500" size={24} />;
      case 'awards':
        return <PartyPopper className="text-yellow-500" size={24} />;
      case 'special':
        return <Users className="text-purple-500" size={24} />;
    }
  };
  
  const getEventColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'league':
        return 'bg-orange-50 border-orange-200';
      case 'voting':
        return 'bg-blue-50 border-blue-200';
      case 'awards':
        return 'bg-yellow-50 border-yellow-200';
      case 'special':
        return 'bg-purple-50 border-purple-200';
    }
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };
  
  const isToday = (date: Date) => {
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate.getTime() === today.getTime();
  };
  
  const getDaysUntil = (date: Date) => {
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  return (
    <div className="min-h-screen bg-[var(--sb-gray-100)]">
      <div className="max-w-[1200px] mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <Calendar className="text-[var(--sb-orange)]" size={40} />
            <h1 className="font-display text-4xl md:text-6xl">{t.calendar.title}</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.calendar.subtitle}
          </p>
        </div>
        
        {/* Tabs */}
        <Tabs value={selectedView} onValueChange={(v) => setSelectedView(v as any)} className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="upcoming">{t.calendar.upcoming}</TabsTrigger>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="past">{t.calendar.past}</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Events Timeline */}
        <div className="relative space-y-6">
          {/* Vertical Line */}
          <div className="absolute left-[19px] md:left-8 top-0 bottom-0 w-0.5 bg-[var(--sb-border)]" />
          
          {filteredEvents.map((event, index) => {
            const daysUntil = getDaysUntil(event.date);
            const isTodayEvent = isToday(event.date);
            
            return (
              <div key={event.id} className="relative pl-12 md:pl-20">
                {/* Timeline Dot */}
                <div
                  className={`absolute left-0 md:left-3 w-10 h-10 rounded-full flex items-center justify-center ${
                    isTodayEvent
                      ? 'bg-[var(--sb-orange)] ring-4 ring-orange-100 scale-110'
                      : event.isPast
                      ? 'bg-gray-300'
                      : 'bg-white border-2 border-[var(--sb-orange)]'
                  } transition-all`}
                >
                  {getEventIcon(event.type)}
                </div>
                
                {/* Event Card */}
                <Card className={`p-6 ${getEventColor(event.type)} border-2 hover:shadow-lg transition-all`}>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="font-display text-xl">{event.title}</h3>
                        {isTodayEvent && (
                          <Badge className="bg-[var(--sb-orange)] text-white border-0">
                            {t.calendar.today}
                          </Badge>
                        )}
                        {!event.isPast && daysUntil > 0 && daysUntil <= 7 && !isTodayEvent && (
                          <Badge variant="outline" className="border-[var(--sb-orange)] text-[var(--sb-orange)]">
                            <Timer size={14} className="mr-1" />
                            {daysUntil} {daysUntil === 1 ? 'día' : 'días'}
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-muted-foreground mb-4">
                        {event.description}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar size={16} className="text-[var(--sb-orange)]" />
                          <span className="capitalize">{formatDate(event.date)}</span>
                        </div>
                        
                        {event.time && (
                          <div className="flex items-center gap-2 text-sm">
                            <Clock size={16} className="text-[var(--sb-orange)]" />
                            <span>{event.time}</span>
                          </div>
                        )}
                        
                        {event.location && (
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin size={16} className="text-[var(--sb-orange)]" />
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Date Display */}
                    <div className="flex-shrink-0 text-center">
                      <div className="bg-white rounded-xl p-4 border-2 border-[var(--sb-border)] min-w-[80px]">
                        <div className="font-display text-3xl text-[var(--sb-orange)]">
                          {event.date.getDate()}
                        </div>
                        <div className="text-sm text-muted-foreground uppercase">
                          {new Intl.DateTimeFormat('es-ES', { month: 'short' }).format(event.date)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {event.date.getFullYear()}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
        
        {filteredEvents.length === 0 && (
          <Card className="p-12 text-center">
            <Calendar className="mx-auto mb-4 text-muted-foreground" size={48} />
            <p className="text-muted-foreground">
              No hay eventos en esta categoría
            </p>
          </Card>
        )}
        
        {/* League Info Box */}
        <Card className="mt-12 p-8 bg-gradient-to-br from-[var(--sb-orange)]/10 to-[var(--sb-orange)]/5 border-2 border-[var(--sb-orange)]/20">
          <div className="text-center max-w-2xl mx-auto">
            <Trophy className="mx-auto mb-4 text-[var(--sb-orange)]" size={48} />
            <h3 className="font-display text-2xl mb-3">
              Sevilla Burger League 2025
            </h3>
            <p className="text-muted-foreground mb-6">
              Primera edición de la liga más sabrosa de Sevilla. Vota por tus hamburguesas favoritas
              y ayuda a coronar a los mejores burgermasters de la ciudad.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 border border-[var(--sb-border)]">
                <div className="text-sm text-muted-foreground mb-1">Fecha Inicio</div>
                <div className="font-display text-xl">1 Nov 2025</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-[var(--sb-border)]">
                <div className="text-sm text-muted-foreground mb-1">Fecha Final</div>
                <div className="font-display text-xl">22 Dic 2025</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-[var(--sb-border)]">
                <div className="text-sm text-muted-foreground mb-1">Participantes</div>
                <div className="font-display text-xl">16 Locales</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
