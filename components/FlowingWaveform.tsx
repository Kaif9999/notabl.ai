import { useEffect, useRef, useState } from 'react';

interface FlowingWaveformProps {
  isRecording: boolean;
  onToggleRecording: () => void;
}

const FlowingWaveform = ({ isRecording, onToggleRecording }: FlowingWaveformProps) => {
  const redBarsRef = useRef<HTMLDivElement>(null);
  
  // Bar definitions with more dynamic heights for better visualization
  const redBarsHeights = [16, 24, 30, 40, 54, 66, 46, 34, 60, 74, 50, 40, 30, 70, 90, 74, 50, 66, 80, 100, 66, 40, 64, 84, 74, 54, 80, 106, 70, 46, 32, 54, 66, 44, 30];
  const whiteBarsHeights = [30, 14, 10, 30, 20, 16, 26, 32, 20, 14, 30, 40, 24, 16, 34, 40, 60, 50, 80, 70, 74, 60, 44, 84, 66, 50, 58, 30, 20, 34, 16, 14, 8, 10, 16];
  
  useEffect(() => {
    if (isRecording) {
      resumeAnimation();
    } else {
      pauseAnimation();
    }
  }, [isRecording]);
  
  const pauseAnimation = () => {
    if (redBarsRef.current) {
      redBarsRef.current.style.animationPlayState = 'paused';
    }
  };
  
  const resumeAnimation = () => {
    if (redBarsRef.current) {
      redBarsRef.current.style.animationPlayState = 'running';
    }
  };
  
  // Create duplicated red bars for seamless looping
  const duplicatedRedBars = [...redBarsHeights, ...redBarsHeights];
  
  return (
    <div className="waveform-container">
      <div className="red-bars-container">
        <div 
          className="red-bars" 
          ref={redBarsRef}
          style={{ animationPlayState: isRecording ? 'running' : 'paused' } as React.CSSProperties}
        >
          {duplicatedRedBars.map((height, index) => (
            <div 
              key={`red-bar-${index}`}
              className={`bar red-bar ${!isRecording ? 'opacity-50' : ''}`}
              style={{ height: `${height}px` } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
      
      <div className="white-bars-container">
        <div className="white-bars">
          {whiteBarsHeights.map((height, index) => (
            <div 
              key={`white-bar-${index}`}
              className={`bar white-bar ${!isRecording ? 'opacity-50' : ''}`}
              style={{ height: `${height}px` } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
      
      <div className="center-divider"></div>
      
      <style jsx>{`
        .waveform-container {
          width: 100%;
          height: 150px;
          position: relative;
          margin: auto;
          overflow: hidden;
          background-color: black;
          border-radius: 0.75rem;
        }
        
        .center-divider {
          position: absolute;
          left: 50%;
          top: 15px;
          width: 4px;
          height: 120px;
          background-color: #ff3366;
          transform: translateX(-50%);
          z-index: 20;
        }
        
        .red-bars-container {
          left: 0;
          width: 50%;
          overflow: hidden;
          position: absolute;
          height: 100%;
        }
        
        .red-bars {
          position: absolute;
          height: 100%;
          display: flex;
          align-items: center;
          animation: flowRedBars 10s linear infinite;
          will-change: transform;
        }
        
        .white-bars-container {
          right: 0;
          width: 50%;
          overflow: hidden;
          position: absolute;
          height: 100%;
        }
        
        .white-bars {
          position: absolute;
          height: 100%;
          display: flex;
          align-items: center;
        }
        
        .bar {
          width: 4px;
          border-radius: 2px;
          margin: 0 4px;
          transition: opacity 0.2s ease;
        }
        
        .red-bar {
          background-color: #ff3366;
          z-index: 5;
        }
        
        .white-bar {
          background-color: #ffffff;
          z-index: 15;
        }
        
        @keyframes flowRedBars {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default FlowingWaveform; 