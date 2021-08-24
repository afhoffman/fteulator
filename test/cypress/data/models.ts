export type RepeatFreq = 'day' | 'week' | 'month' | 'sprint' | 'year';

export type TestInputsAndOutputs = {
  name: string;
  durationHrs: string;
  durationMins: string;
  repeatFreq: RepeatFreq;
  output: {
    hrs: string;
    repeat: RepeatFreq;
    fte: string;
    fteOverPoP: string;
  };
};

export type MultipleProjectDurations = {
  title: string;
  length: string;
  lengthMeta: 'year(s)' | 'month(s)' | 'week(s)' | 'sprint(s)' | 'day(s)';
  tasks: TestInputsAndOutputs[];
  totalFte: string;
  totalFteOverPoP: string;
};
