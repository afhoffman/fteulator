import { MultipleProjectDurations } from '../data/models';

export const oneYearData: MultipleProjectDurations = {
  title: 'One Year Project',
  length: '1',
  lengthMeta: 'year(s)',
  totalFte: '0.820',
  totalFteOverPoP: '0.820',
  tasks: [
    {
      name: 'New Task 1',
      durationHrs: '4',
      durationMins: '15',
      repeatFreq: 'day',
      output: {
        hrs: '4.250',
        repeat: 'day',
        fte: '0.530',
        fteOverPoP: '0.530',
      },
    },
    {
      name: 'New Task 2',
      durationHrs: '2',
      durationMins: '0',
      repeatFreq: 'week',
      output: {
        hrs: '2.000',
        repeat: 'week',
        fte: '0.050',
        fteOverPoP: '0.050',
      },
    },
    {
      name: 'New Task 3',
      durationHrs: '10',
      durationMins: '0',
      repeatFreq: 'month',
      output: {
        hrs: '10.000',
        repeat: 'month',
        fte: '0.060',
        fteOverPoP: '0.060',
      },
    },
    {
      name: 'New Task 4',
      durationHrs: '100',
      durationMins: '0',
      repeatFreq: 'year',
      output: {
        hrs: '100.000',
        repeat: 'year',
        fte: '0.050',
        fteOverPoP: '0.050',
      },
    },
    {
      name: 'New Task 5',
      durationHrs: '8',
      durationMins: '0',
      repeatFreq: 'sprint',
      output: {
        hrs: '8.000',
        repeat: 'sprint',
        fte: '0.100',
        fteOverPoP: '0.100',
      },
    },
    {
      name: 'New Task 6',
      durationHrs: '2',
      durationMins: '30',
      repeatFreq: 'sprint',
      output: {
        hrs: '2.500',
        repeat: 'sprint',
        fte: '0.030',
        fteOverPoP: '0.030',
      },
    },
  ],
};
