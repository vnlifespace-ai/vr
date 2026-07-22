import React, { useState } from 'react';
import VR360Viewer from '../../components/VR360Viewer';
import A3 from "../../assets/A3.jpg";
import A5 from "../../assets/A5.jpg";

const SCENES = {
  A3: {
    id: 'A3',
    image: A3,
    title: 'Phòng khách',
    hotspots: [
      {
        id: 'to_A5',
        position: [-6.6, -1.0, -13.4], // Initial guess near the center-left door
        target: 'A5',
        label: 'Vào nhà vệ sinh'
      }
    ]
  },
  A5: {
    id: 'A5',
    image: A5,
    title: 'Nhà vệ sinh',
    hotspots: [
      {
        id: 'to_A3',
        position: [9.3, -1.6, 11.6], // Initial guess to go back
        target: 'A3',
        label: 'Quay lại phòng Khách'
      }
    ]
  }
};

function VR1() {
  const [currentSceneId, setCurrentSceneId] = useState('A3');
  const currentScene = SCENES[currentSceneId];

  const handleNavigate = (targetSceneId) => {
    if (SCENES[targetSceneId]) {
      setCurrentSceneId(targetSceneId);
    }
  };

  return (
    <VR360Viewer
      imageUrl={currentScene.image}
      hotspots={currentScene.hotspots}
      onNavigate={handleNavigate}
      sceneTitle={currentScene.title}
      currentSceneId={currentSceneId}
    />
  );
}

export default VR1;