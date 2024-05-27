import { useNavigate } from 'react-router-dom';
import { useQuizContext } from '@/context/QuizContext.tsx';
import { IoSettingsOutline } from 'react-icons/io5';

const QuizList = () => {
  const { quizzes } = useQuizContext();
  const navigate = useNavigate();
  return (
    <div className="w-1/4 ">
      <p className="text-2xl text-purple-950 font-semibold text-center border-b border-purple-950 py-3">Quiz list</p>
      <ul>
        {quizzes && quizzes.map((quiz) => (
          <div key={quiz.quizTitle} className="flex justify-between items-center ">
            <li
              className="transition min-w-[85%] px-4 py-3 text-start flex justify-between cursor-pointer hover:bg-orange-400 hover:text-white rounded-b-xl text-xl text-purple-500"

              onClick={() => navigate(`/quiz/${quiz.id}`)}
            >
              <span>{quiz.quizTitle}</span>

            </li>
            <button onClick={() => navigate(`/quiz/edit/${quiz.id}`)}
                    className="w-9 h-9 flex-shrink-0 p-2 hover:bg-amber-200 border-purple-950 hover:text-purple-950 rounded transition flex justify-center items-center">
              <IoSettingsOutline />
            </button>
          </div>


        ))}
      </ul>
    </div>
  )
    ;
};

export default QuizList;
