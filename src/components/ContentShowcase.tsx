import { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Star, Calendar, Clock, Tv, Trophy, Radio } from 'lucide-react';
import { MediaItem } from '@/types/media';
import { getMediaItems } from '@/lib/mediaStorage';

interface ContentRowProps {
  title: string;
  icon: React.ReactNode;
  items: MediaItem[];
  type: 'landscape' | 'portrait';
  autoSlide?: boolean;
}

const ContentRow = ({ title, icon, items, type, autoSlide = true }: ContentRowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate items for infinite loop effect (5 copies for smoother looping)
  const loopedItems = items.length > 0 ? [...items, ...items, ...items, ...items, ...items] : [];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Handle infinite loop scroll
  const handleScroll = useCallback(() => {
    if (!scrollRef.current || items.length === 0) return;
    
    const { scrollLeft, scrollWidth } = scrollRef.current;
    const singleSetWidth = scrollWidth / 5; // Since we have 5 copies
    
    // If scrolled too far right, jump back
    if (scrollLeft >= singleSetWidth * 4) {
      scrollRef.current.scrollLeft = singleSetWidth * 2;
    }
    // If scrolled too far left, jump forward
    else if (scrollLeft <= singleSetWidth * 0.5) {
      scrollRef.current.scrollLeft = singleSetWidth * 2;
    }
  }, [items.length]);

  // Initialize scroll position to middle set
  useEffect(() => {
    if (scrollRef.current && items.length > 0) {
      // Set initial scroll to the middle
      const singleSetWidth = scrollRef.current.scrollWidth / 5;
      scrollRef.current.scrollLeft = singleSetWidth * 2;
    }
  }, [items.length, loopedItems.length]);

  // Intersection Observer - only auto-slide when in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-scroll effect - only when visible OR hovered
  useEffect(() => {
    if (!autoSlide || items.length <= 3) return;
    if (!isVisible && !isHovered) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [autoSlide, isVisible, isHovered, items.length]);

  return (
    <div ref={containerRef} className="mb-12">
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
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onScroll={handleScroll}
      >
        {loopedItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="group flex-shrink-0 w-64 sm:w-72 md:w-80"
          >
            {/* Card */}
            <div className="relative rounded-xl overflow-hidden glass-card hover:border-primary/30 transition-all duration-300 cursor-pointer">
              {/* Thumbnail */}
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
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

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

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
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    // Load from admin panel storage
    const items = getMediaItems();
    setMediaItems(items);
  }, []);

  const footballMatches = mediaItems.filter(m => m.category === 'football');
  const sportsChannels = mediaItems.filter(m => m.category === 'sports');
  const movies = mediaItems.filter(m => m.category === 'movies');
  const series = mediaItems.filter(m => m.category === 'series');

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

        {/* Football Leagues */}
        {footballMatches.length > 0 && (
          <ContentRow
            title="Football Leagues"
            icon={<Trophy className="w-5 h-5 text-green-400" />}
            items={footballMatches}
            type="landscape"
          />
        )}

        {/* Sports Channels */}
        {sportsChannels.length > 0 && (
          <ContentRow
            title="Sports Channels"
            icon={<Radio className="w-5 h-5 text-orange-400" />}
            items={sportsChannels}
            type="landscape"
          />
        )}

        {/* Movies */}
        {movies.length > 0 && (
          <ContentRow
            title="Popular Movies"
            icon={<Play className="w-5 h-5 text-purple-400" />}
            items={movies}
            type="portrait"
          />
        )}

        {/* TV Series */}
        {series.length > 0 && (
          <ContentRow
            title="Trending Series"
            icon={<Tv className="w-5 h-5 text-blue-400" />}
            items={series}
            type="portrait"
          />
        )}
      </div>
    </section>
  );
};

export default ContentShowcase;
