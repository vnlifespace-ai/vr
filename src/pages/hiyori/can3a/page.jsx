import React, { useState } from 'react';
import VR360Viewer from '../../../components/VR360Viewer';



const SCENES = {
    A1: {
        id: 'A1',
        title: 'Bếp',
        shortName: 'Bếp',
        imageUrl: "https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can3a/A1.jpg",
        hotspots: [
            { id: 'hs1_2', position: [-12.1, 0, -4.6], target: 'A2', label: 'Lối vào' },
            { id: 'hs1_4', position: [10.9, -0.9, -3], target: 'A4', label: 'Phòng ngủ 1' }
        ]
    },
    A2: {
        id: 'A2',
        title: 'Lối vào',
        shortName: 'Lối vào',
        imageUrl: "https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can3a/A2.jpg",
        hotspots: [
            { id: 'hs2_1', position: [-4.7, 0, 13.9], target: 'A1', label: 'Bếp' },
            { id: 'hs2_3', position: [-15, 0.6, 0], target: 'A3', label: 'Phòng khách' },
            { id: 'hs2_8', position: [5, 0, -1.9], target: 'A8', label: 'Nhà vệ sinh' },
            { id: 'hs2_6', position: [0, 0, -13.3], target: 'A6', label: 'Phòng ngủ 2' }
        ]
    },
    A3: {
        id: 'A3',
        title: 'Phòng khách',
        shortName: 'Phòng khách',
        imageUrl: "https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can3a/A3.jpg",
        hotspots: [
            { id: 'hs3_2', position: [-14.7, -1.6, -2.7], target: 'A2', label: 'Lối vào' },
            { id: 'hs3_5', position: [2.8, -1.6, 14.6], target: 'A5', label: 'Phòng ngủ 3' }
        ]
    },
    A4: {
        id: 'A4',
        title: 'Phòng Ngủ 1',
        shortName: 'Phòng ngủ 1',
        imageUrl: "https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can3a/A4.jpg",
        hotspots: [
            { id: 'hs4_1', position: [8, 0, 14.6], target: 'A1', label: 'Bếp' },
            { id: 'hs4_7', position: [2, 0, 14.7], target: 'A7', label: 'Phòng chứa đồ' },
            { id: 'hs4_9', position: [-2, 0, 14.7], target: 'A9', label: 'Nhà vệ sinh' }


        ]
    },
    A5: {
        id: 'A5',
        title: 'Phòng ngủ 3',
        shortName: 'Phòng ngủ 3',
        imageUrl: "https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can3a/A5.jpg",
        hotspots: [
            { id: 'hs5_3', position: [5, 0, -1], target: 'A3', label: 'Phòng khách' }
        ]
    },
    A6: {
        id: 'A6',
        title: 'Phòng ngủ 2',
        shortName: 'Phòng ngủ 2',
        imageUrl: "https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can3a/A6.jpg",
        hotspots: [
            { id: 'hs6_2', position: [13.5, 0, 0.3], target: 'A2', label: 'Lối vào' }
        ]
    },
    A7: {
        id: 'A7',
        title: 'Phòng chứa đồ',
        shortName: 'Phòng chứa đồ',
        imageUrl: "https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can3a/A7.jpg",
        hotspots: [
            { id: 'hs7_4', position: [15, -0.6, 1.1], target: 'A4', label: 'Phòng ngủ 1' }
        ]
    },
    A8: {
        id: 'A8',
        title: 'Nhà vệ sinh',
        shortName: 'Nhà vệ sinh',
        imageUrl: "https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can3a/A8.jpg",
        hotspots: [
            { id: 'hs8_2', position: [12.6, 0, 1.9], target: 'A2', label: 'Lối vào' }
        ]
    },
    A9: {
        id: 'A9',
        title: 'Nhà vệ sinh',
        shortName: 'Nhà vệ sinh',
        imageUrl: "https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can3a/A9.jpg",
        hotspots: [
            { id: 'hs9_4', position: [0.4, 0, -14.7], target: 'A4', label: 'Phòng ngủ 1' }
        ]
    }
};

const scenesList = Object.values(SCENES);

export default function Can3APage() {
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
            showCoordinateHelper={false}
            projectName="Hiyori Garden Tower - Căn 3A"
        />
    );
}

