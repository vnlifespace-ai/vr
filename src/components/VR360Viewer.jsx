import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useLoader, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

// Component render sphere với texture ảnh 360
function Panorama({ image, onBgClick, showCoordinateHelper }) {
    const texture = useLoader(THREE.TextureLoader, image);

    return (
        <mesh
            scale={[-1, 1, 1]}
            onPointerDown={(e) => {
                if (showCoordinateHelper && e.button === 0) {
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

// Component theo dõi góc quay camera 360
function CameraTracker({ onAngleChange }) {
    const { camera } = useThree();
    useFrame(() => {
        if (onAngleChange && camera) {
            const vector = new THREE.Vector3();
            camera.getWorldDirection(vector);
            const angleDeg = Math.atan2(vector.x, vector.z) * (180 / Math.PI);
            onAngleChange(angleDeg);
        }
    });
    return null;
}

export default function VR360Viewer({
    imageUrl,
    hotspots = [],
    onNavigate,
    sceneTitle,
    currentSceneId,
    scenesList = [],
    projectName = "Hiyori Garden Tower",
    floorPlanCoords,
    initialRotation = 0,
    showCoordinateHelper = false
}) {
    const [coordinateHelper, setCoordinateHelper] = useState(null);
    const [showFloorPlan, setShowFloorPlan] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [cameraAngle, setCameraAngle] = useState(0);
    const [autoRotate, setAutoRotate] = useState(false);
    const containerRef = useRef(null);
    const controlsRef = useRef(null);

    useEffect(() => {
        if (controlsRef.current) {
            controlsRef.current.reset();
        }
    }, [currentSceneId]);

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

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen().catch(err => console.log(err));
        } else {
            document.exitFullscreen().catch(err => console.log(err));
        }
    };

    return (
        <div ref={containerRef} style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, overflow: 'hidden', backgroundColor: '#0a0c10', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            {/* Top Bar Navigation & Info */}
            <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                right: '16px',
                zIndex: 20,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pointerEvents: 'none'
            }}>
                {/* Room & Project Title */}
                <div style={{
                    color: '#fff',
                    backgroundColor: 'rgba(15, 23, 42, 0.82)',
                    padding: '10px 20px',
                    borderRadius: '14px',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                    pointerEvents: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px'
                }}>
                    <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: '700', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                        {projectName}
                    </span>
                    <span style={{ fontSize: '16px', fontWeight: '700', color: '#f8fafc' }}>
                        {sceneTitle || 'Phòng VR 360'}
                    </span>
                </div>

                {/* Right Action Buttons */}
                <div style={{ display: 'flex', gap: '8px', pointerEvents: 'auto' }}>
                    <button
                        onClick={() => setAutoRotate(!autoRotate)}
                        title="Tự động xoay 360"
                        style={{
                            background: autoRotate ? 'linear-gradient(135deg, #0284c7, #2563eb)' : 'rgba(15, 23, 42, 0.82)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: '#fff',
                            padding: '8px 14px',
                            borderRadius: '10px',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            backdropFilter: 'blur(10px)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 14px rgba(0,0,0,0.3)'
                        }}
                    >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                        </svg>
                        <span>{autoRotate ? 'Dừng xoay' : 'Tự xoay'}</span>
                    </button>

                    <button
                        onClick={() => setShowFloorPlan(!showFloorPlan)}
                        style={{
                            background: showFloorPlan ? 'linear-gradient(135deg, #0284c7, #2563eb)' : 'rgba(15, 23, 42, 0.82)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: '#fff',
                            padding: '8px 14px',
                            borderRadius: '10px',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            backdropFilter: 'blur(10px)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 14px rgba(0,0,0,0.3)'
                        }}
                    >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                            <line x1="8" y1="2" x2="8" y2="18"></line>
                            <line x1="16" y1="6" x2="16" y2="22"></line>
                        </svg>
                        <span>{showFloorPlan ? 'Ẩn Sơ Đồ' : 'Sơ Đồ Mặt Bằng'}</span>
                    </button>

                    <button
                        onClick={toggleFullscreen}
                        title="Toàn màn hình"
                        style={{
                            background: 'rgba(15, 23, 42, 0.82)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: '#fff',
                            padding: '8px 12px',
                            borderRadius: '10px',
                            fontSize: '14px',
                            cursor: 'pointer',
                            backdropFilter: 'blur(10px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 14px rgba(0,0,0,0.3)'
                        }}
                    >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Hotspot Coordinate Helper Panel (Chỉ hiển thị khi showCoordinateHelper = true) */}
            {showCoordinateHelper && coordinateHelper && (
                <div style={{
                    position: 'absolute',
                    top: '80px',
                    left: '16px',
                    zIndex: 20,
                    color: '#fff',
                    backgroundColor: 'rgba(15, 23, 42, 0.92)',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    border: '1px solid rgba(56, 189, 248, 0.4)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38bdf8', fontWeight: 'bold' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            <span>HOTSPOT HELPER</span>
                        </div>
                        <button onClick={() => setCoordinateHelper(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '2px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <div>Tọa độ 3D: <strong style={{ color: '#facc15' }}>[{coordinateHelper.join(', ')}]</strong></div>
                    <div style={{ fontSize: '11px', marginTop: '4px', color: '#94a3b8' }}>
                        Sao chép tọa độ này để đặt Hotspot chuẩn xác trong file code!
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
                transform: isTransitioning ? 'scale(1.06)' : 'scale(1)',
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
            }} />

            {/* 3D Canvas Scene */}
            <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
                <CameraTracker onAngleChange={setCameraAngle} />
                <group rotation={[0, initialRotation, 0]}>
                    <Suspense fallback={<Html center><div style={{ color: '#fff', fontSize: '15px', fontWeight: '600', background: 'rgba(15, 23, 42, 0.88)', padding: '10px 22px', borderRadius: '12px', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)', whiteSpace: 'nowrap', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>Đang tải hình ảnh VR 360°...</div></Html>}>
                        <Panorama image={imageUrl} onBgClick={(pos) => setCoordinateHelper(pos)} showCoordinateHelper={showCoordinateHelper} />
                    </Suspense>

                    {/* Render các hotspot với biểu tượng arrow mượt mà */}
                    {hotspots && hotspots.map((hotspot) => (
                        <group key={hotspot.id} position={hotspot.position}>
                            <Html center>
                                <div className="hotspot-container" onClick={() => handleNavigateWithWalkAnimation(hotspot.target)}>
                                    <div className="hotspot-pulse"></div>
                                    <div className="hotspot-arrow">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="12" y1="19" x2="12" y2="5"></line>
                                            <polyline points="5 12 12 5 19 12"></polyline>
                                        </svg>
                                    </div>
                                    {hotspot.label && <div className="hotspot-tooltip">{hotspot.label}</div>}
                                </div>
                            </Html>
                        </group>
                    ))}
                </group>

                <OrbitControls
                    ref={controlsRef}
                    enableZoom={true}
                    enablePan={false}
                    rotateSpeed={-0.4}
                    enableDamping={true}
                    dampingFactor={0.05}
                    autoRotate={autoRotate}
                    autoRotateSpeed={0.5}
                />
            </Canvas>

            {/* Interactive Floor Plan Overlay Drawer / Modal */}
            {showFloorPlan && (
                <div style={{
                    position: 'absolute',
                    top: '80px',
                    right: '16px',
                    width: '330px',
                    backgroundColor: 'rgba(15, 23, 42, 0.92)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '16px',
                    padding: '16px',
                    zIndex: 30,
                    boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
                    color: '#fff'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
                        <span style={{ fontWeight: '700', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                                <line x1="8" y1="2" x2="8" y2="18"></line>
                                <line x1="16" y1="6" x2="16" y2="22"></line>
                            </svg>
                            <span>Sơ đồ mặt bằng 2D</span>
                        </span>
                        <button onClick={() => setShowFloorPlan(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '2px' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    {/* SVG Architectural Floor Plan Map matching 3D layout */}
                    <div style={{ position: 'relative', width: '100%', height: '240px', background: 'rgba(15, 23, 42, 0.85)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                        <svg width="100%" height="100%" viewBox="0 0 100 100">
                            {/* Apartment Boundary */}
                            <rect x="10" y="10" width="80" height="80" fill="rgba(30, 41, 59, 0.4)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" rx="4" />

                            {/* Balcony (Bottom strip) */}
                            <rect x="10" y="78" width="80" height="12" fill="rgba(56, 189, 248, 0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="2 2" />
                            <text x="50" y="85" fill="rgba(148, 163, 184, 0.6)" fontSize="3.5" fontWeight="bold" textAnchor="middle">BAN CÔNG</text>

                            {/* Internal Walls */}
                            <line x1="36" y1="10" x2="36" y2="34" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" />
                            <line x1="62" y1="10" x2="62" y2="34" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" />
                            <line x1="10" y1="34" x2="62" y2="34" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" />
                            <line x1="62" y1="34" x2="62" y2="78" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" />

                            {/* Room Area Labels */}
                            <text x="23" y="20" fill="rgba(148, 163, 184, 0.45)" fontSize="3" fontWeight="bold" textAnchor="middle">LỐI VÀO</text>
                            <text x="49" y="20" fill="rgba(148, 163, 184, 0.45)" fontSize="3" fontWeight="bold" textAnchor="middle">NVS (WC)</text>
                            <text x="75" y="20" fill="rgba(148, 163, 184, 0.45)" fontSize="3" fontWeight="bold" textAnchor="middle">BẾP</text>
                            <text x="36" y="52" fill="rgba(148, 163, 184, 0.45)" fontSize="3.5" fontWeight="bold" textAnchor="middle">P. KHÁCH & ĂN</text>
                            <text x="75" y="52" fill="rgba(148, 163, 184, 0.45)" fontSize="3.5" fontWeight="bold" textAnchor="middle">P. NGỦ</text>

                            {/* Node path connections */}
                            <line x1="23" y1="24" x2="36" y2="55" stroke="rgba(56, 189, 248, 0.35)" strokeWidth="1" strokeDasharray="2 2" />
                            <line x1="23" y1="24" x2="49" y2="24" stroke="rgba(56, 189, 248, 0.35)" strokeWidth="1" strokeDasharray="2 2" />
                            <line x1="36" y1="55" x2="75" y2="24" stroke="rgba(56, 189, 248, 0.35)" strokeWidth="1" strokeDasharray="2 2" />
                            <line x1="36" y1="55" x2="75" y2="55" stroke="rgba(56, 189, 248, 0.35)" strokeWidth="1" strokeDasharray="2 2" />

                            {scenesList.map((scene) => {
                                const isActive = scene.id === currentSceneId;
                                const defaultCoords = {
                                    A2: { x: 23, y: 24 },
                                    A5: { x: 49, y: 24 },
                                    A3: { x: 75, y: 24 },
                                    A1: { x: 36, y: 55 },
                                    A4: { x: 75, y: 55 }
                                };
                                const mapCoords = (floorPlanCoords && floorPlanCoords[scene.id]) || defaultCoords[scene.id] || { x: 50, y: 50 };

                                return (
                                    <g key={scene.id} onClick={() => handleNavigateWithWalkAnimation(scene.id)} style={{ cursor: 'pointer' }}>
                                        {isActive && (
                                            <g transform={`translate(${mapCoords.x}, ${mapCoords.y}) rotate(${cameraAngle})`}>
                                                <path d="M 0,0 L -12,-20 A 20 20 0 0 1 12,-20 Z" fill="rgba(56, 189, 248, 0.35)" stroke="#38bdf8" strokeWidth="1" />
                                            </g>
                                        )}
                                        <circle
                                            cx={mapCoords.x}
                                            cy={mapCoords.y}
                                            r={isActive ? "6" : "4.5"}
                                            fill={isActive ? "#38bdf8" : "rgba(30, 41, 59, 0.9)"}
                                            stroke={isActive ? "#ffffff" : "rgba(255,255,255,0.6)"}
                                            strokeWidth="1.8"
                                        />
                                        <text
                                            x={mapCoords.x}
                                            y={mapCoords.y + 11}
                                            fill={isActive ? "#38bdf8" : "#94a3b8"}
                                            fontSize="6.5"
                                            fontWeight={isActive ? "bold" : "normal"}
                                            textAnchor="middle"
                                        >
                                            {scene.id}
                                        </text>
                                    </g>
                                );
                            })}
                        </svg>
                    </div>

                    <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '140px', overflowY: 'auto' }}>
                        {scenesList.map((scene) => (
                            <div
                                key={scene.id}
                                onClick={() => handleNavigateWithWalkAnimation(scene.id)}
                                style={{
                                    padding: '8px 12px',
                                    borderRadius: '8px',
                                    fontSize: '12px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    backgroundColor: scene.id === currentSceneId ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                                    border: scene.id === currentSceneId ? '1px solid rgba(56, 189, 248, 0.5)' : '1px solid transparent',
                                    color: scene.id === currentSceneId ? '#38bdf8' : '#cbd5e1',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <span>{scene.title}</span>
                                <span style={{ fontSize: '10px', opacity: 0.6, background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px' }}>{scene.id}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Bottom Room Thumbnail Navigation Dock */}
            {scenesList.length > 0 && (
                <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 20,
                    display: 'flex',
                    gap: '10px',
                    backgroundColor: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(16px)',
                    padding: '10px 16px',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
                    maxWidth: '92vw',
                    overflowX: 'auto'
                }}>
                    {scenesList.map((scene) => {
                        const isActive = scene.id === currentSceneId;
                        return (
                            <div
                                key={scene.id}
                                onClick={() => handleNavigateWithWalkAnimation(scene.id)}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    minWidth: '85px',
                                    transition: 'transform 0.2s ease'
                                }}
                            >
                                <div style={{
                                    width: '80px',
                                    height: '52px',
                                    borderRadius: '10px',
                                    overflow: 'hidden',
                                    border: isActive ? '2px solid #38bdf8' : '2px solid transparent',
                                    boxShadow: isActive ? '0 0 12px rgba(56, 189, 248, 0.6)' : 'none',
                                    position: 'relative'
                                }}>
                                    <img
                                        src={scene.imageUrl}
                                        alt={scene.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    {isActive && (
                                        <div style={{ position: 'absolute', top: 2, right: 2, width: 8, height: 8, borderRadius: '50%', backgroundColor: '#38bdf8' }} />
                                    )}
                                </div>
                                <span style={{
                                    fontSize: '11px',
                                    fontWeight: isActive ? '700' : '500',
                                    color: isActive ? '#38bdf8' : '#94a3b8',
                                    marginTop: '4px',
                                    textAlign: 'center',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '85px'
                                }}>
                                    {scene.shortName || scene.id}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}