export type Category = 'Clásica' | 'Smash' | 'Gourmet' | 'Veggie' | 'BBQ' | 'Picante';
export type District = 'Triana' | 'Nervión' | 'Alameda' | 'Los Remedios' | 'Macarena' | 'Centro' | 'Bellavista' | 'San Pablo';

export interface Participant {
  id: string;
  slug: string;
  name: string;
  district: District;
  category: Category;
  price: number;
  description: string;
  ingredients: string[];
  address: string;
  hours: string;
  phone?: string;
  instagram?: string;
  image: string;
  isGlutenFree: boolean;
  isVeggie: boolean;
  lat: number;
  lng: number;
}

export interface Vote {
  id: string;
  participantId: string;
  taste: number;
  bun: number;
  cooking: number;
  presentation: number;
  value: number;
  comment?: string;
  timestamp: number;
}

export interface RankingEntry {
  participant: Participant;
  averageScore: number;
  voteCount: number;
  trend: 'up' | 'down' | 'stable';
  position: number;
  previousPosition: number;
}

// Mock participants data
export const mockParticipants: Participant[] = [
  {
    id: '1',
    slug: 'la-burger-triana',
    name: 'La Burger Triana',
    district: 'Triana',
    category: 'Clásica',
    price: 9.5,
    description: 'Hamburguesa clásica con carne de ternera 100% sevillana, queso cheddar, lechuga, tomate y nuestra salsa secreta.',
    ingredients: ['Carne de ternera', 'Pan brioche', 'Cheddar', 'Lechuga', 'Tomate', 'Cebolla caramelizada', 'Salsa especial'],
    address: 'Calle Betis, 45, Triana',
    hours: '12:00 - 00:00',
    phone: '+34 954 123 456',
    instagram: '@laburgertriana',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
    isGlutenFree: false,
    isVeggie: false,
    lat: 37.3843,
    lng: -5.9974,
  },
  {
    id: '2',
    slug: 'smash-nervion',
    name: 'Smash Nervión',
    district: 'Nervión',
    category: 'Smash',
    price: 8.0,
    description: 'Doble smash burger con queso americano fundido, pickles y salsa BBQ. Pura delicia americana.',
    ingredients: ['Doble carne smash', 'Pan potato', 'Queso americano', 'Pickles', 'Cebolla', 'Salsa BBQ'],
    address: 'Av. Luis de Morales, 12, Nervión',
    hours: '13:00 - 23:30',
    instagram: '@smashnervion',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800',
    isGlutenFree: false,
    isVeggie: false,
    lat: 37.3756,
    lng: -5.9652,
  },
  {
    id: '3',
    slug: 'gourmet-alameda',
    name: 'Gourmet Alameda',
    district: 'Alameda',
    category: 'Gourmet',
    price: 14.5,
    description: 'Burger gourmet con foie, cebolla caramelizada, rúcula y reducción de Pedro Ximénez. Experiencia única.',
    ingredients: ['Carne Black Angus', 'Pan de espelta', 'Foie', 'Rúcula', 'Cebolla caramelizada', 'Reducción PX', 'Queso azul'],
    address: 'Alameda de Hércules, 78, Centro',
    hours: '20:00 - 01:00',
    phone: '+34 954 234 567',
    instagram: '@gourmetalameda',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800',
    isGlutenFree: false,
    isVeggie: false,
    lat: 37.3950,
    lng: -5.9900,
  },
  {
    id: '4',
    slug: 'green-remedios',
    name: 'Green Remedios',
    district: 'Los Remedios',
    category: 'Veggie',
    price: 10.0,
    description: 'Hamburguesa 100% vegetal con heura, aguacate, tomate seco y mayonesa de chipotle. Veggie pero brutal.',
    ingredients: ['Heura', 'Pan integral', 'Aguacate', 'Tomate seco', 'Espinacas', 'Queso vegano', 'Mayo chipotle'],
    address: 'Calle Asunción, 23, Los Remedios',
    hours: '12:30 - 23:00',
    instagram: '@greenremedios',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=800',
    isGlutenFree: true,
    isVeggie: true,
    lat: 37.3748,
    lng: -6.0051,
  },
  {
    id: '5',
    slug: 'bbq-macarena',
    name: 'BBQ Macarena',
    district: 'Macarena',
    category: 'BBQ',
    price: 11.0,
    description: 'Burger BBQ con pulled pork, aros de cebolla crujientes, coleslaw y doble queso cheddar. Para los más atrevidos.',
    ingredients: ['Carne de ternera', 'Pulled pork', 'Pan brioche', 'Doble cheddar', 'Aros de cebolla', 'Coleslaw', 'Salsa BBQ'],
    address: 'Calle Feria, 89, Macarena',
    hours: '13:00 - 00:00',
    phone: '+34 954 345 678',
    instagram: '@bbqmacarena',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800',
    isGlutenFree: false,
    isVeggie: false,
    lat: 37.3992,
    lng: -5.9858,
  },
  {
    id: '6',
    slug: 'fuego-centro',
    name: 'Fuego Centro',
    district: 'Centro',
    category: 'Picante',
    price: 9.5,
    description: 'Para los valientes: jalapeños, habanero, ghost pepper mayo y bacon crujiente. Nivel picante extremo.',
    ingredients: ['Carne picante', 'Pan brioche', 'Jalapeños', 'Habanero', 'Ghost pepper mayo', 'Bacon', 'Pepper jack cheese'],
    address: 'Calle Sierpes, 34, Centro',
    hours: '12:00 - 00:30',
    instagram: '@fuegocentro',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800',
    isGlutenFree: false,
    isVeggie: false,
    lat: 37.3886,
    lng: -5.9953,
  },
  {
    id: '7',
    slug: 'classic-bellavista',
    name: 'Classic Bellavista',
    district: 'Bellavista',
    category: 'Clásica',
    price: 8.5,
    description: 'La hamburguesa de toda la vida, hecha con amor. Sencilla pero perfecta en cada detalle.',
    ingredients: ['Carne 100% vacuno', 'Pan artesano', 'Queso gouda', 'Lechuga', 'Tomate', 'Cebolla', 'Ketchup casero'],
    address: 'Av. de Bellavista, 56, Bellavista',
    hours: '11:00 - 23:00',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800',
    isGlutenFree: false,
    isVeggie: false,
    lat: 37.3699,
    lng: -5.9745,
  },
  {
    id: '8',
    slug: 'smash-lab-san-pablo',
    name: 'Smash Lab San Pablo',
    district: 'San Pablo',
    category: 'Smash',
    price: 7.5,
    description: 'Triple smash burger con queso fundido entre cada capa. Simpleza elevada al máximo.',
    ingredients: ['Triple carne smash', 'Pan potato', 'Triple queso americano', 'Pickles', 'Mostaza', 'Ketchup'],
    address: 'Calle San Pablo, 102, San Pablo',
    hours: '13:00 - 23:00',
    instagram: '@smashlabsevilla',
    image: 'https://images.unsplash.com/photo-1615297928064-24977384d0da?w=800',
    isGlutenFree: false,
    isVeggie: false,
    lat: 37.4024,
    lng: -5.9781,
  },
  {
    id: '9',
    slug: 'premium-nervion',
    name: 'Premium Nervión',
    district: 'Nervión',
    category: 'Gourmet',
    price: 16.0,
    description: 'Wagyu burger con trufa negra, huevo a baja temperatura y chips de jamón ibérico. Lujo sevillano.',
    ingredients: ['Wagyu beef', 'Pan de carbón', 'Trufa negra', 'Huevo 63°', 'Chips jamón ibérico', 'Rúcula', 'Mahonesa trufada'],
    address: 'Calle Lope de Vega, 8, Nervión',
    hours: '20:00 - 00:00',
    phone: '+34 954 456 789',
    instagram: '@premiumnervion',
    image: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=800',
    isGlutenFree: false,
    isVeggie: false,
    lat: 37.3789,
    lng: -5.9688,
  },
  {
    id: '10',
    slug: 'veggie-soul-triana',
    name: 'Veggie Soul Triana',
    district: 'Triana',
    category: 'Veggie',
    price: 11.5,
    description: 'Beyond Burger con queso vegano ahumado, remolacha encurtida y alioli de ajo negro. Vegano sin renunciar al sabor.',
    ingredients: ['Beyond Meat', 'Pan sin gluten', 'Queso vegano ahumado', 'Remolacha', 'Lechuga morada', 'Alioli ajo negro'],
    address: 'Calle Pureza, 67, Triana',
    hours: '12:00 - 23:30',
    instagram: '@veggiesoultriana',
    image: 'https://images.unsplash.com/photo-1585238341710-fc9d08813be2?w=800',
    isGlutenFree: true,
    isVeggie: true,
    lat: 37.3862,
    lng: -6.0011,
  },
  {
    id: '11',
    slug: 'old-school-centro',
    name: 'Old School Centro',
    district: 'Centro',
    category: 'Clásica',
    price: 9.0,
    description: 'La hamburguesa clásica americana de toda la vida. Carne jugosa, queso fundido y vegetales frescos.',
    ingredients: ['Carne 180g', 'Pan brioche tostado', 'Cheddar doble', 'Lechuga iceberg', 'Tomate', 'Pepinillos', 'Salsa mil islas'],
    address: 'Plaza Nueva, 8, Centro',
    hours: '12:00 - 01:00',
    phone: '+34 954 567 890',
    instagram: '@oldschoolburger',
    image: 'https://images.unsplash.com/photo-1591336277697-cdae7e42dead?w=800',
    isGlutenFree: false,
    isVeggie: false,
    lat: 37.3890,
    lng: -5.9940,
  },
  {
    id: '12',
    slug: 'luxury-alameda',
    name: 'Luxury Alameda',
    district: 'Alameda',
    category: 'Gourmet',
    price: 18.5,
    description: 'Experiencia gastronómica con carne de Kobe, foie fresco y reducción de Oporto. Alta cocina en hamburguesa.',
    ingredients: ['Carne de Kobe', 'Pan de autor', 'Foie fresco', 'Cebolla confitada', 'Reducción Oporto', 'Microgreens', 'Queso manchego'],
    address: 'Alameda de Hércules, 95, Centro',
    hours: '19:00 - 00:00',
    phone: '+34 954 678 901',
    instagram: '@luxuryburgeralameda',
    image: 'https://images.unsplash.com/photo-1646122311175-7e4e32bbf56c?w=800',
    isGlutenFree: false,
    isVeggie: false,
    lat: 37.3965,
    lng: -5.9910,
  },
  {
    id: '13',
    slug: 'double-smash-remedios',
    name: 'Double Smash Remedios',
    district: 'Los Remedios',
    category: 'Smash',
    price: 8.5,
    description: 'Doble o nada. Dos carnes smash perfectamente cocinadas con queso americano y nuestra salsa signature.',
    ingredients: ['Doble smash 80g', 'Pan potato brioche', 'Queso americano x2', 'Cebolla crujiente', 'Pickles', 'Salsa signature'],
    address: 'Calle República Argentina, 34, Los Remedios',
    hours: '12:30 - 23:30',
    instagram: '@doublesmashsevilla',
    image: 'https://images.unsplash.com/photo-1713330801172-03f8d1c0dde7?w=800',
    isGlutenFree: false,
    isVeggie: false,
    lat: 37.3720,
    lng: -6.0020,
  },
  {
    id: '14',
    slug: 'bbq-pit-macarena',
    name: 'BBQ Pit Macarena',
    district: 'Macarena',
    category: 'BBQ',
    price: 12.5,
    description: 'Ahumada al estilo Texas. Carne BBQ, costilla deshuesada, onion rings y salsa BBQ casera.',
    ingredients: ['Carne ahumada', 'Pan brioche', 'Costilla deshuesada', 'Onion rings', 'Coleslaw', 'Cheddar', 'BBQ sauce'],
    address: 'Calle Resolana, 45, Macarena',
    hours: '13:00 - 00:00',
    phone: '+34 954 789 012',
    instagram: '@bbqpitsevilla',
    image: 'https://images.unsplash.com/photo-1718912053452-462af446bb8d?w=800',
    isGlutenFree: false,
    isVeggie: false,
    lat: 37.4010,
    lng: -5.9870,
  },
  {
    id: '15',
    slug: 'fire-devil-bellavista',
    name: 'Fire Devil Bellavista',
    district: 'Bellavista',
    category: 'Picante',
    price: 10.5,
    description: 'Para los que buscan emociones fuertes. Carolina reaper, jalapeños encurtidos y salsa infernal.',
    ingredients: ['Carne con especias', 'Pan negro', 'Carolina reaper', 'Jalapeños', 'Habanero mayo', 'Pepper jack', 'Bacon crujiente'],
    address: 'Av. Kansas City, 78, Bellavista',
    hours: '12:00 - 23:30',
    instagram: '@firedevilburger',
    image: 'https://images.unsplash.com/photo-1629680871149-434f75071693?w=800',
    isGlutenFree: false,
    isVeggie: false,
    lat: 37.3680,
    lng: -5.9760,
  },
  {
    id: '16',
    slug: 'plant-power-nervion',
    name: 'Plant Power Nervión',
    district: 'Nervión',
    category: 'Veggie',
    price: 10.0,
    description: '100% plant-based con Impossible Burger. Sabor a carne sin serlo. Increíblemente jugosa.',
    ingredients: ['Impossible Burger', 'Pan integral', 'Queso vegano cheddar', 'Aguacate', 'Tomate', 'Rúcula', 'Veganesa'],
    address: 'Calle Luis Montoto, 123, Nervión',
    hours: '11:00 - 23:00',
    instagram: '@plantpowersevilla',
    image: 'https://images.unsplash.com/photo-1599021366044-201d5b7359c0?w=800',
    isGlutenFree: true,
    isVeggie: true,
    lat: 37.3862,
    lng: -6.0011,
  },
];

// Generate mock votes
export function generateMockVotes(participants: Participant[]): Vote[] {
  const votes: Vote[] = [];
  const now = Date.now();
  
  participants.forEach((participant) => {
    // Random number of votes between 50 and 300
    const voteCount = Math.floor(Math.random() * 250) + 50;
    
    for (let i = 0; i < voteCount; i++) {
      votes.push({
        id: `vote-${participant.id}-${i}`,
        participantId: participant.id,
        taste: Math.floor(Math.random() * 2) + 3.5, // 3.5-5
        bun: Math.floor(Math.random() * 2) + 3,
        cooking: Math.floor(Math.random() * 2) + 3.5,
        presentation: Math.floor(Math.random() * 2) + 3,
        value: Math.floor(Math.random() * 2) + 3,
        timestamp: now - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000), // Last 7 days
      });
    }
  });
  
  return votes;
}

// Calculate weighted average
export function calculateWeightedAverage(vote: Vote): number {
  return (
    vote.taste * 0.4 +
    vote.bun * 0.15 +
    vote.cooking * 0.2 +
    vote.presentation * 0.1 +
    vote.value * 0.15
  );
}

// Calculate ranking
export function calculateRanking(participants: Participant[], votes: Vote[]): RankingEntry[] {
  const ranking = participants.map((participant) => {
    const participantVotes = votes.filter((v) => v.participantId === participant.id);
    const voteCount = participantVotes.length;
    
    const averageScore = voteCount > 0
      ? participantVotes.reduce((sum, vote) => sum + calculateWeightedAverage(vote), 0) / voteCount
      : 0;
    
    // Mock trend (random for now)
    const trendRandom = Math.random();
    const trend: 'up' | 'down' | 'stable' = trendRandom > 0.6 ? 'up' : trendRandom > 0.3 ? 'stable' : 'down';
    
    return {
      participant,
      averageScore: Math.round(averageScore * 100) / 100,
      voteCount,
      trend,
      position: 0,
      previousPosition: 0,
    };
  });
  
  // Sort by average score
  ranking.sort((a, b) => b.averageScore - a.averageScore);
  
  // Assign positions
  ranking.forEach((entry, index) => {
    entry.position = index + 1;
    entry.previousPosition = index + 1 + (entry.trend === 'up' ? 1 : entry.trend === 'down' ? -1 : 0);
  });
  
  return ranking;
}
