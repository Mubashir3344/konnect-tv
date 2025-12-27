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
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const animationRef = useRef<number>();
  const scrollSpeedRef = useRef(0.5);
  const baseSpeed = 0.5;
  const boostSpeed = 4;
  const boostDurationRef = useRef(0);
  const boostDirectionRef = useRef<'left' | 'right'>('right');

  // Duplicate items for infinite loop
  const loopedItems = items.length > 0 ? [...items, ...items, ...items] : [];

  const scroll = (direction: 'left' | 'right') => {
    // Boost speed in the clicked direction for smooth acceleration
    boostDirectionRef.current = direction;
    boostDurationRef.current = 60; // frames of boosted speed
    scrollSpeedRef.current = direction === 'right' ? boostSpeed : -boostSpeed;
  };

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Continuous smooth scrolling animation
  useEffect(() => {
    if (!autoSlide || items.length <= 2) return;
    if (!isVisible && !isHovered) return;

    const animate = () => {
      if (scrollRef.current) {
        // Handle boost duration countdown
        if (boostDurationRef.current > 0) {
          boostDurationRef.current--;
          // Gradually return to base speed
          if (boostDurationRef.current === 0) {
            scrollSpeedRef.current = baseSpeed;
          }
        }
        
        scrollRef.current.scrollLeft += scrollSpeedRef.current;
        
        // Reset to middle when reaching end
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const singleSetWidth = scrollWidth / 3;
        
        if (scrollLeft >= singleSetWidth * 2) {
          scrollRef.current.scrollLeft = singleSetWidth;
        } else if (scrollLeft <= 0) {
          scrollRef.current.scrollLeft = singleSetWidth;
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [autoSlide, isVisible, isHovered, items.length]);

  // Initialize scroll position
  useEffect(() => {
    if (scrollRef.current && items.length > 0) {
      const singleSetWidth = scrollRef.current.scrollWidth / 3;
      scrollRef.current.scrollLeft = singleSetWidth;
    }
  }, [items.length]);

  // Calculate scale based on distance from center
  const getItemScale = (element: HTMLDivElement | null, containerElement: HTMLDivElement | null) => {
    if (!element || !containerElement) return { scale: 0.75, opacity: 0.5 };
    
    const containerRect = containerElement.getBoundingClientRect();
    const itemRect = element.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    const itemCenter = itemRect.left + itemRect.width / 2;
    const distance = Math.abs(containerCenter - itemCenter);
    const maxDistance = containerRect.width / 2;
    
    // Calculate scale: 1 at center, 0.7 at edges
    const normalizedDistance = Math.min(distance / maxDistance, 1);
    const scale = 1 - (normalizedDistance * 0.3);
    const opacity = 1 - (normalizedDistance * 0.5);
    
    return { scale, opacity };
  };

  const [, forceUpdate] = useState(0);
  
  // Force re-render on scroll to update scales
  useEffect(() => {
    const handleScroll = () => forceUpdate(n => n + 1);
    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener('scroll', handleScroll, { passive: true });
      return () => scrollEl.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div ref={containerRef} className="mb-14">
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

      {/* Scrollable Row with Center Focus */}
      <div className="relative">
        {/* Edge gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />
        
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide py-6 px-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseEnter={() => {
            setIsHovered(true);
            scrollSpeedRef.current = 0.2; // Slow down on hover
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            scrollSpeedRef.current = 0.5;
          }}
        >
          {loopedItems.map((item, index) => {
            const itemRef = useRef<HTMLDivElement>(null);
            const { scale, opacity } = getItemScale(itemRef.current, containerRef.current);
            const isCenter = scale > 0.9;
            
            return (
              <div
                key={`${item.id}-${index}`}
                ref={itemRef}
                className="flex-shrink-0 transition-all duration-150 ease-out"
                style={{
                  width: '280px',
                  transform: `scale(${scale})`,
                  opacity: Math.max(opacity, 0.4),
                }}
              >
                <div className={`relative rounded-xl overflow-hidden glass-card transition-all duration-200 ${isCenter ? 'ring-2 ring-primary/40 shadow-xl shadow-primary/10' : ''}`}>
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

                    {/* Rating Badge */}
                    {item.rating && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-semibold">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        {item.rating}
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-card to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-3">
                    <h3 className={`font-semibold text-sm truncate transition-colors ${isCenter ? 'text-primary' : 'text-foreground'}`}>
                      {item.title}
                    </h3>

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
                        <span>S{item.season}</span>
                      )}
                      {item.league && (
                        <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-[10px]">
                          {item.league}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ContentShowcase = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  useEffect(() => {
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

        {footballMatches.length > 0 && (
          <ContentRow
            title="Football Leagues"
            icon={<Trophy className="w-5 h-5 text-green-400" />}
            items={footballMatches}
            type="landscape"
          />
        )}

        {sportsChannels.length > 0 && (
          <ContentRow
            title="Sports Channels"
            icon={<Radio className="w-5 h-5 text-orange-400" />}
            items={sportsChannels}
            type="landscape"
          />
        )}

        {movies.length > 0 && (
          <ContentRow
            title="Popular Movies"
            icon={<Play className="w-5 h-5 text-purple-400" />}
            items={movies}
            type="portrait"
          />
        )}

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
