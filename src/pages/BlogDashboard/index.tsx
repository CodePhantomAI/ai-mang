import RecentPosts from './components/RecentPosts';
import Categories from './components/Categories';
import TrafficAnalytics from './components/TrafficAnalytics';

const BlogDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-100 p-6 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-2">ניהול הבלוג</h1>
          <p className="text-xl text-gray-600 font-medium">ממשק ניהול מתקדם</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 text-center">
            <div className="text-4xl font-black text-gray-900 mb-2">45,280</div>
            <div className="text-base font-bold text-gray-600">צפיות כוללות</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 text-center">
            <div className="text-4xl font-black text-gray-900 mb-2">892</div>
            <div className="text-base font-bold text-gray-600">תגובות</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 text-center">
            <div className="text-4xl font-black text-gray-900 mb-2">1,240</div>
            <div className="text-base font-bold text-gray-600">מנויים</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 text-center">
            <div className="text-4xl font-black text-gray-900 mb-2">78%</div>
            <div className="text-base font-bold text-gray-600">אחוז מעורבות</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">פוסטים אחרונים</h2>
              <RecentPosts />
            </div>
          </div>
          <div>
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">קטגוריות</h2>
              <Categories />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">ניתוח תנועה</h2>
            <TrafficAnalytics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDashboard;