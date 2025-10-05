// Example component demonstrating Netlify DB usage
import React, { useState, useEffect } from 'react';
import { getPostById, getAllPosts, createPost } from '@/utils/netlify-db';

const NetlifyDBExample: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  // Fetch all posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllPosts();
      setPosts(data);
    } catch (err) {
      setError('Failed to fetch posts: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      setError('Please fill in both title and content');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const newPost = await createPost({
        title: newPostTitle,
        content: newPostContent
      });
      
      // Add the new post to the list
      setPosts([newPost, ...posts]);
      setNewPostTitle('');
      setNewPostContent('');
    } catch (err) {
      setError('Failed to create post: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Netlify DB Example</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Create New Post</h3>
        <form onSubmit={handleCreatePost} className="space-y-3">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              id="content"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Post'}
          </button>
        </form>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold">Posts</h3>
          <button
            onClick={fetchPosts}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={loading}
          >
            Refresh
          </button>
        </div>
        
        {loading && posts.length === 0 ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="border rounded-lg p-4">
                <h4 className="text-lg font-medium">{post.title}</h4>
                <p className="text-gray-600 mt-1">{post.content}</p>
                <div className="text-xs text-gray-500 mt-2">
                  ID: {post.id} | Created: {post.created_at}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NetlifyDBExample;