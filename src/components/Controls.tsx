import React from 'react';
import { Play, Pause, SkipForward, RotateCcw, Settings } from 'lucide-react';

interface ControlsProps {
  isPlaying: boolean;
  canPlay: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStep: () => void;
  onReset: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  currentStep: number;
  totalSteps: number;
}

export const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  canPlay,
  onPlay,
  onPause,
  onStep,
  onReset,
  speed,
  onSpeedChange,
  currentStep,
  totalSteps
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col gap-4">
        {/* Main Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={isPlaying ? onPause : onPlay}
            disabled={!canPlay}
            className={`
              flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200
              ${canPlay 
                ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          
          <button
            onClick={onStep}
            disabled={!canPlay || isPlaying}
            className={`
              flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200
              ${canPlay && !isPlaying
                ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            <SkipForward size={20} />
          </button>
          
          <button
            onClick={onReset}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-500 hover:bg-gray-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <RotateCcw size={20} />
          </button>
        </div>

        {/* Speed Control */}
        <div className="flex items-center gap-3">
          <Settings size={16} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-700 min-w-12">Speed:</span>
          <input
            type="range"
            min="1"
            max="10"
            value={speed}
            onChange={(e) => onSpeedChange(parseInt(e.target.value))}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <span className="text-sm font-mono text-gray-600 min-w-8">{speed}x</span>
        </div>

        {/* Progress */}
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-2">
            Step {currentStep} of {totalSteps}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};