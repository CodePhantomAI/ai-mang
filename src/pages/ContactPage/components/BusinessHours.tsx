export const BusinessHours = () => {
  const hours = [
    { days: 'ראשון - חמישי', hours: '9:00 - 18:00' },
    { days: 'שישי', hours: '9:00 - 13:00' },
    { days: 'שבת', hours: 'סגור' }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800">
      <h2 className="text-2xl font-bold mb-8 text-center">שעות פעילות</h2>
      <div className="space-y-6">
        {hours.map((time, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="text-xl">{time.hours}</div>
            <div className="text-gray-400">{time.days}</div>
          </div>
        ))}
      </div>
    </div>
  );
};