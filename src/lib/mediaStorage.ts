import { MediaItem, mockMediaData } from '@/types/media';

const STORAGE_KEY = 'streamvision_media';

export const getMediaItems = (): MediaItem[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  // Initialize with mock data
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockMediaData));
  return mockMediaData;
};

export const saveMediaItems = (items: MediaItem[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const addMediaItem = (item: Omit<MediaItem, 'id'>): MediaItem => {
  const items = getMediaItems();
  const newItem: MediaItem = {
    ...item,
    id: Date.now().toString(),
  };
  items.push(newItem);
  saveMediaItems(items);
  return newItem;
};

export const updateMediaItem = (id: string, updates: Partial<MediaItem>): MediaItem | null => {
  const items = getMediaItems();
  const index = items.findIndex(item => item.id === id);
  if (index === -1) return null;
  
  items[index] = { ...items[index], ...updates };
  saveMediaItems(items);
  return items[index];
};

export const deleteMediaItem = (id: string): boolean => {
  const items = getMediaItems();
  const filtered = items.filter(item => item.id !== id);
  if (filtered.length === items.length) return false;
  
  saveMediaItems(filtered);
  return true;
};

export const getMediaByCategory = (category: MediaItem['category']): MediaItem[] => {
  return getMediaItems().filter(item => item.category === category);
};
