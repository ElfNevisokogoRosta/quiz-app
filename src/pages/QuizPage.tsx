import QuizElement from '../components/Quiz/QuizElement';
import QuizList from '../components/Quiz/QuizList';

const QuizPage = () => {
  return (
    <div className="w-full flex gap-4">
      <QuizList />
      <QuizElement />
    </div>
  );
};

export default QuizPage;
