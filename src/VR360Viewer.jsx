import React, { Suspense, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

// Component render sphere với texture ảnh 360
function Panorama({ image, onBgClick }) {
    const texture = useLoader(THREE.TextureLoader, image);

    return (
        <mesh 
            scale={[-1, 1, 1]} 
            onPointerDown={(e) => {
                // Chỉ nhận click chuột trái và đảm bảo là không phải click kéo thả (orbit controls)
                if (e.button === 0) {
                    const clickPoint = e.point.clone();
                    const dir = clickPoint.normalize(); // hướng vector từ tâm
                    // hotspot ở khoảng cách 15 từ tâm
                    const hotspotPos = dir.multiplyScalar(15);
                    const roundedPos = [
                        Math.round(hotspotPos.x * 10) / 10,
                        Math.round(hotspotPos.y * 10) / 10,
                        Math.round(hotspotPos.z * 10) / 10
                    ];
                    onBgClick(roundedPos);
                }
            }}
        >
            {/* Sphere càng nhiều segment (60,40) thì càng mượt, 
          bán kính 500 để camera (đặt ở tâm) luôn nằm bên trong sphere */}
            <sphereGeometry args={[500, 60, 40]} />
            <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </mesh>
    );
}

// Component chính chứa Canvas
export default function VR360Viewer({ imageUrl, hotspots, onNavigate, sceneTitle }) {
    const [coordinateHelper, setCoordinateHelper] = useState(null);

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, overflow: 'hidden' }}>
            {/* Thanh tiêu đề hiển thị tên phòng */}
            <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                zIndex: 10,
                color: '#fff',
                backgroundColor: 'rgba(0,0,0,0.6)',
                padding: '10px 20px',
                borderRadius: '8px',
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
                pointerEvents: 'none',
                backdropFilter: 'blur(5px)'
            }}>
                {sceneTitle}
            </div>

            {/* Helper để lấy tọa độ cấu hình hotspot nhanh chóng */}
            {coordinateHelper && (
                <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    zIndex: 10,
                    color: '#fff',
                    backgroundColor: 'rgba(0,0,0,0.85)',
                    padding: '12px',
                    borderRadius: '8px',
                    fontFamily: 'monospace',
                    fontSize: '13px',
                    border: '1px solid #444',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                }}>
                    <div style={{ marginBottom: '6px', color: '#ffbd59', fontWeight: 'bold' }}>📍 HOTSPOT HELPER</div>
                    <div>Tọa độ click: <strong>[{coordinateHelper.join(', ')}]</strong></div>
                    <div style={{ fontSize: '11px', marginTop: '6px', color: '#aaa' }}>
                        Click lên cửa để lấy tọa độ chính xác rồi copy vào file code.
                    </div>
                </div>
            )}

            <Canvas
                camera={{ position: [0, 0, 0.1], fov: 75 }}
            >
                <Suspense fallback={<Html center><div style={{ color: '#fff', fontSize: '20px' }}>Loading scene...</div></Html>}>
                    <Panorama image={imageUrl} onBgClick={(pos) => setCoordinateHelper(pos)} />
                </Suspense>

                {/* Render các hotspot */}
                {hotspots && hotspots.map((hotspot) => (
                    <group key={hotspot.id} position={hotspot.position}>
                        <Html center>
                            <div className="hotspot-container" onClick={() => onNavigate(hotspot.target)}>
                                <div className="hotspot-pulse"></div>
                                <div className="hotspot-arrow">➔</div>
                                {hotspot.label && <div className="hotspot-tooltip">{hotspot.label}</div>}
                            </div>
                        </Html>
                    </group>
                ))}

                <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    rotateSpeed={-0.5}
                />
            </Canvas>
        </div>
    );
}