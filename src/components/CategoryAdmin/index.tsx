/** @jsxImportSource @emotion/react */

import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useCallback, useEffect, useMemo } from 'react';
import { adminColumnBuilder } from './helpers/adminColumnBuilder';
import { styles } from './styles';
import { CategoryAdminProps, Contestant } from './types';

export const CategoryAdmin: React.FC<CategoryAdminProps> = ({
  currentCategory,
  contestants,
  onStart,
  onUp,
  onDown,
}) => {
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
    return adminColumnBuilder(contestants, startClickHandler, upClickHandler, downClickHandler);
  }, [contestants, startClickHandler, upClickHandler, downClickHandler]);

  const rows = useMemo(() => {
    return contestants.map((contestant) => {
      return {
        id: contestant.number,
        number: contestant.number,
        name: contestant.name,
        categoryTitle: contestant.categoryTitle,
      };
    });
  }, [contestants]);

  return (
    <Box css={styles.box}>
      <Typography variant='h5' align='center' data-testid='title'>
        {currentCategory} participants:
      </Typography>
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
        disableVirtualization
        hideFooter
        autoHeight
        data-testid='grid'
      />
    </Box>
  );
};
