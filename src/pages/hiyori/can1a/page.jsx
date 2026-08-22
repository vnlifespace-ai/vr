import React, { useState } from 'react';
import VR360Viewer from '../../../components/VR360Viewer';

import imgA1 from './images/A1.jpg';
import imgA2 from './images/A2.jpg';
import imgA3 from './images/A3.jpg';
import imgA4 from './images/A4.jpg';
import imgA5 from './images/A5.jpg';

const SCENES = {
    A2: {
        id: 'A2',
        title: 'A2 - Lối Vào & Sảnh Đón',
        shortName: 'Lối vào',
        imageUrl: imgA2,
        // Xoay góc ảnh 360 để camera nhìn thẳng về phía trước lối vào/phòng khách thay vì nhìn vào tường
        initialRotation: Math.PI,
        hotspots: [
            { id: 'hs_a2_a1', position: [-3, -0.5, 3.2], target: 'A1', label: 'Đi vào bếp' },
            { id: 'hs_a2_a3', position: [-14.5, -0.5, 3.2], target: 'A3', label: 'Đi vào phòng khách' },
            { id: 'hs_a2_a4', position: [-8.5, -0.5, 5], target: 'A4', label: 'Đi vào phòng ngủ' }
        ]
    },
    A1: {
        id: 'A1',
        title: 'A1 - Bếp',
        shortName: 'Bếp',
        imageUrl: imgA1,
        initialRotation: 0,
        hotspots: [
            { id: 'hs_a1_a2', position: [15, 1.2, 9.6], target: 'A2', label: 'Ra sảnh' },
            { id: 'hs_a1_a3', position: [5, -0.5, -15], target: 'A3', label: 'Phòng khách' },
            { id: 'hs_a1_a5', position: [8, -2, 14.7], target: 'A5', label: 'Nhà vệ sinh' }
        ]
    },
    A3: {
        id: 'A3',
        title: 'A3 - Phòng khách',
        shortName: 'Phòng khách',
        imageUrl: imgA3,
        initialRotation: 0,
        hotspots: [
            { id: 'hs_a3_a4', position: [-8, -1.4, -14.9], target: 'A4', label: 'Phòng ngủ' },
            { id: 'hs_a3_a1', position: [-13.7, -2.2, -5.8], target: 'A1', label: 'Bếp' },
            { id: 'hs_a3_a5', position: [-14.2, 0, -1.7], target: 'A5', label: 'Nhà vệ sinh' },
            { id: 'hs_a3_a2', position: [-14.6, 0, 2.3], target: 'A2', label: 'Lối vào' },

        ]
    },
    A4: {
        id: 'A4',
        title: 'A4 - Phòng Ngủ Chính',
        shortName: 'Phòng ngủ',
        imageUrl: imgA4,
        initialRotation: 0,
        hotspots: [
            { id: 'hs_a4_a1', position: [20, -4.3, 9.5], target: 'A1', label: 'Trở về Phòng Khách (A1)' }
        ]
    },
    A5: {
        id: 'A5',
        title: 'A5 - Nhà Vệ Sinh (WC)',
        shortName: 'Nhà vệ sinh',
        imageUrl: imgA5,
        initialRotation: 0,
        hotspots: [
            { id: 'hs_a5_a1', position: [7, -5.1, 12.3], target: 'A1', label: 'Trở về Bếp ' }
        ]
    }
};

const scenesList = Object.values(SCENES);

// Tọa độ sơ đồ 2D khớp chính xác với bản vẽ thiết kế 3D
const floorPlanCoords = {
    A2: { x: 23, y: 24 }, // Lối vào (Góc trên bên trái)
    A5: { x: 49, y: 24 }, // Nhà vệ sinh / WC (Giữa hàng trên)
    A3: { x: 75, y: 24 }, // Bếp & Tủ lạnh (Góc trên bên phía phải)
    A1: { x: 36, y: 55 }, // Phòng khách & Phòng ăn (Khu vực trung tâm bên trái)
    A4: { x: 75, y: 55 }  // Phòng ngủ (Khu vực bên phải)
};

export default function Can1APage() {
    const [currentSceneId, setCurrentSceneId] = useState('A2');
    const currentScene = SCENES[currentSceneId] || SCENES.A2;

    return (
        <VR360Viewer
            imageUrl={currentScene.imageUrl}
            hotspots={currentScene.hotspots}
            onNavigate={(nextSceneId) => setCurrentSceneId(nextSceneId)}
            sceneTitle={currentScene.title}
            currentSceneId={currentSceneId}
            scenesList={scenesList}
            floorPlanCoords={floorPlanCoords}
            initialRotation={currentScene.initialRotation || 0}
            projectName="Hiyori Garden Tower - Căn 1A"
        />
    );
}
