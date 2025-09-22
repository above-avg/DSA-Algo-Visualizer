import { ArrayElement, AlgorithmStep } from '../types';

export const selectionSort = (arr: ArrayElement[]): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const array = [...arr];
  const n = array.length;

  steps.push({
    array: [...array],
    message: 'Starting Selection Sort - Find minimum element and place it at the beginning'
  });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    steps.push({
      array: array.map((el, idx) => ({
        ...el,
        state: idx < i ? 'sorted' : idx === i ? 'comparing' : 'default'
      })),
      message: `Pass ${i + 1}: Looking for minimum element from position ${i} onwards`
    });

    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: array.map((el, idx) => ({
          ...el,
          state: idx < i ? 'sorted' : 
                 idx === minIdx ? 'pivot' :
                 idx === j ? 'comparing' : 'default'
        })),
        comparing: [j, minIdx],
        message: `Comparing ${array[j].value} with current minimum ${array[minIdx].value}`
      });

      if (array[j].value < array[minIdx].value) {
        minIdx = j;
        steps.push({
          array: array.map((el, idx) => ({
            ...el,
            state: idx < i ? 'sorted' : 
                   idx === minIdx ? 'pivot' : 'default'
          })),
          message: `New minimum found: ${array[minIdx].value} at position ${minIdx}`
        });
      }
    }

    if (minIdx !== i) {
      steps.push({
        array: array.map((el, idx) => ({
          ...el,
          state: idx < i ? 'sorted' : 
                 idx === i || idx === minIdx ? 'swapping' : 'default'
        })),
        swapping: [i, minIdx],
        message: `Swapping ${array[i].value} and ${array[minIdx].value}`
      });

      [array[i], array[minIdx]] = [array[minIdx], array[i]];
    }

    steps.push({
      array: array.map((el, idx) => ({
        ...el,
        state: idx <= i ? 'sorted' : 'default'
      })),
      message: `Element ${array[i].value} is now in its final position`
    });
  }

  steps.push({
    array: array.map(el => ({ ...el, state: 'sorted' })),
    message: 'Selection Sort complete! Array is fully sorted'
  });

  return steps;
};