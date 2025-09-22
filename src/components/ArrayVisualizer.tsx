import React from 'react';
import { ArrayElement } from '../types';

interface ArrayVisualizerProps {
  array: ArrayElement[];
  maxValue: number;
}

export const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({ array, maxValue }) => {
  const getBarColor = (state: ArrayElement['state']) => {
    switch (state) {
      case 'comparing':
        return 'bg-yellow-400';
      case 'swapping':
        return 'bg-red-400';
      case 'sorted':
        return 'bg-green-400';
      case 'pivot':
        return 'bg-purple-400';
      default:
        return 'bg-blue-400';
    }
  };

  const getBarHeight = (value: number) => {
    return Math.max((value / maxValue) * 300, 20);
  };

  return (
    <div className="flex items-end justify-center gap-1 h-80 p-4 bg-white rounded-lg shadow-md overflow-x-auto">
      {array.map((element, index) => (
        <div key={element.id} className="flex flex-col items-center gap-2 min-w-0">
          <div
            className={`
              ${getBarColor(element.state)} 
              transition-all duration-300 ease-in-out 
              rounded-t-sm shadow-sm min-w-8 flex items-end justify-center
            `}
            style={{ height: `${getBarHeight(element.value)}px` }}
          >
            <span className="text-white text-xs font-semibold pb-1">
              {element.value}
            </span>
          </div>
          <span className="text-xs text-gray-500 font-mono">
            {index}
          </span>
        </div>
      ))}
    </div>
  );
};