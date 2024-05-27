import QuestionSet from '@/utils/types/QuestionType.types.ts';
import AnswersType from '@/utils/types/Answers.type.ts';

interface FormConfigTypes {
  type: QuestionSet;
  name: string;
  answers: AnswersType[];
}

export default FormConfigTypes;