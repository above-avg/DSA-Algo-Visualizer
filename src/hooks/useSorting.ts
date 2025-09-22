import { useState, useEffect, useRef } from 'react';
import { ArrayElement, AlgorithmStep, SortingAlgorithm } from '../types';
import { bubbleSort } from '../algorithms/bubbleSort';
import { selectionSort } from '../algorithms/selectionSort';
import { mergeSort } from '../algorithms/mergeSort';
import { quickSort } from '../algorithms/quickSort';

export const useSorting = () => {
  const [array, setArray] = useState<ArrayElement[]>([]);
  const [steps, setSteps] = useState<AlgorithmStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(5);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortingAlgorithm>('bubble');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const algorithms = {
    bubble: bubbleSort,
    selection: selectionSort,
    merge: mergeSort,
    quick: quickSort
  };

  const generateSteps = (inputArray: ArrayElement[]) => {
    const algorithmFunction = algorithms[selectedAlgorithm];
    const newSteps = algorithmFunction(inputArray);
    setSteps(newSteps);
    setCurrentStep(0);
    if (newSteps.length > 0) {
      setArray(newSteps[0].array);
    }
  };

  const updateArray = (newArray: number[]) => {
    const arrayElements: ArrayElement[] = newArray.map((value, index) => ({
      value,
      id: `element-${index}-${Date.now()}`,
      state: 'default'
    }));
    setArray(arrayElements);
    generateSteps(arrayElements);
    setIsPlaying(false);
  };

  const play = () => {
    if (currentStep >= steps.length - 1) return;
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const step = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setArray(steps[nextStep].array);
    }
  };

  const reset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    if (steps.length > 0) {
      setArray(steps[0].array);
    }
  };

  const changeAlgorithm = (algorithm: SortingAlgorithm) => {
    setSelectedAlgorithm(algorithm);
    setIsPlaying(false);
    if (array.length > 0) {
      const resetArray = array.map(el => ({ ...el, state: 'default' as const }));
      generateSteps(resetArray);
    }
  };

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const delay = Math.max(100, 1100 - speed * 100);
      intervalRef.current = setTimeout(() => {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);
        setArray(steps[nextStep].array);
        
        if (nextStep >= steps.length - 1) {
          setIsPlaying(false);
        }
      }, delay);
    } else if (isPlaying && currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [isPlaying, currentStep, steps.length, speed]);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, []);

  const canPlay = steps.length > 0 && currentStep < steps.length - 1;
  const maxValue = Math.max(...array.map(el => el.value));
  const currentMessage = steps[currentStep]?.message || '';

  return {
    array,
    currentStep,
    totalSteps: steps.length,
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
  };
};