import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import indiaMapImage from '../assets/react.svg'
import { stateRegions } from '../constants/stateRegions';
import { detectCurrentState } from '../utils/mapUtils';
import { ZoomIn, ZoomOut } from 'lucide-react';
import './EnhancedIndiaMap.css';

export default function EnhancedIndiaMap({
  onStateDetected,
  carPosition,
  onStateSelect,
  activeVehicle,
  onVehicleChange,
  isMoving
}) {
  const [zoom, setZoom] = useState(1);
  const [hoveredState, setHoveredState] = useState('');
  const [selectedState, setSelectedState] = useState('');

  useEffect(() => {
    const detectedState = detectCurrentState(carPosition, stateRegions);
    setSelectedState(detectedState);
    onStateDetected(detectedState);
  }, [carPosition, onStateDetected]);

  const handleZoomIn = () => setZoom(Math.min(2, zoom + 0.2));
  const handleZoomOut = () => setZoom(Math.max(0.5, zoom - 0.2));

  return (
    <div className="map-container">
      
      {/* Zoom Controls */}
      <div className="zoom-controls">
        <button onClick={handleZoomIn} className="zoom-button">
          <ZoomIn className="zoom-icon" />
        </button>
        <button onClick={handleZoomOut} className="zoom-button">
          <ZoomOut className="zoom-icon" />
        </button>
      </div>

      <motion.div
        animate={{ scale: zoom }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="map-wrapper"
      >
        <img src={indiaMapImage} alt="India Map" className="map-image" />

        {/* State Hotspots */}
        <div className="hotspot-layer">
          <div className="hotspot-inner">
            {stateRegions.map((region) => (
              <div key={region.name} className="state-wrapper">
                <div
                  className="state-hotspot"
                  style={{
                    left: `${(region.center.x / 600) * 100}%`,
                    top: `${(region.center.y / 600) * 100}%`
                  }}
                  onClick={() => onStateSelect(region.name, region.center)}
                  onMouseEnter={() => setHoveredState(region.name)}
                  onMouseLeave={() => setHoveredState('')}
                  title={region.name}
                />

                {hoveredState === region.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="state-tooltip"
                    style={{
                      left: `${(region.center.x / 600) * 100}%`,
                      top: `${((region.center.y - 35) / 600) * 100}%`
                    }}
                  >
                    {region.name}
                  </motion.div>
                )}

                {selectedState === region.name && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="state-selected-marker"
                    style={{
                      left: `${(region.center.x / 600) * 100}%`,
                      top: `${(region.center.y / 600) * 100}%`
                    }}
                  >
                    <motion.div
                      className="pulse-ring"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="pulse-center" />
                  </motion.div>
                )}

              </div>
            ))}
          </div>
        </div>

      </motion.div>
    </div>
  );
}
