import React, { useState } from 'react';
import VR360Viewer from '../../../components/VR360Viewer';


const SCENES = {
    A1: {
        id: 'A1',
        title: 'Lối Vào / Sảnh Chính',
        shortName: 'Lối vào',
        imageUrl: "https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can2a/A1.jpg",
        hotspots: [
            { id: 'hs1_2', position: [-20, -2, 4.4], target: 'A2', label: 'Phòng Khách' },
            { id: 'hs1_3', position: [-13, 0.7, -7.2], target: 'A3', label: 'Phòng ngủ 1' },
            { id: 'hs1_4', position: [1, -2, -13.2], target: 'A4', label: 'Phòng ngủ 2' },
            { id: 'hs1_7', position: [28, 3.1, 9], target: 'A7', label: 'Phòng vệ sinh' },
            { id: 'hs1_6', position: [28, 0.5, -7.8], target: 'A6', label: 'Phòng vệ sinh' }

        ]
    },
    A2: {
        id: 'A2',
        title: 'Phòng Khách',
        shortName: 'Phòng khách',
        imageUrl: "https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can2a/A2.jpg",
        hotspots: [
            { id: 'hs2_3', position: [2, -1, 15], target: 'A3', label: 'Phòng ngủ 1' },
            { id: 'hs2_1', position: [-14.8, 0, 1], target: 'A1', label: 'Sảnh chính' }

        ]
    },
    A3: {
        id: 'A3',
        title: 'Phòng Ngủ 1',
        shortName: 'Phòng Ngủ 1',
        imageUrl: "https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can2a/A3.jpg",
        hotspots: [
            { id: 'hs3_2', position: [6, -1.2, 12.7], target: 'A2', label: 'Phòng khách' },
        ]
    },
    A4: {
        id: 'A4',
        title: 'Phòng Ngủ 2',
        shortName: 'Phòng Ngủ 2',
        imageUrl: "https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can2a/A4.jpg",
        hotspots: [
            { id: 'hs4_1', position: [14.8, -1.9, 1.9], target: 'A1', label: 'Sảnh chính' },
            { id: 'hs4_5', position: [0, -1, -15], target: 'A5', label: 'Nhà vệ sinh' }
        ]
    },
    A5: {
        id: 'A5',
        title: 'Nhà vệ sinh phòng ngủ 2',
        shortName: 'Nhà vệ sinh phòng ngủ 2',
        imageUrl: "https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can2a/A5.jpg",
        hotspots: [
            { id: 'hs5_4', position: [14, -1, -5], target: 'A4', label: 'Phòng ngủ' }
        ]
    },
    A6: {
        id: 'A6',
        title: 'Phòng vệ sinh',
        shortName: 'Phòng vệ sinh',
        imageUrl: "https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can2a/A6.jpg",
        hotspots: [
            { id: 'hs6_8', position: [0, 3.8, -11.8], target: 'A8', label: 'Phòng tắm' },
            { id: 'hs6_1', position: [30, -0.5, -6.1], target: 'A1', label: 'Sảnh chính' }
        ]
    },
    A7: {
        id: 'A7',
        title: 'Phòng vệ sinh',
        shortName: 'Phòng vệ sinh',
        imageUrl: "https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can2a/A7.jpg",
        hotspots: [
            { id: 'hs7_1', position: [14, -1, -5], target: 'A1', label: 'Sảnh chính' },
        ]
    },
    A8: {
        id: 'A8',
        title: 'Phòng Tắm',
        shortName: 'Phòng Tắm',
        imageUrl: "https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can2a/A8.jpg",
        hotspots: [
            { id: 'hs8_6', position: [14.1, -2.5, -4.6], target: 'A6', label: 'Phòng vệ sinh' }
        ]
    }
};

const scenesList = Object.values(SCENES);

export default function Can2APage() {
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
            projectName="Hiyori Garden Tower - Căn 2A"
        />
    );
}
