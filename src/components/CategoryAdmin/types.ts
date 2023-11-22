export interface CategoryAdminProps {
  id: number;
  currentCategory: string;
  contestants: Contestant[];
  // onSubmit: () => void;
  // onStart: (number: number) => void;
  onCategoryUp: (id: number) => void;
  onCategoryDown: (id: number) => void;
}

export interface Contestant {
  number: number;
  name: string;
  // categoryTitle: String;
}

export interface ContestCategory {
  contestants: Contestant[];
  id: number;
  title: string;
}
