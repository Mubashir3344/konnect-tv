export interface MediaItem {
  id: string;
  title: string;
  thumbnail: string;
  category: 'football' | 'sports' | 'movies' | 'series';
  description?: string;
  year?: string;
  rating?: string;
  duration?: string;
  season?: number;
  episode?: number;
  league?: string;
  matchDate?: string;
  teams?: string;
  channelName?: string;
  isLive?: boolean;
}

export const mockMediaData: MediaItem[] = [
  // Football
  {
    id: '1',
    title: 'Manchester United vs Liverpool',
    thumbnail: '/placeholder.svg',
    category: 'football',
    league: 'Premier League',
    matchDate: '2024-01-15',
    teams: 'Man United vs Liverpool',
    isLive: true,
  },
  {
    id: '2',
    title: 'Barcelona vs Real Madrid',
    thumbnail: '/placeholder.svg',
    category: 'football',
    league: 'La Liga',
    matchDate: '2024-01-16',
    teams: 'Barcelona vs Real Madrid',
    isLive: false,
  },
  {
    id: '3',
    title: 'Bayern Munich vs Dortmund',
    thumbnail: '/placeholder.svg',
    category: 'football',
    league: 'Bundesliga',
    matchDate: '2024-01-17',
    teams: 'Bayern vs Dortmund',
    isLive: false,
  },
  // Sports Channels
  {
    id: '4',
    title: 'ESPN HD',
    thumbnail: '/placeholder.svg',
    category: 'sports',
    channelName: 'ESPN',
    isLive: true,
  },
  {
    id: '5',
    title: 'beIN Sports 1',
    thumbnail: '/placeholder.svg',
    category: 'sports',
    channelName: 'beIN Sports',
    isLive: true,
  },
  {
    id: '6',
    title: 'Sky Sports Premier League',
    thumbnail: '/placeholder.svg',
    category: 'sports',
    channelName: 'Sky Sports',
    isLive: true,
  },
  // Movies
  {
    id: '7',
    title: 'The Dark Knight',
    thumbnail: '/placeholder.svg',
    category: 'movies',
    year: '2008',
    rating: '9.0',
    duration: '2h 32m',
    description: 'When the menace known as the Joker wreaks havoc on Gotham...',
  },
  {
    id: '8',
    title: 'Inception',
    thumbnail: '/placeholder.svg',
    category: 'movies',
    year: '2010',
    rating: '8.8',
    duration: '2h 28m',
    description: 'A thief who steals corporate secrets through dream-sharing technology...',
  },
  {
    id: '9',
    title: 'Interstellar',
    thumbnail: '/placeholder.svg',
    category: 'movies',
    year: '2014',
    rating: '8.6',
    duration: '2h 49m',
    description: 'A team of explorers travel through a wormhole in space...',
  },
  // TV Series
  {
    id: '10',
    title: 'Breaking Bad',
    thumbnail: '/placeholder.svg',
    category: 'series',
    year: '2008',
    rating: '9.5',
    season: 5,
    episode: 62,
    description: 'A high school chemistry teacher turned meth manufacturer...',
  },
  {
    id: '11',
    title: 'Game of Thrones',
    thumbnail: '/placeholder.svg',
    category: 'series',
    year: '2011',
    rating: '9.2',
    season: 8,
    episode: 73,
    description: 'Nine noble families fight for control of the Iron Throne...',
  },
  {
    id: '12',
    title: 'Stranger Things',
    thumbnail: '/placeholder.svg',
    category: 'series',
    year: '2016',
    rating: '8.7',
    season: 4,
    episode: 34,
    description: 'When a young boy disappears, his friends uncover a mystery...',
  },
];
