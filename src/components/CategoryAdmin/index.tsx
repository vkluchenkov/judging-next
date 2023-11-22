/** @jsxImportSource @emotion/react */

import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { adminColumnBuilder } from './helpers/adminColumnBuilder';
import { styles } from './styles';
import { CategoryAdminProps, Contestant } from './types';

export const CategoryAdmin: React.FC<CategoryAdminProps> = ({
  currentCategory,
  contestants,
  onCategoryUp,
  onCategoryDown,
  id,
}) => {
  const [contestantsList, setContestanstsList] = useState<Contestant[]>(contestants);

  const onStart = useCallback((number: number) => {
    console.log(`Start ${number}`);
  }, []);

  const onUp = useCallback(
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

  const onDown = useCallback(
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

  const startClickHandler = useCallback(
    (params: GridRenderCellParams<any, Contestant>) => {
      onStart(params.row.number);
    },
    [onStart]
  );
  const upClickHandler = useCallback(
    (params: GridRenderCellParams<any, Contestant>) => {
      onUp(params.row.number);
    },
    [onUp]
  );
  const downClickHandler = useCallback(
    (params: GridRenderCellParams<any, Contestant>) => {
      onDown(params.row.number);
    },
    [onDown]
  );

  const columns: GridColDef[] = useMemo(() => {
    return adminColumnBuilder(contestantsList, startClickHandler, upClickHandler, downClickHandler);
  }, [contestantsList, startClickHandler, upClickHandler, downClickHandler]);

  const rows = useMemo(() => {
    return contestantsList.map((contestant) => {
      return {
        id: contestant.number,
        number: contestant.number,
        name: contestant.name,
      };
    });
  }, [contestantsList]);

  return (
    <Box css={styles.box}>
      <Button onClick={() => onCategoryUp(id)} data-testid='cat-up-btn'>
        ↑
      </Button>

      <Typography variant='h5' align='center' data-testid='title'>
        {currentCategory}
      </Typography>
      <Button onClick={() => onCategoryDown(id)} data-testid='cat-down-btn'>
        ↓
      </Button>
      <DataGrid
        css={styles.grid}
        rows={rows}
        columns={columns}
        // @ts-ignore
        pageSize={100}
        disableSelectionOnClick
        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        disableRowSelectionOnClick
        disableVirtualization
        hideFooter
        autoHeight
        data-testid='grid'
      />
    </Box>
  );
};
