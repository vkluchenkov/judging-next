export interface CategoryAdminProps {
  currentCategory: string;
  contestants: Contestant[];
  // onSubmit: () => void;
  onStart: (number: number) => void;
  onUp: (number: number) => void;
  onDown: (number: number) => void;
}

export interface Contestant {
  number: number;
  name: string;
}
