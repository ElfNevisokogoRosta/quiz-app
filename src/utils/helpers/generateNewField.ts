import QUESTION_TYPE from '@/utils/constants/questionType.constant.ts';

const generateNewField = (id: string) => {
  return {
    question_id: id,
    name: 'question',
    type: 'text',
    label: 'Quiz question',
    value: '',
    qst_type: QUESTION_TYPE[0],
    answers: [
      {
        name: 'answers',
        type: 'text',
        label: 'Answers',
        value: '',
        isCorrect: false,
      },
      {
        name: 'answers',
        type: 'text',
        label: 'Answers',
        value: '',
        isCorrect: false,
      },
      {
        name: 'answers',
        type: 'text',
        label: 'Answers',
        value: '',
        isCorrect: false,
      },
      {
        name: 'answers',
        type: 'text',
        label: 'Answers',
        value: '',
        isCorrect: false,
      },
    ],
  };
};

export default generateNewField;