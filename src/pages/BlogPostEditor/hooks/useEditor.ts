import { useState } from 'react';

interface Post {
  title: string;
  content: string;
  category: string;
  tags: string[];
  status: 'draft' | 'review' | 'published';
  featuredImage: File | null;
  publishDate: string;
}

export const useEditor = () => {
  const [post, setPost] = useState<Post>({
    title: '',
    content: '',
    category: '',
    tags: [],
    status: 'draft',
    featuredImage: null,
    publishDate: new Date().toISOString().slice(0, 16)
  });

  const updatePost = (updates: Partial<Post>) => {
    setPost(prev => ({ ...prev, ...updates }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updatePost({ featuredImage: file });
    }
  };

  return {
    post,
    updatePost,
    handleImageUpload
  };
};