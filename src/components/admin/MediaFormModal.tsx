import { useState, useEffect, useRef } from 'react';
import { MediaItem } from '@/types/media';
import { Button } from '@/components/ui/button';
import { X, Upload, Loader2, ImageIcon, Link as LinkIcon } from 'lucide-react';
import { uploadApi } from '@/lib/api';
import { toast } from 'sonner';

interface MediaFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<MediaItem, 'id'> | MediaItem) => void;
  editItem?: MediaItem | null;
  defaultCategory?: MediaItem['category'];
}

const MediaFormModal = ({ isOpen, onClose, onSubmit, editItem, defaultCategory = 'movies' }: MediaFormModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMode, setUploadMode] = useState<'upload' | 'url'>('upload');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  
  const [formData, setFormData] = useState<Partial<MediaItem>>({
    category: defaultCategory,
    title: '',
    thumbnail: '',
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
      setPreviewUrl(editItem.thumbnail || '');
    } else {
      setFormData({
        category: defaultCategory,
        title: '',
        thumbnail: '',
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
      setPreviewUrl('');
    }
  }, [editItem, defaultCategory, isOpen]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file (JPG, PNG, GIF, WEBP)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    // Show local preview immediately
    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);

    // Upload to server
    setIsUploading(true);
    try {
      const result = await uploadApi.uploadImage(file);
      setFormData(prev => ({ ...prev, thumbnail: result.url }));
      setPreviewUrl(result.url);
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to upload image');
      setPreviewUrl('');
      setFormData(prev => ({ ...prev, thumbnail: '' }));
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleUrlChange = (url: string) => {
    setFormData({ ...formData, thumbnail: url });
    setPreviewUrl(url);
  };

  const clearImage = () => {
    setFormData({ ...formData, thumbnail: '' });
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

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

          {/* Thumbnail - Upload or URL */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Thumbnail</label>
            
            {/* Mode Toggle */}
            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={() => setUploadMode('upload')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  uploadMode === 'upload'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                <Upload className="w-4 h-4" />
                Upload
              </button>
              <button
                type="button"
                onClick={() => setUploadMode('url')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  uploadMode === 'url'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                <LinkIcon className="w-4 h-4" />
                URL
              </button>
            </div>

            {uploadMode === 'upload' ? (
              <>
                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  className="hidden"
                />
                
                {/* Upload Area */}
                {!previewUrl ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="w-full h-32 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-secondary/50 transition-colors disabled:opacity-50"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        <span className="text-sm text-muted-foreground">Uploading...</span>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-8 h-8 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Click to upload image</span>
                        <span className="text-xs text-muted-foreground/60">JPG, PNG, GIF, WEBP (max 5MB)</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg border border-border"
                      onError={() => {
                        setPreviewUrl('');
                        toast.error('Failed to load image');
                      }}
                    />
                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/80 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    {isUploading && (
                      <div className="absolute inset-0 bg-background/50 rounded-lg flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <>
                {/* URL Input */}
                <input
                  type="url"
                  value={formData.thumbnail || ''}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:border-primary"
                  placeholder="https://example.com/image.jpg"
                />
                
                {/* URL Preview */}
                {previewUrl && (
                  <div className="mt-3 relative">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg border border-border"
                      onError={() => setPreviewUrl('')}
                    />
                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/80 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
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
            <Button type="submit" variant="hero" className="flex-1" disabled={isUploading}>
              {editItem ? 'Save Changes' : 'Add Media'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MediaFormModal;
