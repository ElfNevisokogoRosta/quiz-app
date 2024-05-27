import AnswersType from '@/utils/types/Answers.type.ts';
import QuestionSet from '@/utils/types/QuestionType.types.ts';

interface QuestionType {
  question_id: string,
  question: string,
  type: QuestionSet,
  answers: AnswersType[],
}

export default QuestionType;