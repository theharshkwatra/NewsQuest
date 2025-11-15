import React, { useEffect, useRef } from "react";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { point as turfPoint } from "@turf/helpers";

export default function StateDetector({
  carPosition,
  mapRef,
  setCurrentState,
  setShowNewsPanel,
  setShowSourcesPanel,
  onVehicleGeoUpdate,   
}) {
  const geoJsonRef = useRef(null);
  const lastDetectedRef = useRef(null);

  useEffect(() => {
    fetch("/data/india_state.geojson")
      .then((r) => r.json())
      .then((g) => (geoJsonRef.current = g))
      .catch((err) =>
        console.error("Failed to load india_state.geojson", err)
      );
  }, []);

  useEffect(() => {
    if (!carPosition || !mapRef.current || !geoJsonRef.current) return;

    let mapboxMap = mapRef.current.getMap();
    if (!mapboxMap) return;

    const container = mapboxMap.getContainer();
    const rect = container.getBoundingClientRect();

    // ===== Get ACTUAL CAR POSITION ON SCREEN =====
    const carEl = document.querySelector(".vehicle-wrapper");
    if (!carEl) return;

    const carRect = carEl.getBoundingClientRect();
    const carX = carRect.left + carRect.width / 2;
    const carY = carRect.top + carRect.height / 2;

    // ===== Convert car position into MAP PIXELS =====
    const px = carX - rect.left;
    const py = carY - rect.top;

    if (px < 0 || py < 0 || px > rect.width || py > rect.height) return;

    const lngLat = mapboxMap.unproject([px, py]);

    // Let parent follow vehicle
    if (onVehicleGeoUpdate) onVehicleGeoUpdate(lngLat);

    // Turf polygon detection
    const pt = turfPoint([lngLat.lng, lngLat.lat]);
    let foundState = null;

    for (const feat of geoJsonRef.current.features) {
      try {
        if (booleanPointInPolygon(pt, feat)) {
          const name =
            feat.properties?.NAME_1 ||
            feat.properties?.name ||
            feat.properties?.NAME ||
            "Unknown";
          foundState = name;
          break;
        }
      } catch {}
    }

    const last = lastDetectedRef.current;

    if (foundState && foundState !== last) {
      lastDetectedRef.current = foundState;
      setCurrentState(foundState);

      setTimeout(() => {
        setShowNewsPanel(true);
        setTimeout(() => setShowSourcesPanel(true), 200);
      }, 200);
    }

    if (!foundState && last) {
      lastDetectedRef.current = null;
      setCurrentState("");
    }
  }, [
    carPosition,
    mapRef,
    setCurrentState,
    setShowNewsPanel,
    setShowSourcesPanel,
  ]);

  return null;
}
