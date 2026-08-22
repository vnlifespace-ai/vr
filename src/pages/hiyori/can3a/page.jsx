import React, { useState } from 'react';
import VR360Viewer from '../../../components/VR360Viewer';

import imgA1 from './images/A1.jpg';
import imgA2 from './images/A2.jpg';
import imgA3 from './images/A3.jpg';
import imgA4 from './images/A4.jpg';
import imgA5 from './images/A5.jpg';
import imgA6 from './images/A6.jpg';
import imgA7 from './images/A7.jpg';
import imgA8 from './images/A8.jpg';
import imgA9 from './images/A9.jpg';
import imgA10 from './images/A10.jpg';

const sceneImages = [
	imgA1,
	imgA2,
	imgA3,
	imgA4,
	imgA5,
	imgA6,
	imgA7,
	imgA8,
	imgA9,
	imgA10
];

const sceneNames = [
	'Lối vào',
	'Sảnh chính',
	'Phòng khách',
	'Phòng ăn',
	'Phòng ngủ 1',
	'Phòng ngủ 2',
	'Phòng ngủ 3',
	'Nhà vệ sinh 1',
	'Nhà vệ sinh 2',
	'Ban công'
];

const SCENES = Object.fromEntries(sceneImages.map((imageUrl, index) => {
	const sceneNumber = index + 1;
	const id = `A${sceneNumber}`;
	const hotspots = [];

	if (index > 0) {
		hotspots.push({
			id: `hs_${id}_previous`,
			position: [-14, -1, 0],
			target: `A${sceneNumber - 1}`,
			label: sceneNames[index - 1]
		});
	}

	if (index < sceneImages.length - 1) {
		hotspots.push({
			id: `hs_${id}_next`,
			position: [14, -1, 0],
			target: `A${sceneNumber + 1}`,
			label: sceneNames[index + 1]
		});
	}

	return [id, {
		id,
		title: `${id} - ${sceneNames[index]}`,
		shortName: sceneNames[index],
		imageUrl,
		hotspots
	}];
}));

const scenesList = Object.values(SCENES);

export default function Can3APage() {
	const [currentSceneId, setCurrentSceneId] = useState('A1');
	const currentScene = SCENES[currentSceneId] || SCENES.A1;

	return (
		<VR360Viewer
			imageUrl={currentScene.imageUrl}
			hotspots={currentScene.hotspots}
			onNavigate={setCurrentSceneId}
			sceneTitle={currentScene.title}
			currentSceneId={currentSceneId}
			scenesList={scenesList}
			projectName="Hiyori Garden Tower - Căn 3A"
		/>
	);
}
