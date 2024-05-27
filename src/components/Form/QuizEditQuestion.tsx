import { ChangeEvent, FC, useEffect, useState } from 'react';
import BaseInput from '@/ui/BaseInput.tsx';
import { QuestionSet, QuestionType } from '@/utils/types';
import BaseButton from '@/ui/BaseButton.tsx';
import { cn } from '@/utils/helpers';
import BaseCheckbox from '@/ui/BaseCheckbox.tsx';

interface QuizQuestionProps {
  question_id: string;
  deleteQuestion: (id: string) => void;
  type: QuestionSet;
  question: {
    name: string;
    type: string;
    label: string;
    value: string;
    answers: { name: string; type: string; label: string, value: string, isCorrect: boolean }[];
  };
  index: number;
  func: (question: QuestionType, index: string) => void;
  errors: { path: string & number[], message: string }[];
}

const QuizQuestion: FC<QuizQuestionProps> = ({ question_id, type, index, question, func, errors, deleteQuestion }) => {
  const [typeQ, setTypeQ] = useState<QuestionSet>(type);
  const [questionData, setQuestionData] = useState<QuestionType>({
    question_id,
    question: question.value,
    type: type,
    answers: question.answers.map((answ) => ({ answer: answ.value, isCorrect: answ.isCorrect })),
  });
  const { answers, ...rest } = question;
  const typeHandler = (type: QuestionSet) => {
    setTypeQ(type);
    setQuestionData(state => ({
      ...state,
      type: type,
      answers: state.answers.map(answer => ({ ...answer, isCorrect: false })),
    }));
  };
  const onQstHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestionData((state) => ({ ...state, question: e.target.value }));
  };

  const onAnswerHandler = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const newAnswers = [...questionData.answers];
    newAnswers[index].answer = e.target.value;
    setQuestionData((state) => ({ ...state, answers: newAnswers }));
  };
  const isCorrectHandler = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const newAnswers = questionData.answers.map((ans, i) => {
      if (typeQ === 'chose_one') {
        return { ...ans, isCorrect: i === index };
      } else {
        return i === index ? { ...ans, isCorrect: e.target.checked } : ans;
      }
    });
    setQuestionData(state => ({ ...state, answers: newAnswers }));
  };

  useEffect(() => func(questionData, question_id), [questionData]);
  return (
    <div className="flex flex-col gap-3 mx-auto w-full relative">
      <button
        onClick={() => deleteQuestion(question_id)}
        type="button"
        className="text-2xl w-9 rounded-xl h-9 absolute right-4 top-4 transition text-purple-950 hover:bg-purple-950 hover:text-white">X
      </button>
      <div className="container">
        <h3 className="text-base text-purple-950 font-bold my-4">
          Choose type of question
        </h3>
        <div className="flex gap-2">
          <BaseButton
            type="button"
            onClick={() => typeHandler('chose_one')}
            className={cn(typeQ === 'chose_one' ? 'text-white bg-purple-950 px-2 py-1 text-sm' : 'text-purple-950 bg-white px-2 py-1 text-sm')}
          >
            Choose one
          </BaseButton>
          <BaseButton
            type="button"
            onClick={() => typeHandler('chose_many')}
            className={cn(typeQ === 'chose_many' ? 'text-white bg-purple-950 px-2 py-1 text-sm' : 'text-purple-950 bg-white px-2 py-1 text-sm')}
          >
            Choose many
          </BaseButton>
        </div>
      </div>
      <div className="container">
        <BaseInput {...rest} value={questionData.question}
                   error={errors.find(err => err.path.includes('question') && err.path.includes(index))}
                   onChange={onQstHandler} />
      </div>
      <div className="">
        <div>
          {errors.find(err => err.path.join('') === `questions${index}answersisCorrect`) &&
            <span
              className="text-base text-red-600">{errors.find(err => err.path.join('') === `questions${index}answersisCorrect`)?.message}</span>}
          <p className="w-full text-right my-3 text-base text-green-400">Correct</p>
        </div>

        {answers.map(({ label, value, ...rest }, id) => (
          <div key={`${rest.name}-${id}`} className="flex gap-4">
            <BaseInput
              label={`${label} ${id + 1}`}
              onChange={(e) => onAnswerHandler(e, id)}
              defaultValue={value}
              value={questionData.answers[id].answer}
              error={errors.find(err => err.path.join('') === `questions${index}answers${id}answer`)}
              {...rest}
            />
            <div className="flex items-center justify-center">
              <BaseCheckbox
                onChange={(e) => isCorrectHandler(e, id)}
                checked={questionData.answers[id].isCorrect}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
