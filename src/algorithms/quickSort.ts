import { ArrayElement, AlgorithmStep } from '../types';

export const quickSort = (arr: ArrayElement[]): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const array = [...arr];

  steps.push({
    array: [...array],
    message: 'Starting Quick Sort - Choose pivot and partition array around it'
  });

  const quickSortHelper = (arr: ArrayElement[], low: number, high: number) => {
    if (low < high) {
      const pivotIndex = partition(arr, low, high);
      quickSortHelper(arr, low, pivotIndex - 1);
      quickSortHelper(arr, pivotIndex + 1, high);
    }
  };

  const partition = (arr: ArrayElement[], low: number, high: number): number => {
    const pivot = arr[high];
    
    steps.push({
      array: array.map((el, idx) => ({
        ...el,
        state: idx === high ? 'pivot' : 
               idx >= low && idx < high ? 'comparing' : 'default'
      })),
      pivot: high,
      message: `Chosen pivot: ${pivot.value} at position ${high}`
    });

    let i = low - 1;

    for (let j = low; j < high; j++) {
      steps.push({
        array: array.map((el, idx) => ({
          ...el,
          state: idx === high ? 'pivot' : 
                 idx === j ? 'comparing' :
                 idx >= low && idx < high ? 'default' : 'default'
        })),
        comparing: [j, high],
        message: `Comparing ${arr[j].value} with pivot ${pivot.value}`
      });

      if (arr[j].value < pivot.value) {
        i++;
        if (i !== j) {
          steps.push({
            array: array.map((el, idx) => ({
              ...el,
              state: idx === high ? 'pivot' : 
                     idx === i || idx === j ? 'swapping' : 'default'
            })),
            swapping: [i, j],
            message: `Swapping ${arr[i].value} and ${arr[j].value}`
          });

          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
      }
    }

    steps.push({
      array: array.map((el, idx) => ({
        ...el,
        state: idx === i + 1 || idx === high ? 'swapping' : 'default'
      })),
      swapping: [i + 1, high],
      message: `Placing pivot ${pivot.value} in its correct position`
    });

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

    steps.push({
      array: array.map((el, idx) => ({
        ...el,
        state: idx === i + 1 ? 'sorted' : 'default'
      })),
      message: `Pivot ${arr[i + 1].value} is now in its final position at index ${i + 1}`
    });

    return i + 1;
  };

  quickSortHelper(array, 0, array.length - 1);

  steps.push({
    array: array.map(el => ({ ...el, state: 'sorted' })),
    message: 'Quick Sort complete! Array is fully sorted'
  });

  return steps;
};