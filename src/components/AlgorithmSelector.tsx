import React from 'react';
import { SortingAlgorithm } from '../types';
import { algorithms } from '../data/algorithms';

interface AlgorithmSelectorProps {
  selectedAlgorithm: SortingAlgorithm;
  onAlgorithmChange: (algorithm: SortingAlgorithm) => void;
}

export const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({
  selectedAlgorithm,
  onAlgorithmChange
}) => {
  const algorithmKeys = Object.keys(algorithms) as SortingAlgorithm[];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Algorithm</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {algorithmKeys.map((key) => (
          <button
            key={key}
            onClick={() => onAlgorithmChange(key)}
            className={`
              p-3 rounded-lg border-2 transition-all duration-200 text-left
              ${selectedAlgorithm === key 
                ? 'border-blue-500 bg-blue-50 text-blue-900' 
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
              }
            `}
          >
            <div className="font-medium">{algorithms[key].name}</div>
            <div className="text-sm opacity-75 mt-1">
              Avg: {algorithms[key].timeComplexity.average}
            </div>
          </button>
        ))}
      </div>

      {/* Algorithm Info */}
      <div className="border-t pt-4">
        <h4 className="font-medium text-gray-800 mb-2">{algorithms[selectedAlgorithm].name}</h4>
        <p className="text-sm text-gray-600 mb-3">{algorithms[selectedAlgorithm].description}</p>
        
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <div className="font-medium text-gray-700 mb-1">Time Complexity</div>
            <div className="space-y-1">
              <div>Best: <code className="bg-gray-100 px-1 rounded">{algorithms[selectedAlgorithm].timeComplexity.best}</code></div>
              <div>Avg: <code className="bg-gray-100 px-1 rounded">{algorithms[selectedAlgorithm].timeComplexity.average}</code></div>
              <div>Worst: <code className="bg-gray-100 px-1 rounded">{algorithms[selectedAlgorithm].timeComplexity.worst}</code></div>
            </div>
          </div>
          <div>
            <div className="font-medium text-gray-700 mb-1">Space Complexity</div>
            <code className="bg-gray-100 px-1 rounded">{algorithms[selectedAlgorithm].spaceComplexity}</code>
          </div>
        </div>
      </div>
    </div>
  );
};