import React, { useEffect } from 'react';
import { BarChart3 } from 'lucide-react';
import { ArrayVisualizer } from './components/ArrayVisualizer';
import { Controls } from './components/Controls';
import { AlgorithmSelector } from './components/AlgorithmSelector';
import { ArrayInput } from './components/ArrayInput';
import { useSorting } from './hooks/useSorting';

function App() {
  const {
    array,
    currentStep,
    totalSteps,
    isPlaying,
    canPlay,
    speed,
    selectedAlgorithm,
    maxValue,
    currentMessage,
    updateArray,
    play,
    pause,
    step,
    reset,
    setSpeed,
    changeAlgorithm
  } = useSorting();

  // Initialize with a random array on mount
  useEffect(() => {
    const initialArray = Array.from({ length: 15 }, () => Math.floor(Math.random() * 95) + 5);
    updateArray(initialArray);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">DSA Algorithm Visualizer</h1>
              <p className="text-gray-600 mt-1">Interactive sorting algorithm visualization</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Left Panel */}
          <div className="xl:col-span-1 space-y-6">
            <AlgorithmSelector 
              selectedAlgorithm={selectedAlgorithm}
              onAlgorithmChange={changeAlgorithm}
            />
            <ArrayInput 
              onArrayChange={updateArray}
              isDisabled={isPlaying}
            />
          </div>

          {/* Main Visualization */}
          <div className="xl:col-span-3 space-y-6">
            {/* Array Visualization */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-800">Array Visualization</h2>
                {currentMessage && (
                  <p className="text-sm text-gray-600 mt-2 bg-blue-50 p-2 rounded border-l-4 border-blue-400">
                    {currentMessage}
                  </p>
                )}
              </div>
              <div className="p-4">
                {array.length > 0 ? (
                  <ArrayVisualizer array={array} maxValue={maxValue} />
                ) : (
                  <div className="h-80 flex items-center justify-center text-gray-500">
                    Generate an array to start visualizing algorithms
                  </div>
                )}
              </div>
            </div>

            {/* Controls */}
            <Controls
              isPlaying={isPlaying}
              canPlay={canPlay}
              onPlay={play}
              onPause={pause}
              onStep={step}
              onReset={reset}
              speed={speed}
              onSpeedChange={setSpeed}
              currentStep={currentStep}
              totalSteps={totalSteps}
            />
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Color Legend</h3>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-400 rounded"></div>
              <span className="text-sm text-gray-700">Unsorted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-400 rounded"></div>
              <span className="text-sm text-gray-700">Comparing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-400 rounded"></div>
              <span className="text-sm text-gray-700">Swapping</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-400 rounded"></div>
              <span className="text-sm text-gray-700">Pivot</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-400 rounded"></div>
              <span className="text-sm text-gray-700">Sorted</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;