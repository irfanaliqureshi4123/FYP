export default function LearningTipsSection() {
  const tips = [
    {
      icon: 'fa-map-marked-alt',
      title: 'Follow the Path',
      description: 'Start from the beginning and progress through each step. Don\'t skip fundamentals even if they seem basic.'
    },
    {
      icon: 'fa-tasks',
      title: 'Track Your Progress',
      description: 'Mark completed topics and celebrate milestones. This keeps you motivated and shows your advancement.'
    },
    {
      icon: 'fa-project-diagram',
      title: 'Build Projects',
      description: 'Apply what you learn by building real projects. Hands-on experience is the best way to master skills.'
    }
  ];

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          How to Use Roadmaps Effectively
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <div 
              key={index} 
              className="learning-tip bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow h-full"
            >
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white mb-4">
                <i className={`fas ${tip.icon} text-xl`}></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
              <p className="text-gray-600">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
