import { useState, useEffect } from 'react';
import { MediaItem } from '@/types/media';
import { Button } from '@/components/ui/button';
import { X, Upload } from 'lucide-react';

interface MediaFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<MediaItem, 'id'> | MediaItem) => void;
  editItem?: MediaItem | null;
  defaultCategory?: MediaItem['category'];
}

const MediaFormModal = ({ isOpen, onClose, onSubmit, editItem, defaultCategory = 'movies' }: MediaFormModalProps) => {
  const [formData, setFormData] = useState<Partial<MediaItem>>({
    category: defaultCategory,
    title: '',
    thumbnail: '/placeholder.svg',
    description: '',
    year: '',
    rating: '',
    duration: '',
    season: undefined,
    episode: undefined,
    league: '',
    matchDate: '',
    teams: '',
    channelName: '',
    isLive: false,
  });

  useEffect(() => {
    if (editItem) {
      setFormData(editItem);
    } else {
      setFormData({
        category: defaultCategory,
        title: '',
        thumbnail: '/placeholder.svg',
        description: '',
        year: '',
        rating: '',
        duration: '',
        season: undefined,
        episode: undefined,
        league: '',
        matchDate: '',
        teams: '',
        channelName: '',
        isLive: false,
      });
    }
  }, [editItem, defaultCategory, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editItem) {
      onSubmit({ ...editItem, ...formData } as MediaItem);
    } else {
      onSubmit(formData as Omit<MediaItem, 'id'>);
    }
    onClose();
  };

  if (!isOpen) return null;

  const categoryFields = () => {
    switch (formData.category) {
      case 'football':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">League</label>
                <input
                  type="text"
                  value={formData.league || ''}
                  onChange={(e) => setFormData({ ...formData, league: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:border-primary"
                  placeholder="Premier League"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Match Date</label>
                <input
                  type="date"
                  value={formData.matchDate || ''}
                  onChange={(e) => setFormData({ ...formData, matchDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:border-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Teams</label>
              <input
                type="text"
                value={formData.teams || ''}
                onChange={(e) => setFormData({ ...formData, teams: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:border-primary"
                placeholder="Team A vs Team B"
              />
            </div>
          </>
        );
      case 'sports':
        return (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Channel Name</label>
            <input
              type="text"
              value={formData.channelName || ''}
              onChange={(e) => setFormData({ ...formData, channelName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:border-primary"
              placeholder="ESPN, beIN Sports, etc."
            />
          </div>
        );
      case 'movies':
        return (
          <>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Year</label>
                <input
                  type="text"
                  value={formData.year || ''}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:border-primary"
                  placeholder="2024"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Rating</label>
                <input
                  type="text"
                  value={formData.rating || ''}
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:border-primary"
                  placeholder="8.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Duration</label>
                <input
                  type="text"
                  value={formData.duration || ''}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:border-primary"
                  placeholder="2h 30m"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Description</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:border-primary resize-none"
                placeholder="Movie description..."
              />
            </div>
          </>
        );
      case 'series':
        return (
          <>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Year</label>
                <input
                  type="text"
                  value={formData.year || ''}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:border-primary"
                  placeholder="2024"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Rating</label>
                <input
                  type="text"
                  value={formData.rating || ''}
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:border-primary"
                  placeholder="8.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Seasons</label>
                <input
                  type="number"
                  value={formData.season || ''}
                  onChange={(e) => setFormData({ ...formData, season: parseInt(e.target.value) || undefined })}
                  className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:border-primary"
                  placeholder="5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Episodes</label>
                <input
                  type="number"
                  value={formData.episode || ''}
                  onChange={(e) => setFormData({ ...formData, episode: parseInt(e.target.value) || undefined })}
                  className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:border-primary"
                  placeholder="50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Description</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:border-primary resize-none"
                placeholder="Series description..."
              />
            </div>
          </>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg mx-4 glass-card rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            {editItem ? 'Edit Media' : 'Add New Media'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category Selector */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Category</label>
            <div className="grid grid-cols-4 gap-2">
              {(['football', 'sports', 'movies', 'series'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: cat })}
                  className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                    formData.category === cat
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Title *</label>
            <input
              type="text"
              required
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:border-primary"
              placeholder="Enter title..."
            />
          </div>

          {/* Thumbnail URL */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Thumbnail URL</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.thumbnail || ''}
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                className="flex-1 px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:border-primary"
                placeholder="https://example.com/image.jpg"
              />
              <button
                type="button"
                className="px-4 py-2.5 rounded-lg bg-secondary border border-border hover:border-primary/50 transition-colors"
              >
                <Upload className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Live Toggle */}
          {(formData.category === 'football' || formData.category === 'sports') && (
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isLive"
                checked={formData.isLive || false}
                onChange={(e) => setFormData({ ...formData, isLive: e.target.checked })}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              <label htmlFor="isLive" className="text-sm font-medium text-foreground">
                Currently Live
              </label>
            </div>
          )}

          {/* Category-specific fields */}
          {categoryFields()}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="glass" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="hero" className="flex-1">
              {editItem ? 'Save Changes' : 'Add Media'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MediaFormModal;
