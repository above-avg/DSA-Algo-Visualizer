import { Algorithm } from '../types';

export const algorithms: Record<string, Algorithm> = {
  bubble: {
    name: 'Bubble Sort',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.'
  },
  selection: {
    name: 'Selection Sort',
    timeComplexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    description: 'Finds the minimum element from unsorted part and puts it at the beginning.'
  },
  merge: {
    name: 'Merge Sort',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(n)',
    description: 'Divides the array into halves, sorts them separately, and then merges the sorted halves.'
  },
  quick: {
    name: 'Quick Sort',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(log n)',
    description: 'Picks a pivot element and partitions the array around the pivot, then recursively sorts the subarrays.'
  }
};