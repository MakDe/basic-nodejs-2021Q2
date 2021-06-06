import { IColumn } from './board.column.types';

export type IBoard = {
  id?: string | number | null;
  title: string;
  columns: IColumn[];
};
