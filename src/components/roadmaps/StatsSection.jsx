export default function StatsSection({ total }) {
  const stats = [
    { value: total + '+', label: 'Roadmaps' },
    { value: '100+', label: 'Skills to Learn' },
    { value: '500+', label: 'Resources' },
    { value: 'Free', label: 'Access for All' }
  ];

  return (
    <section className="bg-white rounded-xl shadow-sm p-4 mb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item text-center bg-white border-l-4 border-purple-600 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="text-3xl lg:text-4xl font-bold text-purple-600">
                {stat.value}
              </div>
              <div className="text-gray-600 mt-2 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
