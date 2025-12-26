import { MediaItem } from '@/types/media';
import { Play, Star, Calendar, Clock, Tv, Trophy, Radio } from 'lucide-react';

interface MediaCardProps {
  item: MediaItem;
  onEdit?: (item: MediaItem) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

const MediaCard = ({ item, onEdit, onDelete, showActions = false }: MediaCardProps) => {
  const getCategoryBadge = () => {
    switch (item.category) {
      case 'football':
        return (
          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
            <Trophy className="w-3 h-3" />
            Football
          </span>
        );
      case 'sports':
        return (
          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-medium">
            <Radio className="w-3 h-3" />
            Sports
          </span>
        );
      case 'movies':
        return (
          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-medium">
            <Play className="w-3 h-3" />
            Movie
          </span>
        );
      case 'series':
        return (
          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-medium">
            <Tv className="w-3 h-3" />
            Series
          </span>
        );
    }
  };

  return (
    <div className="group relative rounded-xl overflow-hidden glass-card hover:border-primary/30 transition-all duration-300">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-secondary overflow-hidden">
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
        
        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          {getCategoryBadge()}
        </div>

        {/* Play Overlay */}
        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-6 h-6 text-primary-foreground fill-primary-foreground ml-1" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground truncate mb-2 group-hover:text-primary transition-colors">
          {item.title}
        </h3>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          {item.year && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {item.year}
            </span>
          )}
          {item.rating && (
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              {item.rating}
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
            <span>{item.league}</span>
          )}
          {item.channelName && (
            <span>{item.channelName}</span>
          )}
        </div>

        {item.description && (
          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
            {item.description}
          </p>
        )}

        {/* Actions */}
        {showActions && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
            <button
              onClick={() => onEdit?.(item)}
              className="flex-1 px-3 py-2 rounded-lg bg-secondary hover:bg-primary/20 text-sm font-medium text-foreground transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete?.(item.id)}
              className="flex-1 px-3 py-2 rounded-lg bg-destructive/20 hover:bg-destructive/30 text-sm font-medium text-destructive transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaCard;
