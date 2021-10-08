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

export type OptionItem = {
  _id?: string;
  label: string;
};

export type QuizItem = {
  _id?: string;
  question: string;
  options: OptionItem[];
};

export type AnswerItem = {
  _id?: string;
  question: string;
  answer: string;
  points: number;
};

export type Quiz = {
  category: string;
  quiz: QuizItem[];
};

export type Answer = {
  category: string;
  quiz: AnswerItem[];
};

export type SelectedOption = {
  questionId: string | undefined;
  optionId: string | undefined;
};

export type UserAnswers = {
  categoryId: string;
  answers: SelectedOption[];
};
