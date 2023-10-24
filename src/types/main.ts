import { Judge } from '../api/types';

export interface ContestInfo {
  judge: Judge | undefined;
  contestName: string;
  currentCategory: string;
}
