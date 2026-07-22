import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useLoader, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import FloorPlanOverlay from './FloorPlanOverlay';

// Component render sphere với texture ảnh 360
function Panorama({ image, onBgClick }) {
    const texture = useLoader(THREE.TextureLoader, image);

    return (
        <mesh 
            scale={[-1, 1, 1]} 
            onPointerDown={(e) => {
                if (e.button === 0) {
                    const clickPoint = e.point.clone();
                    const dir = clickPoint.normalize();
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
            <sphereGeometry args={[500, 60, 40]} />
            <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </mesh>
    );
}

// Component theo dõi góc quay camera 360 và gửi góc về 2D floorplan
function CameraTracker({ onAngleChange }) {
    const { camera } = useThree();
    useFrame(() => {
        if (onAngleChange && camera) {
            // Lấy góc quay Yaw (hướng nhìn ngang) của camera
            const vector = new THREE.Vector3();
            camera.getWorldDirection(vector);
            const angleDeg = Math.atan2(vector.x, vector.z) * (180 / Math.PI);
            onAngleChange(angleDeg);
        }
    });
    return null;
}

// Component chính chứa Canvas + 2D Floor Plan Overlay
export default function VR360Viewer({ imageUrl, hotspots, onNavigate, sceneTitle, currentSceneId = 'A3' }) {
    const [coordinateHelper, setCoordinateHelper] = useState(null);
    const [showFloorPlan, setShowFloorPlan] = useState(true);
    const [activeFloor, setActiveFloor] = useState('Floor 1');
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [cameraAngle, setCameraAngle] = useState(0);

    const handleNavigateWithWalkAnimation = (targetSceneId) => {
        if (targetSceneId === currentSceneId) return;
        setIsTransitioning(true);
        setTimeout(() => {
            onNavigate(targetSceneId);
            setTimeout(() => {
                setIsTransitioning(false);
            }, 300);
        }, 300);
    };

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, overflow: 'hidden' }}>
            {/* Top Bar - Room Title */}
            <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                zIndex: 10,
                color: '#fff',
                backgroundColor: 'rgba(18, 20, 26, 0.75)',
                padding: '10px 18px',
                borderRadius: '12px',
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.4)'
            }}>
                <span>{sceneTitle || 'Phòng VR'}</span>
                <button
                    onClick={() => setShowFloorPlan(!showFloorPlan)}
                    style={{
                        background: showFloorPlan ? '#881337' : 'linear-gradient(135deg, #ef4444, #dc2626)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: '#fff',
                        padding: '6px 14px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 12px rgba(239,68,68,0.4)'
                    }}
                >
                    🗺️ {showFloorPlan ? 'Đóng Sơ đồ' : 'Xem sơ đồ mặt bằng'}
                </button>
            </div>

            {/* Helper để lấy tọa độ cấu hình hotspot */}
            {coordinateHelper && (
                <div style={{
                    position: 'absolute',
                    bottom: '80px',
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

            {/* 3D Walk Transition Overlay (Motion Blur Zoom Effect) */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 100,
                backgroundColor: isTransitioning ? 'rgba(0,0,0,0.85)' : 'transparent',
                backdropFilter: isTransitioning ? 'blur(16px)' : 'none',
                transform: isTransitioning ? 'scale(1.08)' : 'scale(1)',
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
            }} />

            {/* 3D Canvas Scene với OrbitControls có Damping mượt mà */}
            <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
                <CameraTracker onAngleChange={setCameraAngle} />
                <Suspense fallback={<Html center><div style={{ color: '#fff', fontSize: '20px' }}>Đang tải không gian 360...</div></Html>}>
                    <Panorama image={imageUrl} onBgClick={(pos) => setCoordinateHelper(pos)} />
                </Suspense>

                {/* Render các hotspot với hiệu ứng di chuyển bước đi */}
                {hotspots && hotspots.map((hotspot) => (
                    <group key={hotspot.id} position={hotspot.position}>
                        <Html center>
                            <div className="hotspot-container" onClick={() => handleNavigateWithWalkAnimation(hotspot.target)}>
                                <div className="hotspot-pulse"></div>
                                <div className="hotspot-arrow">🚶</div>
                                {hotspot.label && <div className="hotspot-tooltip">{hotspot.label}</div>}
                            </div>
                        </Html>
                    </group>
                ))}

                <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    rotateSpeed={-0.4}
                    enableDamping={true}
                    dampingFactor={0.05}
                />
            </Canvas>

            {/* 2D Floor Plan Overlay với Nón hướng nhìn 360 */}
            {showFloorPlan && (
                <FloorPlanOverlay
                    currentSceneId={currentSceneId}
                    onSelectScene={handleNavigateWithWalkAnimation}
                    onClose={() => setShowFloorPlan(false)}
                    activeFloor={activeFloor}
                    cameraAngle={cameraAngle}
                />
            )}
        </div>
    );
}