import React, { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Component render sphere với texture ảnh 360
function Panorama({ image }) {
    const texture = useLoader(THREE.TextureLoader, image);

    return (
        <mesh>
            {/* Sphere càng nhiều segment (60,40) thì càng mượt, 
          bán kính 500 để camera (đặt ở tâm) luôn nằm bên trong sphere */}
            <sphereGeometry args={[500, 60, 40]} />
            {/* scale={[-1,1,1]} để lật mặt trong ra ngoài, 
          vì ta nhìn từ trong sphere ra chứ không phải từ ngoài vào */}
            <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </mesh>
    );
}

// Component chính chứa Canvas
export default function VR360Viewer({ imageUrl }) {
    return (
        <div style={{ width: '100%', height: '500px' }}>
            <Canvas
                camera={{ position: [0, 0, 0.1], fov: 75 }}
            // camera đặt gần tâm (0,0,0.1) để nằm bên trong sphere
            >
                <Suspense fallback={null}>
                    <Panorama image={imageUrl} />
                </Suspense>

                <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    rotateSpeed={-0.5}
                // rotateSpeed âm để xoay theo hướng tự nhiên khi kéo chuột
                />
            </Canvas>
        </div>
    );
}