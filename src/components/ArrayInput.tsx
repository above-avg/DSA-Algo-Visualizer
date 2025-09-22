import React, { useState } from 'react';
import { Shuffle, Plus } from 'lucide-react';

interface ArrayInputProps {
  onArrayChange: (array: number[]) => void;
  isDisabled: boolean;
}

export const ArrayInput: React.FC<ArrayInputProps> = ({ onArrayChange, isDisabled }) => {
  const [inputValue, setInputValue] = useState('');
  const [arraySize, setArraySize] = useState(15);

  const generateRandomArray = () => {
    const array: number[] = [];
    for (let i = 0; i < arraySize; i++) {
      array.push(Math.floor(Math.random() * 95) + 5);
    }
    onArrayChange(array);
  };

  const handleCustomInput = () => {
    if (inputValue.trim()) {
      const numbers = inputValue.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
      if (numbers.length > 0) {
        onArrayChange(numbers);
        setInputValue('');
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCustomInput();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Array Input</h3>
      
      {/* Random Array Generation */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <label className="text-sm font-medium text-gray-700">Array Size:</label>
          <input
            type="range"
            min="5"
            max="50"
            value={arraySize}
            onChange={(e) => setArraySize(parseInt(e.target.value))}
            disabled={isDisabled}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm font-mono text-gray-600 min-w-8">{arraySize}</span>
        </div>
        
        <button
          onClick={generateRandomArray}
          disabled={isDisabled}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 w-full justify-center
            ${isDisabled 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg'
            }
          `}
        >
          <Shuffle size={16} />
          Generate Random Array
        </button>
      </div>

      {/* Custom Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Custom Array (comma-separated):
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., 64, 25, 12, 22, 11"
            disabled={isDisabled}
            className={`
              flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
              ${isDisabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
            `}
          />
          <button
            onClick={handleCustomInput}
            disabled={isDisabled || !inputValue.trim()}
            className={`
              flex items-center justify-center px-4 py-2 rounded-lg transition-all duration-200
              ${isDisabled || !inputValue.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg'
              }
            `}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};