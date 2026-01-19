import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MediaItem } from '@/types/media';
import { mediaApi } from '@/lib/api';
import MediaCard from '@/components/admin/MediaCard';
import MediaFormModal from '@/components/admin/MediaFormModal';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Plus, 
  Trophy, 
  Radio, 
  Film, 
  Clapperboard,
  Search,
  LayoutGrid,
  List,
  Loader2
} from 'lucide-react';
import logo from '@/assets/logo.png';
import { toast } from 'sonner';

type TabType = 'all' | 'football' | 'sports' | 'movies' | 'series';

const AdminDashboard = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    setIsLoading(true);
    try {
      const items = await mediaApi.getAll();
      setMediaItems(items);
    } catch (error) {
      console.error('Failed to load media:', error);
      toast.error('Failed to load media. Check your API connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'all', label: 'All Media', icon: LayoutGrid, count: mediaItems.length },
    { id: 'football', label: 'Football Leagues', icon: Trophy, count: mediaItems.filter(i => i.category === 'football').length },
    { id: 'sports', label: 'Sports Channels', icon: Radio, count: mediaItems.filter(i => i.category === 'sports').length },
    { id: 'movies', label: 'Movies', icon: Film, count: mediaItems.filter(i => i.category === 'movies').length },
    { id: 'series', label: 'TV Series', icon: Clapperboard, count: mediaItems.filter(i => i.category === 'series').length },
  ];

  const filteredItems = mediaItems.filter(item => {
    const matchesTab = activeTab === 'all' || item.category === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleAdd = async (data: Omit<MediaItem, 'id'>) => {
    try {
      await mediaApi.create(data);
      await loadMedia();
      toast.success('Media added successfully!');
    } catch (error) {
      console.error('Failed to add media:', error);
      toast.error('Failed to add media');
    }
  };

  const handleEdit = async (data: MediaItem) => {
    try {
      await mediaApi.update(data.id, data);
      await loadMedia();
      setEditingItem(null);
      toast.success('Media updated successfully!');
    } catch (error) {
      console.error('Failed to update media:', error);
      toast.error('Failed to update media');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        await mediaApi.delete(id);
        await loadMedia();
        toast.success('Media deleted successfully!');
      } catch (error) {
        console.error('Failed to delete media:', error);
        toast.error('Failed to delete media');
      }
    }
  };

  const openEditModal = (item: MediaItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-card border-b border-border/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="p-2 rounded-lg hover:bg-secondary transition-colors">
                <ArrowLeft className="w-5 h-5 text-muted-foreground" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="h-9 w-24">
                  <img 
                    src={logo} 
                    alt="Konnect TV Logo" 
                    className="h-full w-full object-contain"
                    style={{ mixBlendMode: 'multiply' }}
                  />
                </div>
                <div>
                  <h1 className="font-semibold text-foreground">Media Manager</h1>
                  <p className="text-xs text-muted-foreground">Manage your content library</p>
                </div>
              </div>
            </div>

            <Button variant="hero" size="lg" onClick={openAddModal}>
              <Plus className="w-5 h-5" />
              Add Media
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {tabs.slice(1).map((tab) => (
            <div
              key={tab.id}
              className="glass-card rounded-xl p-4 hover:border-primary/30 transition-colors cursor-pointer"
              onClick={() => setActiveTab(tab.id as TabType)}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <tab.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{tab.count}</p>
                  <p className="text-xs text-muted-foreground">{tab.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs & Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-primary-foreground/20' : 'bg-muted'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search media..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 pr-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
            </div>
            <div className="flex items-center rounded-lg bg-secondary p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Media Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredItems.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'flex flex-col gap-4'
          }>
            {filteredItems.map((item) => (
              <MediaCard
                key={item.id}
                item={item}
                onEdit={openEditModal}
                onDelete={handleDelete}
                showActions
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-secondary flex items-center justify-center">
              <Film className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No media found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery ? 'Try a different search term' : 'Add your first media item to get started'}
            </p>
            <Button variant="hero" onClick={openAddModal}>
              <Plus className="w-5 h-5" />
              Add Media
            </Button>
          </div>
        )}
      </div>

      {/* Form Modal */}
      <MediaFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onSubmit={(data) => {
          if (editingItem) {
            handleEdit(data as MediaItem);
          } else {
            handleAdd(data as Omit<MediaItem, 'id'>);
          }
        }}
        editItem={editingItem}
        defaultCategory={activeTab !== 'all' ? activeTab : 'movies'}
      />
    </div>
  );
};

export default AdminDashboard;
