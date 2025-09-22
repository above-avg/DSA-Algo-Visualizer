import { ArrayElement, AlgorithmStep } from '../types';

export const bubbleSort = (arr: ArrayElement[]): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const array = [...arr];
  const n = array.length;

  steps.push({
    array: [...array],
    message: 'Starting Bubble Sort - Compare adjacent elements and swap if needed'
  });

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      // Comparing step
      steps.push({
        array: array.map((el, idx) => ({
          ...el,
          state: idx === j || idx === j + 1 ? 'comparing' : 
                 idx >= n - i ? 'sorted' : 'default'
        })),
        comparing: [j, j + 1],
        message: `Comparing elements at positions ${j} and ${j + 1}: ${array[j].value} vs ${array[j + 1].value}`
      });

      if (array[j].value > array[j + 1].value) {
        // Swapping step
        steps.push({
          array: array.map((el, idx) => ({
            ...el,
            state: idx === j || idx === j + 1 ? 'swapping' : 
                   idx >= n - i ? 'sorted' : 'default'
          })),
          swapping: [j, j + 1],
          message: `Swapping ${array[j].value} and ${array[j + 1].value}`
        });

        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;
      }
    }

    // Mark the last element as sorted
    steps.push({
      array: array.map((el, idx) => ({
        ...el,
        state: idx >= n - i - 1 ? 'sorted' : 'default'
      })),
      message: `Pass ${i + 1} complete. Element ${array[n - i - 1].value} is in its final position`
    });

    if (!swapped) break;
  }

  // Final sorted array
  steps.push({
    array: array.map(el => ({ ...el, state: 'sorted' })),
    message: 'Bubble Sort complete! Array is fully sorted'
  });

  return steps;
};