import React from 'react';
import { motion } from "framer-motion";
import './DataStream.css';

export default function DataStream() {
  const streams = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="data-stream-container">
      {streams.map((i) => (
        <motion.div
          key={i}
          className="data-stream-line"
          style={{
            left: `${(i / streams.length) * 100}%`,
          }}
          animate={{
            y: ['-100%', '100%'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
