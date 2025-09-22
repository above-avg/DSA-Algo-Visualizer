export interface ArrayElement {
  value: number;
  id: string;
  state: 'default' | 'comparing' | 'swapping' | 'sorted' | 'pivot';
}

export interface AlgorithmStep {
  array: ArrayElement[];
  comparing?: number[];
  swapping?: number[];
  pivot?: number;
  sorted?: number[];
  message: string;
}

export interface Algorithm {
  name: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  description: string;
}

export type SortingAlgorithm = 'bubble' | 'selection' | 'merge' | 'quick';