import { FC, useEffect, useState } from 'react';
import { QuestionType } from '@/utils/types';
import QuizAnswer from '@/components/Quiz/QuizAnswer.tsx';

interface QuizResultsProps {
  questions?: QuestionType[];
  quizResults?: string[];
  quizTitle?: string;
}

const QuizResults: FC<QuizResultsProps> = ({ questions, quizResults, quizTitle }) => {
  const [score, setScore] = useState<number>(0);
  useEffect(() => {
    if (questions && quizResults) {
      let newScore = 0;
      questions.forEach((qst, index) => {
        const correctAnswer = qst.answers.find(answ => answ.isCorrect)?.answer || '';
        const userAnswer = quizResults[index];
        if (correctAnswer === userAnswer) {
          newScore += 1;
        }
      });
      setScore(newScore);
    }
  }, [questions, quizResults]);
  return (
    <div>
      <p className="text-2xl text-purple-950 font-bold my-4">Thanks for completing {quizTitle}</p>
      <p className="text-xl text-purple-950 font-bold my-2">Your score is: <span>{score}</span></p>
      <div className="flex flex-col gap-4">
        {questions && quizResults && questions.map((qst, index) =>
          <QuizAnswer
            key={qst.question_id}
            type={qst.type}
            answers={qst.answers}
            userAnswers={quizResults[index]}
            question={qst.question}
          />,
        )}
      </div>

    </div>
  );
};

export default QuizResults;
