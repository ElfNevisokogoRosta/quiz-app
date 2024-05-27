import { QuestionType } from '@/utils/types';

const generateConfig = (questionsData: QuestionType[]) => {
  return questionsData.map(qst => ({
    question_id: qst.question_id,
    name: 'question',
    type: 'text',
    value: qst.question,
    label: 'Quiz question',
    qst_type: qst.type,
    answers: qst.answers.map(answ => ({
      name: 'answers',
      type: 'text',
      label: 'Answers',
      value: answ.answer,
      isCorrect: answ.isCorrect,
    })),
  }));
};
export default generateConfig;