import { MediaItem } from '@/types/media';

// IMPORTANT: Replace this with your actual Hostinger domain
const API_BASE_URL = 'https://streamflux.shop/api';

// Helper function for API calls
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'Request failed');
  }

  return response.json();
}

// Media API functions
export const mediaApi = {
  // Get all media items
  getAll: async (): Promise<MediaItem[]> => {
    return apiCall<MediaItem[]>('/media.php');
  },

  // Get media items by category
  getByCategory: async (category: MediaItem['category']): Promise<MediaItem[]> => {
    return apiCall<MediaItem[]>(`/media.php?category=${category}`);
  },

  // Get single media item
  getById: async (id: string): Promise<MediaItem> => {
    return apiCall<MediaItem>(`/media.php?id=${id}`);
  },

  // Create new media item
  create: async (item: Omit<MediaItem, 'id'>): Promise<MediaItem> => {
    return apiCall<MediaItem>('/media.php', {
      method: 'POST',
      body: JSON.stringify(item),
    });
  },

  // Update media item
  update: async (id: string, updates: Partial<MediaItem>): Promise<MediaItem> => {
    return apiCall<MediaItem>(`/media.php?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  // Delete media item
  delete: async (id: string): Promise<void> => {
    await apiCall(`/media.php?id=${id}`, {
      method: 'DELETE',
    });
  },
};

// Upload API functions
export const uploadApi = {
  // Upload image file
  uploadImage: async (file: File): Promise<{ url: string; filename: string }> => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_BASE_URL}/upload.php`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Upload failed' }));
      throw new Error(error.error || 'Upload failed');
    }

    const data = await response.json();
    return {
      url: data.url,
      filename: data.filename,
    };
  },
};
