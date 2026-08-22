import React, { useState } from 'react';
import VR360Viewer from '../../../components/VR360Viewer';



const SCENES = {
    A1: {
        id: 'A1',
        title: 'Bếp',
        shortName: 'Bếp',
        imageUrl: "https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can3b/A1.jpg",
        hotspots: [
        ]
    },
    A2: {
        id: 'A2',
        title: 'Lối vào',
        shortName: 'Lối vào',
        imageUrl: "https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can3b/A2.jpg",
        hotspots: [
        ]
    },
    A3: {
        id: 'A3',
        title: 'Phòng khách',
        shortName: 'Phòng khách',
        imageUrl: "https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can3b/A3.jpg",
        hotspots: [
        ]
    },
    A4: {
        id: 'A4',
        title: 'Phòng Ngủ 1',
        shortName: 'Phòng ngủ 1',
        imageUrl: "https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can3b/A4.jpg",
        hotspots: [


        ]
    },
    A5: {
        id: 'A5',
        title: 'Phòng ngủ 3',
        shortName: 'Phòng ngủ 3',
        imageUrl: "https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can3b/A5.jpg",
        hotspots: [
        ]
    },
    A6: {
        id: 'A6',
        title: 'Phòng ngủ 2',
        shortName: 'Phòng ngủ 2',
        imageUrl: "https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can3b/A6.jpg",
        hotspots: [
        ]
    },
    A7: {
        id: 'A7',
        title: 'Phòng chứa đồ',
        shortName: 'Phòng chứa đồ',
        imageUrl: "https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can3b/A7.jpg",
        hotspots: [
        ]
    },
    A8: {
        id: 'A8',
        title: 'Nhà vệ sinh',
        shortName: 'Nhà vệ sinh',
        imageUrl: "https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can3b/A8.jpg",
        hotspots: [
        ]
    },
    A9: {
        id: 'A9',
        title: 'Nhà vệ sinh',
        shortName: 'Nhà vệ sinh',
        imageUrl: "https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can3b/A9.jpg",
        hotspots: [
        ]
    },
    A10: {
        id: 'A10',
        title: 'Phòng ngủ 4',
        shortName: 'Phòng ngủ 4',
        imageUrl: "https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can3b/A10.jpg",
        hotspots: [

        ]
    },
    A11: {
        id: 'A11',
        title: 'Phòng ngủ 5',
        shortName: 'Phòng ngủ 5',
        imageUrl: "https://woclxhuxiynyuzohzuqu.supabase.co/storage/v1/object/public/VR/hiyori/can3b/A11.jpg",
        hotspots: [

        ]
    }

};

const scenesList = Object.values(SCENES);

export default function Can3BPage() {
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
            showCoordinateHelper={true}
            projectName="Hiyori Garden Tower - Căn 3B"
        />
    );
}

