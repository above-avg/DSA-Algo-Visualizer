import { ArrayElement, AlgorithmStep } from '../types';

export const mergeSort = (arr: ArrayElement[]): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const array = [...arr];

  steps.push({
    array: [...array],
    message: 'Starting Merge Sort - Divide array into smaller subarrays and merge them back sorted'
  });

  const mergeSortHelper = (arr: ArrayElement[], left: number, right: number) => {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    steps.push({
      array: array.map((el, idx) => ({
        ...el,
        state: idx >= left && idx <= right ? 'comparing' : 'default'
      })),
      message: `Dividing array from index ${left} to ${right} at midpoint ${mid}`
    });

    mergeSortHelper(arr, left, mid);
    mergeSortHelper(arr, mid + 1, right);
    merge(arr, left, mid, right);
  };

  const merge = (arr: ArrayElement[], left: number, mid: number, right: number) => {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;

    steps.push({
      array: array.map((el, idx) => ({
        ...el,
        state: idx >= left && idx <= right ? 'comparing' : 'default'
      })),
      message: `Merging subarrays [${left}..${mid}] and [${mid + 1}..${right}]`
    });

    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i].value <= rightArr[j].value) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }

      steps.push({
        array: [...array],
        message: `Placed ${arr[k].value} at position ${k}`
      });
      k++;
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      steps.push({
        array: [...array],
        message: `Placed remaining element ${arr[k].value} at position ${k}`
      });
      i++;
      k++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      steps.push({
        array: [...array],
        message: `Placed remaining element ${arr[k].value} at position ${k}`
      });
      j++;
      k++;
    }

    steps.push({
      array: array.map((el, idx) => ({
        ...el,
        state: idx >= left && idx <= right ? 'sorted' : 'default'
      })),
      message: `Merge complete for range [${left}..${right}]`
    });
  };

  mergeSortHelper(array, 0, array.length - 1);

  steps.push({
    array: array.map(el => ({ ...el, state: 'sorted' })),
    message: 'Merge Sort complete! Array is fully sorted'
  });

  return steps;
};