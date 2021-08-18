export interface Task {
  name: string;
  hrs: number;
  repeatFrequency: 'day' | 'week' | 'month';
}
