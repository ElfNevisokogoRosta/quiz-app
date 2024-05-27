import QuestionType from '@/utils/types/Question.type.ts';

interface Quiz {
  id: string,
  quizTitle: string,
  questions: QuestionType[]
}

export default Quiz;