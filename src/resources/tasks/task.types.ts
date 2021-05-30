export type ITask = {
  id?: string | number | null;
  title: string;
  order: number;
  description: string;
  userId: string | number | null;
  boardId: string | number | null;
  columnId: string | number | null;
};
