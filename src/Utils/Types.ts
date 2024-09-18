export type IconType = 'red' | 'yellow' | 'none' | 'orange' | 'all';
export interface ColorItem {
  name: IconType;
  image: any;
}
export interface TodoState {
  todos: TodoItem[];
}
export interface TodoItem {
  id: string;
  title: string;
  desc: string;
  createDate: number;
  expireDate?: string;
  isDone: boolean;
  icon: IconType;
}

export type SortMode = 'default' | 'highToLow' | 'lowToHigh';
