import React, { useState } from 'react';
import VR360Viewer from '../../../components/VR360Viewer';

const SCENES = {
    A1: {
        id: 'A1',
        title: 'Lối Vào & Bếp',
        shortName: 'Lối vào / Bếp',
        imageUrl: 'https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can1b/A1.jpg',
        hotspots: [
            { id: 'hs_a1_a2', position: [-7, 0, -13.6], target: 'A2', label: 'Phòng Ngủ' }
        ]
    },
    A2: {
        id: 'A2',
        title: 'Phòng Ngủ',
        shortName: 'Phòng Ngủ',
        imageUrl: 'https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can1b/A2.jpg',
        hotspots: [
            { id: 'hs_a2_a1', position: [5, 1.8, 14.5], target: 'A1', label: 'Ra Lối Vào / Bếp' },
            { id: 'hs_a2_a3', position: [-2.5, 0, 13.2], target: 'A3', label: 'Vào WC' }
        ]
    },
    A3: {
        id: 'A3',
        title: 'Nhà vệ sinh',
        shortName: 'Nhà vệ sinh',
        imageUrl: 'https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can1b/A3.jpg',
        hotspots: [
            { id: 'hs_a3_a2', position: [4, -0.6, 12.3], target: 'A2', label: 'Trở về Phòng Ngủ' }
        ]
    }
};

const scenesList = Object.values(SCENES);

export default function Can1BPage() {
    const [currentSceneId, setCurrentSceneId] = useState('A1');
    const currentScene = SCENES[currentSceneId] || SCENES.A1;

    return (
        <VR360Viewer
            imageUrl={currentScene.imageUrl}
            hotspots={currentScene.hotspots}
            onNavigate={(nextSceneId) => setCurrentSceneId(nextSceneId)}
            sceneTitle={currentScene.title}
            currentSceneId={currentSceneId}
            scenesList={scenesList}
            showCoordinateHelper={false}
            projectName="Hiyori Garden Tower - Căn 1B"
        />
    );
}
