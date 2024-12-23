const Categories = () => {
  const categories = [
    { name: 'טכנולוגיה', count: 25 },
    { name: 'שיווק', count: 18 },
    { name: 'עסקים', count: 15 },
    { name: 'חדשות', count: 12 },
    { name: 'מדריכים', count: 10 }
  ];

  return (
    <div className="space-y-4">
      {categories.map((category, index) => (
        <div 
          key={index} 
          className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200 text-center"
        >
          <span className="text-base font-bold text-gray-900">{category.name}</span>
          <span className="text-sm font-semibold text-gray-700">{category.count} פוסטים</span>
        </div>
      ))}
    </div>
  );
};

export default Categories;
