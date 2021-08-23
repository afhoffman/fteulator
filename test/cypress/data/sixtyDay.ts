import { MultipleProjectDurations } from '../data/models';

export const sixtyDayData: MultipleProjectDurations = {
  title: '60 Day Project',
  length: '60',
  lengthMeta: 'day(s)',
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
        fteOverPoP: '0.122',
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
        fteOverPoP: '0.012',
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
        fteOverPoP: '0.014',
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
        fteOverPoP: '0.012',
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
        fteOverPoP: '0.023',
      },
    },
  ],
};