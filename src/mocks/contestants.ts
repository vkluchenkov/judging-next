import { ContestCategory, Contestant } from '../components/CategoryAdmin/types';

export const contestants: Contestant[] = [
  {
    number: 1,
    name: 'Гадя Петрова',
    categoryTitle: 'Adults / Intermediate / Classic',
  },
  {
    number: 2,
    name: 'Вася Иванова',
    categoryTitle: 'Baby / Beginners / Classic',
  },
  {
    number: 3,
    name: 'Деда Морозова',
    categoryTitle: 'Adults / Intermediate / Classic',
  },
];

export const contest: ContestCategory[] = [
  {
    contestants: [
      {
        number: 1,
        name: 'Гадя Петрова',
        categoryTitle: 'Adults / Intermediate / Classic',
      },
      {
        number: 2,
        name: 'Вася Иванова',
        categoryTitle: 'Baby / Beginners / Classic',
      },
      {
        number: 3,
        name: 'Деда Морозова',
        categoryTitle: 'Adults / Intermediate / Classic',
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
        categoryTitle: 'Adults / Intermediate / Classic',
      },
      {
        number: 5,
        name: 'Вася Иванова',
        categoryTitle: 'Baby / Beginners / Classic',
      },
      {
        number: 6,
        name: 'Деда Морозова',
        categoryTitle: 'Adults / Intermediate / Classic',
      },
    ],
    id: 2,
    title: 'Pofessionals kids tabla solo',
  },
];
