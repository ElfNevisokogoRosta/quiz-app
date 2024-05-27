import { QuestionType } from '@/utils/types';

const generateFields = (quizElement: QuestionType[]) => {
  return [...quizElement.map((qst) => qst.question_id)] as const;
};

export default generateFields;