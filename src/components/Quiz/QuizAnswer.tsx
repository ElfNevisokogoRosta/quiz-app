import { FC } from 'react';
import { AnswersType, QuestionSet } from '@/utils/types';

interface QuizAnswerProps {
  type: QuestionSet,
  answers: AnswersType[],
  userAnswers?: string[] | string,
  question?: string,
}

const QuizAnswer: FC<QuizAnswerProps> = ({ userAnswers, answers, type, question }) => {
  const correctAnswers = answers?.filter(answ => answ.isCorrect)?.map(answ => answ.answer) || [];
  const isCorrectAnswers = (userArr: string[], answersArr: string[]) => {
    if (userArr.length !== answersArr.length) {
      return 0;
    }
    for (let i = 0; i < userArr.length; i++) {
      if (userArr[i] !== answersArr[i]) {
        return 0;
      }
    }
    return 1;
  };

  switch (type) {
    case 'chose_many':
      return <div className="flex flex-col gap-2">
        <p className="text-xl text-purple-950 font-bold">{question}</p>
        <p className="flex gap-1 text-purple-950"><span className="min-w-fit">Correct answers:</span>
          <ul
            className="flex gap-1 flex-col list-disc ml-6">{correctAnswers.map(answ =>
            <li>{answ}</li>)}</ul>
        </p>
        <p className="flex gap-1 text-purple-950"><span className="min-w-fit">Your answers:</span>
          <ul className="flex gap-1 flex-col ml-6 list-disc"> {Array.isArray(userAnswers) ? userAnswers?.map(answ =>
            <li>{answ}</li>) : ('')}</ul>
        </p>
        <p
          className="text-base text-purple-950 font-bold">Receive: {userAnswers && isCorrectAnswers(correctAnswers, userAnswers as string[])}</p>
      </div>;
    case 'chose_one':
      return <div className="flex flex-col gap-2">
        <p className="text-xl text-purple-950 font-bold">{question}</p>
        <p className="flex gap-1 text-purple-950"><span className="min-w-fit">Correct answers:</span>
          <div
            className="flex gap-1">{correctAnswers[0]}</div>
        </p>
        <p className="flex gap-1 text-purple-950"><span className="min-w-fit">Your answers:</span>
          <div className="flex gap-1">{userAnswers}</div>
        </p>
        <p className="text-base text-purple-950 font-bold">Receive: {correctAnswers[0] === userAnswers ?
          <span>1</span> :
          <span>0</span>} </p>
      </div>;
    default:
      return <></>;
  }
};

export default QuizAnswer;
