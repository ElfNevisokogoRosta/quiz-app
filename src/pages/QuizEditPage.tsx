import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import BaseInput from '@/ui/BaseInput.tsx';
import { QuestionSet, QuestionType, Quiz } from '@/utils/types';
import BaseButton from '@/ui/BaseButton.tsx';
import { generateNewField, generateQuizEditConfig, zodValidation } from '@/utils/helpers';
import { quizSchema } from '@/utils/schemas';
import { ZodIssue } from 'zod';
import { useQuizContext } from '@/context/QuizContext.tsx';
import { Bars } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import QuizEditQuestion from '@/components/Form/QuizEditQuestion.tsx';

interface FormConfigType {
  question_id: string;
  name: string;
  type: string;
  label: string;
  value: string;
  qst_type: QuestionSet;
  answers: { name: string; type: string; label: string, value: string, isCorrect: boolean }[];
}


const QuizEditPage = () => {
  const { editQuiz, isLoading, error, quizzes } = useQuizContext();
  const params = useParams();
  const quizElement = quizzes && quizzes.find((quiz) => quiz.id === params?.quizId || '');
  const [deleteError, setDeleteError] = useState<boolean | string>(false);
  const [errors, setErrors] = useState<{ path: string & number[], message: string }[]>([]);
  const [editConfig, setEditConfig] = useState<FormConfigType[]>([]);
  const [quizData, setQuizData] = useState<Quiz>({
    id: '',
    quizTitle: '',
    questions: [],
  });
  useEffect(() => {
    if (quizElement === null) {
      return;
    }
    setQuizData(state => ({
      ...state,
      id: quizElement?.id || '',
      quizTitle: quizElement?.quizTitle || '',
      questions: quizElement?.questions || [],
    }));
    if (quizElement?.questions) {
      setEditConfig(generateQuizEditConfig(quizElement.questions!));
    }
  }, [quizElement]);

  const quizDataHandler = (question: QuestionType, question_id: string) => {
    setQuizData((state) => {
      const existingQuestion = state.questions.find((qst) => qst.question_id === question_id);
      if (existingQuestion) {
        const filteredQuestions = state.questions.filter((qst) => qst.question_id !== question_id);
        return { ...state, questions: [...filteredQuestions, question] };
      } else {
        return { ...state, questions: [...state.questions, question] };
      }
    });
  };
  const handleConfigChange = () => {
    setDeleteError(false);
    setEditConfig((state) => [...state, generateNewField(crypto.randomUUID())]);
  };
  const quizTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQuizData((state) => ({ ...state, quizTitle: e.target.value }));
  };
  const deleteQuestion = (id: string) => {
    if (setEditConfig.length === 1) {
      return setDeleteError('Must be at least 1 question');
    }
    const isElement = editConfig.find((qst) => qst.question_id === id);
    if (!isElement) return setDeleteError('Somethisn went wrong');
    setEditConfig(state => {
      const elements = state.filter((qst) => qst.question_id !== id);
      return [...elements];
    });
  };
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = zodValidation(quizSchema, quizData);
      await editQuiz(formData);
      setQuizData({ id: crypto.randomUUID(), quizTitle: '', questions: [] });
    } catch (err: any) {
      setErrors(JSON.parse(err.message).map((error: ZodIssue) => ({
        path: error?.path,
        message: error?.message,
      })));
    }
  };
  return (
    <div className="flex flex-col mx-auto">
      {isLoading &&
        <div className="fixed top-0 left-0 bg-amber-100 w-screen h-screen flex items-center justify-center  z-50">
          <Bars
            height="380"
            width="380"
            color="#4fa94d"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>}

      <div className="container">
        <h2 className="text-xl text-purple-950 font-bold my-4">
          Edit quiz: {quizElement?.quizTitle}
        </h2>
      </div>
      <div className="container flex flex-col gap-2 max-w-[560px] mb-6">
        <form onSubmit={submitHandler}>
          <BaseInput
            name="quizTitle"
            type="text"
            label="Quiz title"
            onChange={quizTitleHandler}
            value={quizData.quizTitle}
            error={errors.find(err => err.path.includes('quizTitle'))}
          />
          {editConfig.map((qst, id) => (
            <QuizEditQuestion
              errors={errors}
              key={`${qst.name} ${id}`}
              question_id={qst.question_id}
              type={qst.qst_type}
              index={id}
              question={qst}
              func={quizDataHandler}
              deleteQuestion={deleteQuestion}
            />
          ))}
          <div className="flex gap-2 mt-6">
            <BaseButton type="button" disabled={isLoading} onClick={handleConfigChange}>
              Add more question
            </BaseButton>
            <BaseButton type="submit" disabled={isLoading}>Save quiz</BaseButton>
          </div>
        </form>

        {error && (<p>{error}</p>)}
        {deleteError && (<p className="text-red-600 text-2xl font-extrabold text-center">{deleteError}</p>)}
      </div>
    </div>
  );
};

export default QuizEditPage;
