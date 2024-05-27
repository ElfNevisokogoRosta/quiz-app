import { createBrowserRouter } from 'react-router-dom';
import HelloWorldPage from '../pages/HelloWorldPage.tsx';
import QuizLayout from '../layouts/QuizLayout.tsx';
import { QuizCreatePage } from '../pages/QuizCreatePage.tsx';
import QuizPage from '../pages/QuizPage.tsx';
import { QuizProvider } from '@/context/QuizContext.tsx';
import QuizEditPage from '@/pages/QuizEditPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <QuizProvider>
      <HelloWorldPage />
    </QuizProvider>,
  },
  {
    path: '/quiz',
    element: <QuizProvider>
      <QuizLayout />
    </QuizProvider>,
    children: [
      {
        index: true,
        element: <QuizPage />,
      },
      { path: ':quizId', element: <QuizPage /> },
      { path: 'create', element: <QuizCreatePage /> },
      { path: 'edit/:quizId', element: <QuizEditPage /> },
    ],
  },
]);
export default router;
