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
    flex: 15,
    editable: false,
    sortable: false,
  };

  const nameColumn: GridColDef = {
    field: 'name',
    headerName: 'Participant',
    flex: 120,
    minWidth: 120,
    editable: false,
    sortable: false,
  };

  const editColumn: GridColDef = {
    field: 'edit',
    headerName: 'Action',
    flex: 50,
    editable: false,
    align: 'center',
    headerAlign: 'center',
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <>
          <Button onClick={() => startClickHandler(params)} data-testid='edit-btn'>
            Start
          </Button>
          <Button onClick={() => upClickHandler(params)} data-testid='edit-btn'>
            ↑
          </Button>
          <Button onClick={() => downClickHandler(params)} data-testid='edit-btn'>
            ↓
          </Button>
        </>
      );
    },
  };

  return [numberColumn, nameColumn, editColumn];
};
