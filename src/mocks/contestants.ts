import { ContestCategory, Contestant } from '../components/CategoryAdmin/types';

export const contest: ContestCategory[] = [
  {
    contestants: [
      {
        number: 1,
        name: 'Гадя Петрова',
      },
      {
        number: 2,
        name: 'Вася Иванова',
      },
      {
        number: 3,
        name: 'Деда Морозова',
      },
    ],
    id: 1,
    title: 'Semi-professionals adults pop song',
  },
  {
    contestants: [
      {
        number: 4,
        name: 'Гадя Петрова',
      },
      {
        number: 5,
        name: 'Вася Иванова',
      },
      {
        number: 6,
        name: 'Деда Морозова',
      },
    ],
    id: 2,
    title: 'Pofessionals kids tabla solo',
  },
];
