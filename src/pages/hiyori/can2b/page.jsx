import React, { useState } from 'react';
import VR360Viewer from '../../../components/VR360Viewer';



const SCENES = {
    A1: {
        id: 'A1',
        title: 'Lối Vào / Sảnh Chính',
        shortName: 'Lối vào',
        imageUrl: "https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can2b/A1.jpg",
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
        imageUrl: "https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can2b/A2.jpg",
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
        imageUrl: "https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can2b/A3.jpg",
        hotspots: [
            { id: 'hs3_2', position: [10, 0, -4.5], target: 'A2', label: 'Phòng khách' },
            { id: 'hs3_7', position: [0, -1.4, 13], target: 'A7', label: 'Nhà vệ sinh 3' }
        ]
    },
    A4: {
        id: 'A4',
        title: 'Phòng Ngủ 2 / Hành Lang',
        shortName: 'Phòng ngủ 2',
        imageUrl: "https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can2b/A4.jpg",
        hotspots: [
            { id: 'hs4_2', position: [4, 0, 14.5], target: 'A2', label: 'Phòng khách' }
        ]
    },
    A5: {
        id: 'A5',
        title: 'Nhà Vệ Sinh 1',
        shortName: 'NVS 1',
        imageUrl: "https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can2b/A5.jpg",
        hotspots: [
            { id: 'hs5_1', position: [0, -1, 15], target: 'A1', label: 'Sảnh Chính' }
        ]
    },
    A6: {
        id: 'A6',
        title: 'Nhà Vệ Sinh 2',
        shortName: 'NVS 2',
        imageUrl: "https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can2b/A6.jpg",
        hotspots: [
            { id: 'hs6_1', position: [10, 0, 2.3], target: 'A1', label: 'Sảnh chính' }
        ]
    },
    A7: {
        id: 'A7',
        title: 'Nhà Vệ Sinh 3 (Phòng Ngủ 1)',
        shortName: 'NVS 3',
        imageUrl: "https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can2b/A7.jpg",
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

