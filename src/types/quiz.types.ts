type RuleItem = {
  _id: string;
  label: string;
};

export type CategoryItem = {
  _id: string;
  title: string;
  imageUrl: string;
  description: string;
  rules: RuleItem[];
};

export type QuestionItem = {
  _id: string;
  label: string;
  points: number;
};

export type OptionItem = {
  _id: string;
  label: string;
  isCorrect: boolean;
};

export type Question = {
  category: string;
  questions: QuestionItem[];
};

export type OptionArray = {
  question: string;
  options: OptionItem[];
};

export type Option = {
  category: string;
  items: OptionArray[];
};
