export interface Task {
  name: string;
  hrs: number;
  repeatFrequency: 'day' | 'week' | 'month';
}
export interface ResultTask extends Task {
  fteSubtotal: number;
}
