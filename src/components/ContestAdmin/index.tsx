import { contest } from '@/src/mocks/contestants';
import { CategoryAdmin } from '../CategoryAdmin';
import { useState, useCallback } from 'react';
import { ContestCategory } from '../CategoryAdmin/types';
import { Button } from '@mui/material';

export const ContestAdmin: React.FC = () => {
  const [contestList, setContesList] = useState<ContestCategory[]>(contest);

  const onUp = useCallback(
    (id: number) => {
      const idx = contestList.findIndex((category) => category.id === id);
      if (idx > 0) {
        setContesList((prev) => {
          const newList = prev.slice();
          [newList[idx], newList[idx - 1]] = [newList[idx - 1], newList[idx]];
          return newList;
        });
      }
    },
    [contestList]
  );

  const onDown = useCallback(
    (id: number) => {
      const idx = contestList.findIndex((category) => category.id === id);
      if (idx >= 0 && idx < contestList.length - 1) {
        setContesList((prev) => {
          const newList = prev.slice();
          [newList[idx], newList[idx + 1]] = [newList[idx + 1], newList[idx]];
          return newList;
        });
      }
    },
    [contestList]
  );

  const categoriesList = contestList.map((cat) => {
    return (
      <CategoryAdmin
        key={cat.id}
        currentCategory={cat.title}
        contestants={cat.contestants}
        onCategoryUp={onUp}
        onCategoryDown={onDown}
        id={cat.id}
      />
    );
  });

  return <>{categoriesList}</>;
};
