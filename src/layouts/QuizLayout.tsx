import { Header } from '@/components/Header/Header';
import { Outlet } from 'react-router-dom';
import { useQuizContext } from '@/context/QuizContext.tsx';
import { useEffect } from 'react';

const QuizLayout = () => {
  const { loadQuizzes } = useQuizContext();
  useEffect(() => {
    const initQuizz = async () => {
      return await loadQuizzes();
    };
    initQuizz();
  }, []);
  return (
    <div>
      <Header />
      <div className="container flex">
        <Outlet />
      </div>
    </div>
  );
};

export default QuizLayout;
