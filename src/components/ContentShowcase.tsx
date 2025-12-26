import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Star, Calendar, Clock, Tv, Trophy, Radio } from 'lucide-react';

// Import images
import football1 from '@/assets/football-1.jpg';
import football2 from '@/assets/football-2.jpg';
import football3 from '@/assets/football-3.jpg';
import sportsChannel1 from '@/assets/sports-channel-1.jpg';
import sportsChannel2 from '@/assets/sports-channel-2.jpg';
import sportsChannel3 from '@/assets/sports-channel-3.jpg';
import movie1 from '@/assets/movie-1.jpg';
import movie2 from '@/assets/movie-2.jpg';
import movie3 from '@/assets/movie-3.jpg';
import series1 from '@/assets/series-1.jpg';
import series2 from '@/assets/series-2.jpg';
import series3 from '@/assets/series-3.jpg';

interface MediaItem {
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

// Demo data with real images
const demoMedia: MediaItem[] = [
  // Football Matches
  {
    id: '1',
    title: 'Manchester United vs Liverpool',
    thumbnail: football1,
    category: 'football',
    league: 'Premier League',
    matchDate: '2024-01-15',
    teams: 'Man United vs Liverpool',
    isLive: true,
  },
  {
    id: '2',
    title: 'Barcelona vs Real Madrid',
    thumbnail: football2,
    category: 'football',
    league: 'La Liga',
    matchDate: '2024-01-16',
    teams: 'Barcelona vs Real Madrid',
    isLive: false,
  },
  {
    id: '3',
    title: 'Bayern Munich vs Dortmund',
    thumbnail: football3,
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
    thumbnail: sportsChannel1,
    category: 'sports',
    channelName: 'ESPN',
    isLive: true,
  },
  {
    id: '5',
    title: 'NBA League Pass',
    thumbnail: sportsChannel2,
    category: 'sports',
    channelName: 'NBA TV',
    isLive: true,
  },
  {
    id: '6',
    title: 'UFC Fight Night',
    thumbnail: sportsChannel3,
    category: 'sports',
    channelName: 'UFC',
    isLive: true,
  },
  // Movies
  {
    id: '7',
    title: 'The Dark Knight',
    thumbnail: movie1,
    category: 'movies',
    year: '2008',
    rating: '9.0',
    duration: '2h 32m',
    description: 'When the menace known as the Joker wreaks havoc on Gotham...',
  },
  {
    id: '8',
    title: 'Interstellar',
    thumbnail: movie2,
    category: 'movies',
    year: '2014',
    rating: '8.6',
    duration: '2h 49m',
    description: 'A team of explorers travel through a wormhole in space...',
  },
  {
    id: '9',
    title: 'Fast & Furious',
    thumbnail: movie3,
    category: 'movies',
    year: '2023',
    rating: '7.8',
    duration: '2h 21m',
    description: 'Dom and his crew face their most dangerous adversary yet...',
  },
  // TV Series
  {
    id: '10',
    title: 'Breaking Bad',
    thumbnail: series1,
    category: 'series',
    year: '2008',
    rating: '9.5',
    season: 5,
    episode: 62,
    description: 'A high school chemistry teacher turned meth manufacturer...',
  },
  {
    id: '11',
    title: 'House of the Dragon',
    thumbnail: series2,
    category: 'series',
    year: '2022',
    rating: '8.9',
    season: 2,
    episode: 18,
    description: 'The reign of House Targaryen begins with this prequel...',
  },
  {
    id: '12',
    title: 'Stranger Things',
    thumbnail: series3,
    category: 'series',
    year: '2016',
    rating: '8.7',
    season: 4,
    episode: 34,
    description: 'When a young boy disappears, his friends uncover a mystery...',
  },
];

interface ContentRowProps {
  title: string;
  icon: React.ReactNode;
  items: MediaItem[];
  type: 'landscape' | 'portrait';
}

const ContentRow = ({ title, icon, items, type }: ContentRowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
            {icon}
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-foreground">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-secondary hover:bg-primary/20 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-secondary hover:bg-primary/20 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      {/* Scrollable Row */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className={`group flex-shrink-0 ${
              type === 'portrait' ? 'w-40 sm:w-48 md:w-52' : 'w-72 sm:w-80 md:w-96'
            }`}
          >
            {/* Card */}
            <div className="relative rounded-xl overflow-hidden glass-card hover:border-primary/30 transition-all duration-300 cursor-pointer">
              {/* Thumbnail */}
              <div className={`relative overflow-hidden ${type === 'portrait' ? 'aspect-[2/3]' : 'aspect-video'}`}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Live Badge */}
                {item.isLive && (
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500 text-foreground text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
                    LIVE
                  </div>
                )}

                {/* Rating Badge (for movies/series) */}
                {item.rating && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-semibold">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    {item.rating}
                  </div>
                )}

                {/* Play Overlay */}
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg shadow-primary/30">
                    <Play className="w-6 h-6 text-primary-foreground fill-primary-foreground ml-1" />
                  </div>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-card to-transparent" />
              </div>

              {/* Content */}
              <div className="p-3">
                <h3 className="font-semibold text-foreground text-sm md:text-base truncate group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-muted-foreground">
                  {item.year && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.year}
                    </span>
                  )}
                  {item.duration && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.duration}
                    </span>
                  )}
                  {item.season && (
                    <span>S{item.season} • {item.episode} Eps</span>
                  )}
                  {item.league && (
                    <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">
                      {item.league}
                    </span>
                  )}
                  {item.channelName && (
                    <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                      {item.channelName}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ContentShowcase = () => {
  const footballMatches = demoMedia.filter(m => m.category === 'football');
  const sportsChannels = demoMedia.filter(m => m.category === 'sports');
  const movies = demoMedia.filter(m => m.category === 'movies');
  const series = demoMedia.filter(m => m.category === 'series');

  return (
    <section id="content" className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(199_89%_48%_/_0.03)_0%,_transparent_70%)]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Content Library</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Explore Our
            <span className="gradient-text"> Premium Content</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From live sports to blockbuster movies - entertainment for everyone
          </p>
        </div>

        {/* Live Football */}
        <ContentRow
          title="Live Football Matches"
          icon={<Trophy className="w-5 h-5 text-green-400" />}
          items={footballMatches}
          type="landscape"
        />

        {/* Sports Channels */}
        <ContentRow
          title="Sports Channels"
          icon={<Radio className="w-5 h-5 text-orange-400" />}
          items={sportsChannels}
          type="landscape"
        />

        {/* Movies */}
        <ContentRow
          title="Popular Movies"
          icon={<Play className="w-5 h-5 text-purple-400" />}
          items={movies}
          type="portrait"
        />

        {/* TV Series */}
        <ContentRow
          title="Trending Series"
          icon={<Tv className="w-5 h-5 text-blue-400" />}
          items={series}
          type="portrait"
        />
      </div>
    </section>
  );
};

export default ContentShowcase;
