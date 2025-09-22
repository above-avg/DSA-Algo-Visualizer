import { ArrayElement } from '../types';

export const generateRandomArray = (size: number, min: number = 5, max: number = 100): ArrayElement[] => {
  const array: ArrayElement[] = [];
  for (let i = 0; i < size; i++) {
    array.push({
      value: Math.floor(Math.random() * (max - min + 1)) + min,
      id: `element-${i}-${Date.now()}`,
      state: 'default'
    });
  }
  return array;
};

export const createArrayFromInput = (input: string): ArrayElement[] => {
  const numbers = input.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
  return numbers.map((value, index) => ({
    value,
    id: `element-${index}-${Date.now()}`,
    state: 'default'
  }));
};