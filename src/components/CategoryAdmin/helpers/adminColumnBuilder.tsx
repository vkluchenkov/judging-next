import { Button } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Contestant } from '../types';

export const adminColumnBuilder = (
  contestants: Contestant[],
  startClickHandler: (params: GridRenderCellParams<any, Contestant>) => void,
  upClickHandler: (params: GridRenderCellParams<any, Contestant>) => void,
  downClickHandler: (params: GridRenderCellParams<any, Contestant>) => void
) => {
  const numberColumn: GridColDef = {
    field: 'number',
    headerName: '#',
    flex: 5,
    editable: false,
    sortable: false,
  };

  const nameColumn: GridColDef = {
    field: 'name',
    headerName: 'Participant',
    flex: 70,
    minWidth: 70,
    editable: false,
    sortable: false,
  };

  // const categoryTitleColumn: GridColDef = {
  //   field: 'categoryTitle',
  //   headerName: 'Category',
  //   flex: 150,
  //   minWidth: 150,
  //   editable: false,
  //   sortable: false,
  // };

  const editColumn: GridColDef = {
    field: 'edit',
    headerName: 'Action',
    flex: 20,
    editable: false,
    align: 'right',
    headerAlign: 'center',
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <>
          <Button onClick={() => startClickHandler(params)} data-testid='start-btn'>
            Start
          </Button>
          <Button onClick={() => upClickHandler(params)} data-testid='up-btn'>
            ↑
          </Button>
          <Button onClick={() => downClickHandler(params)} data-testid='down-btn'>
            ↓
          </Button>
        </>
      );
    },
  };

  return [numberColumn, nameColumn, editColumn];
};
