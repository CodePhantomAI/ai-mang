const RecentPosts = () => {
  const posts = [
    {
      title: 'איך לכתוב תוכן איכותי לבלוג',
      date: '21 דצמבר, 2024',
      views: 245,
      comments: 12
    },
    {
      title: 'טיפים לשיווק דיגיטלי',
      date: '20 דצמבר, 2024',
      views: 189,
      comments: 8
    },
    {
      title: 'מדריך למתחילים: SEO בסיסי',
      date: '19 דצמבר, 2024',
      views: 320,
      comments: 15
    }
  ];

  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0 text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h3>
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-medium text-gray-600">{post.date}</span>
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-700">
                {post.views} צפיות
              </span>
              <span className="text-sm font-semibold text-gray-700">
                {post.comments} תגובות
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentPosts;
