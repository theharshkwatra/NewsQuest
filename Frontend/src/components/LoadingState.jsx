import React from "react";
import { motion } from "framer-motion";
import { Radio } from "lucide-react";
import "./LoadingState.css";

export default function LoadingState() {
  return (
    <div className="loading-container">
      
      {/* Animated background gradient */}
      <motion.div 
        className="bg-animated"
        animate={{
          background: [
            "linear-gradient(to bottom right, #020617, rgba(30,58,138,0.25), rgba(88,28,135,0.25))",
            "linear-gradient(to bottom right, #020617, rgba(88,28,135,0.25), rgba(30,58,138,0.25))",
            "linear-gradient(to bottom right, #020617, rgba(30,58,138,0.25), rgba(88,28,135,0.25))",
          ]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Grid Pattern */}
      <div className="grid-overlay" />
      
      {/* Scanlines */}
      <div className="scanlines" />

      <div className="content">

        {/* Rotating glowing logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="logo-wrapper"
        >
          {/* cyan ring */}
          <motion.div
            className="ring ring-cyan"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* purple ring */}
          <motion.div
            className="ring ring-purple"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />

          {/* center circle */}
          <motion.div
            className="logo-circle"
            animate={{
              boxShadow: [
                "0 0 30px rgba(6,182,212,0.5), 0 0 60px rgba(139,92,246,0.3)",
                "0 0 60px rgba(6,182,212,0.8), 0 0 90px rgba(139,92,246,0.5)",
                "0 0 30px rgba(6,182,212,0.5), 0 0 60px rgba(139,92,246,0.3)",
              ],
              rotate: [0, 360]
            }}
            transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, boxShadow: { duration: 2, repeat: Infinity } }}
          >
            <Radio className="logo-icon" />
          </motion.div>
        </motion.div>


        {/* Brand Text */}
        <motion.div className="brand-text" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <h1 className="brand-title">
            <span className="brand-title-faint">NEWS</span>
            <span className="brand-gradient">QUEST</span>
          </h1>
          <p className="brand-sub">Real-Time Intelligence System</p>
        </motion.div>

        {/* Loading indicator */}
        <motion.div className="progress-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          
          <motion.div className="loading-text" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
            INITIALIZING SYSTEMS
            <motion.span className="loading-dots">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="dot"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </motion.span>
          </motion.div>

          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* System logs */}
        <motion.div className="system-log" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <div>▸ Loading news sources...</div>
          <div>▸ Calibrating bias detection...</div>
          <div>▸ Establishing secure connection...</div>
        </motion.div>
      </div>

      <div className="corner-info tl">NEWSQUEST v2.0.1<br/>SYSTEM INITIALIZING</div>
      <div className="corner-info br">SECURE CONNECTION<br/>ENCRYPTION ENABLED</div>
    </div>
  );
}