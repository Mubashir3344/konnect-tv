import { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Star, Calendar, Clock, Tv, Trophy, Radio } from 'lucide-react';
import { MediaItem } from '@/types/media';
import { mediaApi } from '@/lib/api';

interface ContentRowProps {
  title: string;
  icon: React.ReactNode;
  items: MediaItem[];
  type: 'landscape' | 'portrait';
  autoSlide?: boolean;
}

const ContentRow = ({ title, icon, items, type, autoSlide = true }: ContentRowProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [centerIndex, setCenterIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const visibleCount = 5; // Number of items visible at once

  const slide = (direction: 'left' | 'right') => {
    if (items.length === 0) return;
    setCenterIndex(prev => {
      if (direction === 'right') {
        return (prev + 1) % items.length;
      } else {
        return (prev - 1 + items.length) % items.length;
      }
    });
  };

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
      slide('right');
    }, 3000);

    return () => clearInterval(interval);
  }, [autoSlide, isVisible, isHovered, items.length]);

  // Get visible items centered around centerIndex
  const getVisibleItems = () => {
    if (items.length === 0) return [];
    
    const result = [];
    const half = Math.floor(visibleCount / 2);
    
    for (let i = -half; i <= half; i++) {
      const index = (centerIndex + i + items.length) % items.length;
      result.push({
        item: items[index],
        position: i, // -2, -1, 0, 1, 2 (0 is center)
        originalIndex: index,
      });
    }
    return result;
  };

  const getItemStyles = (position: number) => {
    const absPosition = Math.abs(position);
    
    // Scale: center = 1, sides decrease
    const scale = position === 0 ? 1 : position === 1 || position === -1 ? 0.85 : 0.7;
    
    // Opacity: center = 1, sides decrease
    const opacity = position === 0 ? 1 : position === 1 || position === -1 ? 0.7 : 0.5;
    
    // Z-index: center highest
    const zIndex = 10 - absPosition;
    
    // Translate X for positioning
    const translateX = position * 85; // % offset
    
    // Blur for side items
    const blur = absPosition > 1 ? 1 : 0;
    
    return {
      transform: `translateX(${translateX}%) scale(${scale})`,
      opacity,
      zIndex,
      filter: blur > 0 ? `blur(${blur}px)` : 'none',
    };
  };

  const visibleItems = getVisibleItems();

  return (
    <div ref={containerRef} className="mb-16">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
            {icon}
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-foreground">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => slide('left')}
            className="p-2 rounded-full bg-secondary hover:bg-primary/20 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={() => slide('right')}
            className="p-2 rounded-full bg-secondary hover:bg-primary/20 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      {/* Center-focused Carousel */}
      <div 
        className="relative h-[320px] md:h-[380px] overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          {visibleItems.map(({ item, position, originalIndex }) => (
            <div
              key={`${item.id}-${originalIndex}`}
              className="absolute w-64 sm:w-72 md:w-80 transition-all duration-500 ease-out cursor-pointer"
              style={getItemStyles(position)}
              onClick={() => position !== 0 && setCenterIndex(originalIndex)}
            >
              {/* Card */}
              <div className={`relative rounded-xl overflow-hidden glass-card transition-all duration-300 ${position === 0 ? 'ring-2 ring-primary/50 shadow-2xl shadow-primary/20' : ''}`}>
                {/* Thumbnail */}
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover"
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

                  {/* Center item highlight glow */}
                  {position === 0 && (
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-card to-transparent" />
                </div>

                {/* Content */}
                <div className="p-3">
                  <h3 className={`font-semibold text-sm md:text-base truncate transition-colors ${position === 0 ? 'text-primary' : 'text-foreground'}`}>
                    {item.title}
                  </h3>

                  {/* Meta - only show for center item */}
                  {position === 0 && (
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
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      {items.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {items.slice(0, Math.min(items.length, 10)).map((_, index) => (
            <button
              key={index}
              onClick={() => setCenterIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === centerIndex 
                  ? 'bg-primary w-6' 
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
          {items.length > 10 && (
            <span className="text-xs text-muted-foreground ml-1">+{items.length - 10}</span>
          )}
        </div>
      )}
    </div>
  );
};
const ContentShowcase = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    // Load from API (same source as admin panel)
    const loadMedia = async () => {
      try {
        const items = await mediaApi.getAll();
        setMediaItems(items);
      } catch (error) {
        console.error('Failed to load media:', error);
      }
    };
    loadMedia();
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
