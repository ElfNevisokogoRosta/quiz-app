import QuizType from '@/utils/types/Quiz.type.ts';

const generateFormConfig = (obj: QuizType) => {

  return [
    ...obj.questions.map(qst => ({
      tag: 'input',
      name: qst.question_id,
      type: qst.type === 'chose_many' ? 'checkbox' : 'radio',
      answers: qst.answers,
      qstType: qst.type,
    })),
  ];
};

export default generateFormConfig;