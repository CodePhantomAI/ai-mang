import { useState, useEffect } from 'react';
import { Calendar, User, Tag, ChevronLeft, ChevronRight } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  category: string;
  tags: string;
  websiteId: string;
  date: string;
  author?: string;
  featuredImage?: string;
}

interface EmbeddableBlogPostsProps {
  websiteId: string;
  websiteName: string;
  darkMode?: boolean;
  postsPerPage?: number;
  showCategories?: boolean;
  showTags?: boolean;
}

const EmbeddableBlogPosts = ({ 
  websiteId, 
  websiteName, 
  darkMode = true,
  postsPerPage = 6,
  showCategories = true,
  showTags = true
}: EmbeddableBlogPostsProps) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // Load posts from localStorage with type checking
    const storedPosts = localStorage.getItem('blog_posts');
    const allPosts: BlogPost[] = storedPosts ? JSON.parse(storedPosts) : [];
    const websitePosts = allPosts.filter((post): post is BlogPost => 
      typeof post === 'object' && 
      post !== null && 
      'websiteId' in post && 
      post.websiteId === websiteId
    );
    setPosts(websitePosts);

    // Extract unique categories with proper type checking
    const uniqueCategories = Array.from(
      new Set(
        websitePosts
          .map(post => post.category)
          .filter((category): category is string => 
            typeof category === 'string' && category.length > 0
          )
      )
    );
    setCategories(uniqueCategories);
  }, [websiteId]);

  // Filter and paginate posts
  const filteredPosts = selectedCategory
    ? posts.filter(post => post.category === selectedCategory)
    : posts;

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const baseCardClass = `rounded-lg overflow-hidden ${
    darkMode ? 'bg-gray-800' : 'bg-white'
  }`;

  const baseTextClass = darkMode ? 'text-white' : 'text-gray-900';
  const secondaryTextClass = darkMode ? 'text-gray-300' : 'text-gray-600';

  return (
    <div className={`p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className={`text-2xl font-bold mb-4 ${baseTextClass}`}>{websiteName} - בלוג</h2>
        
        {/* Categories */}
        {showCategories && categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                !selectedCategory
                  ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                  : (darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600')
              }`}
            >
              הכל
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedCategory === category
                    ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                    : (darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600')
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentPosts.map(post => (
          <article key={post.id} className={`${baseCardClass} shadow-lg`}>
            {post.featuredImage && (
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={post.featuredImage} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <h3 className={`text-xl font-bold mb-3 ${baseTextClass}`}>{post.title}</h3>
              <div className={`mb-4 ${secondaryTextClass} line-clamp-3`}>
                {post.content}
              </div>
              
              <div className="flex flex-wrap gap-3 items-center text-sm mb-4">
                <div className="flex items-center gap-1">
                  <Calendar size={16} className={secondaryTextClass} />
                  <span className={secondaryTextClass}>{post.date}</span>
                </div>
                {post.author && (
                  <div className="flex items-center gap-1">
                    <User size={16} className={secondaryTextClass} />
                    <span className={secondaryTextClass}>{post.author}</span>
                  </div>
                )}
              </div>

              {showTags && post.tags && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.split(',').map((tag, index) => (
                    <div 
                      key={index}
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs ${
                        darkMode 
                          ? 'bg-gray-700 text-gray-300' 
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      <Tag size={12} />
                      {tag.trim()}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg transition-colors ${
              currentPage === 1
                ? (darkMode ? 'bg-gray-800 text-gray-600' : 'bg-gray-200 text-gray-400')
                : (darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100')
            }`}
          >
            <ChevronRight size={20} />
          </button>
          
          <span className={`px-4 py-2 ${baseTextClass}`}>
            {currentPage} מתוך {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg transition-colors ${
              currentPage === totalPages
                ? (darkMode ? 'bg-gray-800 text-gray-600' : 'bg-gray-200 text-gray-400')
                : (darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100')
            }`}
          >
            <ChevronLeft size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default EmbeddableBlogPosts;
