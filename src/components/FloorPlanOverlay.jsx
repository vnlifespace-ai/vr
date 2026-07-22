import React, { useState } from 'react';
import './FloorPlanOverlay.css';

// 3D Architectural Camera Waypoint Nodes (ONLY 2 nodes: A3 & A5)
export const CAMERA_NODES_3D = [
  { id: 'A3', sceneId: 'A3', title: 'Phòng khách (A3)', pos: { left: '250px', top: '240px' }, box: { left: '70px', top: '60px', width: '360px', height: '380px' } },
  { id: 'A5', sceneId: 'A5', title: 'Nhà vệ sinh (A5)', pos: { left: '560px', top: '235px' }, box: { left: '450px', top: '120px', width: '230px', height: '270px' } }
];

export default function FloorPlanOverlay({
  currentSceneId = 'A3',
  onSelectScene,
  onClose,
  activeFloor = 'Floor 1',
  cameraAngle = 0
}) {
  const [activeNodeId, setActiveNodeId] = useState(currentSceneId === 'A5' ? 'A5' : 'A3');
  const [hoveredNode, setHoveredNode] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Active node selection
  const activeNode = CAMERA_NODES_3D.find(n => n.id === activeNodeId) || CAMERA_NODES_3D[0];

  const handleNodeClick = (node) => {
    setActiveNodeId(node.id);
    if (onSelectScene) {
      onSelectScene(node.sceneId);
    }
  };

  return (
    <div className="floorplan-overlay">
      {/* Top Left Search Button */}
      <button
        className="header-search-btn"
        onClick={() => setShowSearch(!showSearch)}
        title="Tìm kiếm vị trí 3D"
      >
        🔍
      </button>

      {/* Top Center Floor Pill Header (Floor 1 ✕) */}
      <header className="floorplan-header">
        <div className="floorplan-header-controls">
          <div className="floor-pill-header">
            <span>{activeFloor} (Sơ đồ Kiến trúc 3D Không gian Thật)</span>
            <button className="floor-close-x" onClick={onClose} title="Đóng sơ đồ 3D">
              ✕
            </button>
          </div>
        </div>
      </header>

      {/* Top Right VR Avatar Badge */}
      <div className="vr-badge-topright" title="VR Tour Profile">
        <svg viewBox="0 0 24 24">
          <path d="M21 7.5H3C1.9 7.5 1 8.4 1 9.5V14.5C1 15.6 1.9 16.5 3 16.5H7.5L9.5 18.5H14.5L16.5 16.5H21C22.1 16.5 23 15.6 23 14.5V9.5C23 8.4 22.1 7.5 21 7.5ZM7 14C5.62 14 4.5 12.88 4.5 11.5C4.5 10.12 5.62 9 7 9C8.38 9 9.5 10.12 9.5 11.5C9.5 12.88 8.38 14 7 14ZM17 14C15.62 14 14.5 12.88 14.5 11.5C14.5 10.12 15.62 9 17 9C18.38 9 19.5 10.12 19.5 11.5C19.5 12.88 18.38 14 17 14Z" />
        </svg>
      </div>

      {/* Search Popover */}
      {showSearch && (
        <div style={{
          position: 'absolute',
          top: '70px',
          left: '20px',
          width: '250px',
          background: '#1e2028',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '10px',
          padding: '12px',
          zIndex: 40,
          boxShadow: '0 8px 24px rgba(0,0,0,0.6)'
        }}>
          <input
            type="text"
            placeholder="Tìm vị trí 3D..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '6px',
              padding: '8px 10px',
              color: '#fff',
              outline: 'none',
              fontSize: '13px'
            }}
            autoFocus
          />
          <div style={{ marginTop: '8px' }}>
            {CAMERA_NODES_3D.filter(n => n.title.toLowerCase().includes(searchQuery.toLowerCase())).map(n => (
              <div
                key={n.id}
                onClick={() => {
                  handleNodeClick(n);
                  setShowSearch(false);
                }}
                style={{
                  padding: '8px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  color: n.id === activeNodeId ? '#facc15' : '#fff',
                  background: n.id === activeNodeId ? 'rgba(250, 204, 21, 0.15)' : 'transparent'
                }}
              >
                <span>{n.title}</span>
                <small style={{ opacity: 0.6 }}>{n.sceneId}</small>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MAIN 3D ARCHITECTURAL VIEWPORT (Tường & Cửa 3D Thật - Không có nội thất) */}
      <main className="dollhouse-viewport-3d">
        <div className="dollhouse-stage-3d">
          {/* --- ROOM 1: PHÒNG KHÁCH (A3) --- */}
          <div
            className="dollhouse-room-3d"
            style={{ left: '70px', top: '60px', width: '360px', height: '380px' }}
            onClick={() => handleNodeClick(CAMERA_NODES_3D[0])}
          >
            {/* Clean 3D Floor Surface Plane */}
            <div className="dollhouse-floor dollhouse-floor-a3" />

            {/* Room Title Floating Directly Over Room Area */}
            <div className="room-center-badge-3d">
              PHÒNG KHÁCH (A3) • 16.0m²
            </div>
          </div>

          {/* --- ROOM 2: NHÀ VỆ SINH (A5) --- */}
          <div
            className="dollhouse-room-3d"
            style={{ left: '450px', top: '120px', width: '230px', height: '270px' }}
            onClick={() => handleNodeClick(CAMERA_NODES_3D[1])}
          >
            {/* Clean 3D Floor Surface Plane */}
            <div className="dollhouse-floor dollhouse-floor-a5" />

            {/* Room Title Floating Directly Over Room Area */}
            <div className="room-center-badge-3d">
              NHÀ VỆ SINH (A5) • 5.7m²
            </div>
          </div>

          {/* 3D ACTIVE YELLOW HIGHLIGHT BOUNDING FRAME ([ 🟨 ]) */}
          {activeNode && activeNode.box && (
            <div
              className="dollhouse-yellow-3d-frame"
              style={{
                left: activeNode.box.left,
                top: activeNode.box.top,
                width: activeNode.box.width,
                height: activeNode.box.height
              }}
            />
          )}

          {/* 3D CAMERA WAYPOINT NODES (⊙ Floating 3D Rings) */}
          {CAMERA_NODES_3D.map((node) => {
            const isActive = node.id === activeNodeId;
            const isHovered = hoveredNode === node.id;

            return (
              <div
                key={node.id}
                className={`dollhouse-camera-node-3d ${isActive ? 'active' : ''}`}
                style={{ left: node.pos.left, top: node.pos.top }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNodeClick(node);
                }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div className="dollhouse-node-ring">
                  <div className="dollhouse-node-inner">
                    <div className="dollhouse-node-dot" />
                  </div>
                </div>

                {/* 3D Radar View Cone on Active Node */}
                {isActive && (
                  <svg
                    className="dollhouse-radar-cone"
                    viewBox="0 0 100 100"
                    style={{ transform: `rotate(${cameraAngle}deg)` }}
                  >
                    <path
                      d="M 50,50 L 22,5 A 50 50 0 0 1 78,5 Z"
                      fill="rgba(250, 204, 21, 0.55)"
                      stroke="#facc15"
                      strokeWidth="1.5"
                      strokeDasharray="3 2"
                    />
                  </svg>
                )}

                {/* Tooltip on Hover */}
                {isHovered && (
                  <div style={{
                    position: 'absolute',
                    top: '-35px',
                    left: '50%',
                    transform: 'translateX(-50%) rotateX(-54deg) rotateZ(30deg)',
                    background: 'rgba(15, 23, 42, 0.95)',
                    border: '1.5px solid rgba(255,255,255,0.3)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.7)',
                    pointerEvents: 'none'
                  }}>
                    {node.title}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
