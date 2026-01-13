import RoadmapCard from './RoadmapCard';

export default function RoadmapGrid({ roadmaps }) {
  if (roadmaps.length === 0) {
    return (
      <div className="text-center py-8 xs:py-10 sm:py-12 md:py-16">
        <p className="text-base xs:text-lg sm:text-xl text-gray-600 px-4">No roadmaps found for the selected filter.</p>
      </div>
    );
  }

  return (
    <section className="py-6 xs:py-7 sm:py-8">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 lg:gap-6">
          {roadmaps.map(roadmap => (
            <RoadmapCard key={roadmap.id} roadmap={roadmap} />
          ))}
        </div>
      </div>
    </section>
  );
}
