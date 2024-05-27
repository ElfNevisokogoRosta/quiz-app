import { useNavigate, useParams } from 'react-router-dom';
import QuizForm from '@/components/Form/QuizForm.tsx';
import { useEffect, useState } from 'react';
import QuizResults from '@/components/Quiz/QuizResults.tsx';
import BaseButton from '@/ui/BaseButton.tsx';
import { Bars } from 'react-loader-spinner';
import { useQuizContext } from '@/context/QuizContext.tsx';

const QuizElement = () => {
  const { deleteQuiz, isLoading, error, quizzes } = useQuizContext();
  const navigate = useNavigate();
  const [quizResults, setQuizResults] = useState<string[] | undefined>();
  const params = useParams();
  const quizElement = quizzes && quizzes.find(
    (quiz) => quiz.id === params?.quizId || '',
  );
  const onQuizComplete = (data: string[]) => {
    setQuizResults(data);
  };
  const handleDeleteQuiz = async () => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      try {
        await deleteQuiz(params?.quizId || '-1');
        navigate('/quiz');
      } catch (e) {
        console.log(e);
      }
      setQuizResults(undefined);
    }
  };
  useEffect(() => {
    setQuizResults(undefined);
  }, [params]);
  return (
    <div className="w-full h-full">
      {error &&
        <div className="text-red-500 fixed top-0 left-0 flex items-center justify-center font-extrabold text-3xl">
          {error}
        </div>}
      {isLoading && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-amber-200  flex items-center justify-center">
          <Bars
            height="380"
            width="380"
            color="#4fa94d"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>)}
      {quizResults ? (<>
          <QuizResults
            quizTitle={quizElement?.quizTitle}
            quizResults={quizResults}
            questions={quizElement?.questions}
          />
          <div className="flex flex-col gap-3 mt-6">
            <p className="text-base text-purple-950">To start new u can chose in list or press that button to start
              again same quiz</p>
            <BaseButton onClick={() => setQuizResults(undefined)}>Start again</BaseButton></div>
        </>
      ) : (<>{!params.quizId ? (
        <div className="text-center text-purple-950 text-2xl font-extrabold">Choose a quiz</div>
      ) : (
        <div className="flex flex-col h-full gap-6">
          <div className="flex gap-2 justify-between items-center">
            <div className="flex justify-self-start items-center">
              <p
                className="max-w-fit text-2xl text-purple-950 font-bold">{quizElement?.quizTitle}</p>
              <p className="max-w-fit text-2xl text-purple-950 font-bold">
                got {quizElement?.questions.length} questions
              </p>
            </div>
            <BaseButton onClick={handleDeleteQuiz}>Delete this quiz</BaseButton>
          </div>
          <div>
            {quizElement && quizElement?.questions.length !== 0 &&
              <QuizForm questions={quizElement?.questions} func={onQuizComplete} />}
          </div>
        </div>
      )}</>)}

    </div>
  );
};

export default QuizElement;
