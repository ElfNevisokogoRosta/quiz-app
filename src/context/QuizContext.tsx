import { createContext, useContext, useState, ReactNode } from 'react';
import useLocalStorage from '@/utils/hooks/useLocalStorage';
import QuizType from '@/utils/types/Quiz.type';
import mockQuizzes from '@/mock/simple_quiz.json';

interface QuizContextType {
  quizzes: QuizType[] | null;
  addQuiz: (quiz: QuizType) => Promise<void>;
  deleteQuiz: (id: string) => Promise<void>;
  editQuiz: (quiz: QuizType) => Promise<void>;
  loadQuizzes: () => Promise<void>;
  isLoading: boolean;
  error: string | boolean;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [quizzes, setQuizzes] = useState<QuizType[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | boolean>(false);
  const { getItem, setItem } = useLocalStorage();
  const simulateDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const loadQuizzes = async () => {
    setIsLoading(true);
    try {
      await simulateDelay(500);
      const storedQuizzes = getItem('quiz');
      if (storedQuizzes === null) {
        setItem('quiz', mockQuizzes);
        setQuizzes(mockQuizzes as QuizType[]);
        return setIsLoading(false);
      }
      setQuizzes(storedQuizzes as QuizType[] | null);
      setIsLoading(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
      setIsLoading(false);
    }
  };

  const addQuiz = async (quiz: QuizType) => {
    setIsLoading(true);
    try {
      await simulateDelay(500);
      const storedQuizzes = getItem('quiz') as QuizType[] | null;
      const updatedQuizzes = storedQuizzes ? [...storedQuizzes, quiz] : [quiz];
      setItem('quiz', updatedQuizzes);
      setQuizzes(updatedQuizzes);
      setIsLoading(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unexpected error occurred');
      setIsLoading(false);
    }
  };

  const deleteQuiz = async (id: string) => {
    setIsLoading(true);
    try {
      await simulateDelay(500);
      const storedQuizzes = getItem('quiz') as QuizType[] | null;
      if (!storedQuizzes) {
        throw new Error('Quiz list is not available');
      }
      const updatedQuizzes = storedQuizzes.filter((quiz) => quiz.id !== id);
      setItem('quiz', updatedQuizzes);
      setQuizzes(updatedQuizzes);
      setIsLoading(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
      setIsLoading(false);
    }
  };

  const editQuiz = async (updatedQuiz: QuizType) => {
    setIsLoading(true);
    try {
      await simulateDelay(500);
      const storedQuizzes = getItem('quiz') as QuizType[] | null;
      if (!storedQuizzes) {
        throw new Error('Quiz list is not available');
      }
      const updatedQuizzes = storedQuizzes.map((quiz) =>
        quiz.id === updatedQuiz.id ? updatedQuiz : quiz,
      );
      setItem('quiz', updatedQuizzes);
      setQuizzes(updatedQuizzes);
      setIsLoading(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
      setIsLoading(false);
    }
  };

  return (
    <QuizContext.Provider value={{ quizzes, addQuiz, deleteQuiz, editQuiz, isLoading, error, loadQuizzes }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuizContext must be used within a QuizProvider');
  }
  return context;
};
