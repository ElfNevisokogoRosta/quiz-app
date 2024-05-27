import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import useLocalStorage from '@/utils/hooks/useLocalStorage.tsx';
import quizList from '@/mock/simple_quiz.json';

const HelloWorldPage = () => {
  const { getItem, setItem } = useLocalStorage();

  useEffect(() => {
    const quiz = getItem('quiz');
    if (!quiz) {
      setItem('quiz', quizList);
    }
  }, []);
  return (
    <>
      <div className="flex flex-col min-h-screen bg-purple-200">
        <header className="py-3">
          <div className="container">
            <h1 className="text-2xl font-extrabold text-purple-950 text-center">
              Simple quiz
            </h1>
          </div>
        </header>
        <section>
          <div className="container flex justify-between items-center ">
            <p className="text-xl font-bold text-purple-950 text-center w-full mt-10 underline">
              This is simple info about simple quiz app, nothing more
            </p>
          </div>
        </section>

        <div className="container flex items-center justify-center gap-6 mt-[200px]">
          <NavLink
            className="text-2xl font-bold text-purple-950 border border-yellow-500 rounded-2xl hover:bg-purple-950 hover:text-white transition px-4 py-3"
            to={'/quiz/create'}
          >
            Create some quiz
          </NavLink>
          <NavLink
            className="text-2xl font-bold text-purple-950 border border-yellow-500 rounded-2xl hover:bg-purple-950 hover:text-white transition px-4 py-3"
            to={'/quiz'}
          >
            Get some quiz
          </NavLink>
        </div>
        <footer className="mt-auto">
          <div className="container">
            <p className="text-2xl font-bold text-purple-950 my-5">
              Simple quiz
            </p>
            <p className="text-base font-normal text-purple-950 mb-5">
              Simple quiz created with next technologies: React, TypeScript,
              React-hook-form, Zod, ESLint, Tailwind, Vite{' '}
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HelloWorldPage;
