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
    A1: { id: 'A1', title: 'A1 - Lối Vào / Sảnh Chính', shortName: 'Lối vào (A1)', imageUrl: imgA1, hotspots: [{ id: 'hs1_2', position: [0, -1, -15], target: 'A2', label: 'Sang A2' }] },
    A2: { id: 'A2', title: 'A2 - Phòng Khách', shortName: 'Phòng khách (A2)', imageUrl: imgA2, hotspots: [{ id: 'hs2_1', position: [0, -1, 15], target: 'A1', label: 'Trở về A1' }, { id: 'hs2_3', position: [-14, -1, -5], target: 'A3', label: 'Sang A3' }] },
    A3: { id: 'A3', title: 'A3 - Bếp & Ban Công', shortName: 'Bếp / Ban công (A3)', imageUrl: imgA3, hotspots: [{ id: 'hs3_2', position: [14, -1, 5], target: 'A2', label: 'Trở về A2' }, { id: 'hs3_4', position: [-14, -1, -5], target: 'A4', label: 'Sang A4' }] },
    A4: { id: 'A4', title: 'A4 - Hành Lang Phòng Ngủ', shortName: 'Hành lang (A4)', imageUrl: imgA4, hotspots: [{ id: 'hs4_3', position: [14, -1, 5], target: 'A3', label: 'Trở về A3' }, { id: 'hs4_5', position: [0, -1, -15], target: 'A5', label: 'Sang A5' }] },
    A5: { id: 'A5', title: 'A5 - Phòng Ngủ Phụ', shortName: 'Phòng ngủ phụ (A5)', imageUrl: imgA5, hotspots: [{ id: 'hs5_4', position: [0, -1, 15], target: 'A4', label: 'Trở về A4' }, { id: 'hs5_6', position: [14, -1, -5], target: 'A6', label: 'Sang A6' }] },
    A6: { id: 'A6', title: 'A6 - Phòng Ngủ Master', shortName: 'Phòng master (A6)', imageUrl: imgA6, hotspots: [{ id: 'hs6_5', position: [-14, -1, 5], target: 'A5', label: 'Trở về A5' }, { id: 'hs6_7', position: [0, -1, -15], target: 'A7', label: 'Sang A7' }] },
    A7: { id: 'A7', title: 'A7 - Nhà Vệ Sinh Master', shortName: 'WC Master (A7)', imageUrl: imgA7, hotspots: [{ id: 'hs7_6', position: [0, -1, 15], target: 'A6', label: 'Trở về A6' }] }
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
            showCoordinateHelper={true}
            projectName="Hiyori Garden Tower - Căn 2B"
        />
    );
}
