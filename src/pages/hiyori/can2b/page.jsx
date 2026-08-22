import React, { useState } from 'react';
import VR360Viewer from '../../../components/VR360Viewer';

import imgA1 from './images/A1.jpg';
import imgA2 from './images/A2.jpg';
import imgA3 from './images/A3.jpg';
import imgA4 from './images/A4.jpg';
import imgA5 from './images/A5.jpg';
import imgA6 from './images/A6.jpg';
import imgA7 from './images/A7.jpg';

const SCENES = {
    A1: {
        id: 'A1',
        title: 'Lối Vào / Sảnh Chính',
        shortName: 'Lối vào',
        imageUrl: imgA1,
        hotspots: [
            { id: 'hs1_2', position: [-5, -1, -15], target: 'A2', label: 'Phòng khách' },
            { id: 'hs1_6', position: [15, -1.4, 9.4], target: 'A6', label: 'Nhà vệ sinh 2' },
            { id: 'hs1_5', position: [14, -1, -5], target: 'A5', label: 'Nhà vệ sinh 1' }
        ]
    },
    A2: {
        id: 'A2',
        title: 'Phòng Khách',
        shortName: 'Phòng khách',
        imageUrl: imgA2,
        hotspots: [
            { id: 'hs2_1', position: [-14.8, -1, 2.4], target: 'A1', label: 'Sảnh Chính' },
            { id: 'hs2_4', position: [-5, -0.6, 13.8], target: 'A4', label: 'Phòng ngủ 2' },
            { id: 'hs2_3', position: [-5.5, 0, -13.3], target: 'A3', label: 'Phòng ngủ 1' }
        ]
    },
    A3: {
        id: 'A3',
        title: 'Phòng Ngủ 1',
        shortName: 'Phòng ngủ 1',
        imageUrl: imgA3,
        hotspots: [
            { id: 'hs3_2', position: [10, 0, -4.5], target: 'A2', label: 'Phòng khách' },
            { id: 'hs3_7', position: [0, -1.4, 13], target: 'A7', label: 'Nhà vệ sinh 3' }
        ]
    },
    A4: {
        id: 'A4',
        title: 'Phòng Ngủ 2 / Hành Lang',
        shortName: 'Phòng ngủ 2',
        imageUrl: imgA4,
        hotspots: [
            { id: 'hs4_2', position: [4, 0, 14.5], target: 'A2', label: 'Phòng khách' }
        ]
    },
    A5: {
        id: 'A5',
        title: 'Nhà Vệ Sinh 1',
        shortName: 'NVS 1',
        imageUrl: imgA5,
        hotspots: [
            { id: 'hs5_1', position: [0, -1, 15], target: 'A1', label: 'Sảnh Chính' }
        ]
    },
    A6: {
        id: 'A6',
        title: 'Nhà Vệ Sinh 2',
        shortName: 'NVS 2',
        imageUrl: imgA6,
        hotspots: [
            { id: 'hs6_1', position: [10, 0, 2.3], target: 'A1', label: 'Sảnh chính' }
        ]
    },
    A7: {
        id: 'A7',
        title: 'Nhà Vệ Sinh 3 (Phòng Ngủ 1)',
        shortName: 'NVS 3',
        imageUrl: imgA7,
        hotspots: [
            { id: 'hs7_3', position: [20, 2, -5], target: 'A3', label: 'Phòng ngủ 1' }
        ]
    }
};

const scenesList = Object.values(SCENES);

export default function Can2BPage() {
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
            projectName="Hiyori Garden Tower - Căn 2B"
        />
    );
}

