import { Header } from '../Header';
import { Scoring } from '../Scoring';
import { criterias } from '@/src/mocks/criterias';
import { CategoryResults } from '../CategoryResults';
import { results } from '@/src/mocks/results';
import { MessageScreen } from '../MessageScreen';
import { useMemo, useState, useCallback } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { ScoresPayload } from '../Scoring/types';
import { ContestInfo } from '@/src/types/main';
import { CategoryAdmin } from '../CategoryAdmin';
import { contestants } from '@/src/mocks/contestants';
import { Contestant } from '../CategoryAdmin/types';

declare type View = 'scoring' | 'message' | 'results' | 'admin';

interface MainProps {
  contestInfo: ContestInfo;
}

export const Main: React.FC<MainProps> = ({
  contestInfo: { judge, contestName, currentCategory },
}) => {
  const [view, setView] = useState<View | null>(null);
  const [contestantsList, setContestanstsList] = useState<Contestant[]>(contestants);

  const scoringHandler = async (results: ScoresPayload) => {
    console.log(results);
  };

  const resultsEditHandler = (number: number) => {
    console.log(`Edit ${number}`);
    setView('scoring');
  };

  const adminStartHandler = (number: number) => {
    console.log(`Start ${number}`);
  };

  const contestantUpHandler = useCallback(
    (number: number) => {
      const idx = contestantsList.findIndex((contestant) => contestant.number === number);
      if (idx > 0) {
        setContestanstsList((prev) => {
          const newList = prev.slice();
          [newList[idx], newList[idx - 1]] = [newList[idx - 1], newList[idx]];
          return newList;
        });
      }
    },
    [contestantsList]
  );

  const contestantDownHandler = useCallback(
    (number: number) => {
      const idx = contestantsList.findIndex((contestant) => contestant.number === number);
      if (idx >= 0 && idx < contestantsList.length - 1) {
        setContestanstsList((prev) => {
          const newList = prev.slice();
          [newList[idx], newList[idx + 1]] = [newList[idx + 1], newList[idx]];
          return newList;
        });
      }
    },
    [contestantsList]
  );

  const resultsSubmitHandler = () => {
    setView(null);
  };

  // temp for dev
  const viewHandler = (event: SelectChangeEvent) =>
    setView(event.target.value ? (event.target.value as View) : null);

  const currentView = useMemo(() => {
    if (view === 'scoring')
      return (
        <Scoring
          name='Polina Ivanova'
          number={135}
          performanceId={135}
          criterias={criterias}
          onSubmit={scoringHandler}
        />
      );
    if (view === 'message')
      return <MessageScreen message='Thank you! Please wait for the next participant.' />;
    if (view === 'results')
      return (
        <CategoryResults
          currentCategory='Professionals semi-final'
          results={results}
          onEdit={resultsEditHandler}
          onSubmit={resultsSubmitHandler}
        />
      );
    if (view === 'admin')
      return (
        <CategoryAdmin
          currentCategory='Professionals semi-final'
          contestants={contestantsList}
          onStart={adminStartHandler}
          onUp={contestantUpHandler}
          onDown={contestantDownHandler}
        />
      );
    return <MessageScreen message="You've nothing to do, yey!" />;
  }, [view, contestantsList, contestantUpHandler]);

  return (
    <>
      <Header currentContest={contestName} judge={judge?.name} currentCategory={currentCategory} />
      {currentView}

      {/* temp for dev */}
      <FormControl style={{ width: '200px', margin: '20px' }}>
        <InputLabel id='label'>View</InputLabel>
        <Select
          labelId='label'
          id='select'
          value={view ? view : ''}
          label='View'
          onChange={viewHandler}
        >
          <MenuItem value={'scoring'}>Scoring</MenuItem>
          <MenuItem value={'message'}>Message</MenuItem>
          <MenuItem value={'results'}>Results</MenuItem>
          <MenuItem value={'admin'}>Admin</MenuItem>
          <MenuItem value={''}>Reset view</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};
