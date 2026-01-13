import { useState } from 'react';
import roadmapsData from '../../data/roadmaps.json';
import PageHeader from './PageHeader';
import RoadmapFilters from './RoadmapFilters';
import RoadmapGrid from './RoadmapGrid';

export default function RoadmapPage() {
  const [selectedLevel, setSelectedLevel] = useState('all');

  const filteredRoadmaps = selectedLevel === 'all' 
    ? roadmapsData 
    : roadmapsData.filter(roadmap => 
        roadmap.difficulty.toLowerCase() === selectedLevel.toLowerCase()
      );

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Page Header */}
      <PageHeader />

      {/* Main Content */}
        {/* Filters */}
        <RoadmapFilters 
          selectedLevel={selectedLevel} 
          onLevelChange={setSelectedLevel} 
        />

        {/* Roadmap Grid */}
        <RoadmapGrid roadmaps={filteredRoadmaps} />
    </div>
  );
}
