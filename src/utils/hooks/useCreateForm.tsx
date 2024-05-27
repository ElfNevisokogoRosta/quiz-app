import { FieldValues, Path, useForm, UseFormHandleSubmit } from 'react-hook-form';
import { ReactNode, useEffect } from 'react';
import { QuestionType } from '@/utils/types';
import { IoCheckmarkSharp } from 'react-icons/io5';

function useCreateForm<T extends FieldValues>(
  config: QuestionType[],
): { formElements: ReactNode[], handleSubmit: UseFormHandleSubmit<T>, formState: any } {
  const {
    handleSubmit,
    register,
    formState,
    reset,
  } = useForm<T>();
  useEffect(() => {
    reset();
  }, [config, reset]);
  const formElements = config.map(({ question_id, type, question, answers }, index) => {
    switch (type) {
      case 'chose_one':
        return (
          <fieldset key={question_id} className="flex flex-col gap-4 w-full max-w-[360px] mx-auto">
            <legend className="text-xl font-bold text-purple-950 my-4">{question}</legend>
            <div className="flex flex-col gap-2 flex-shrink-0 w-full max-w-[360px] ">
              {answers.map((answer, id) => (
                <label key={id}
                       className="flex justify-between cursor-pointer items-center px-4 py-3 border rounded-2xl border-purple-950 text-purple-950">
                  <span className="text-wrap max-w-3/4 w-full ">{answer.answer}</span>
                  <input
                    className="visually-hidden peer"
                    type="radio"
                    value={answer.answer}
                    {...register(`answers[${index}]` as Path<T>, { required: true })}
                  />
                  <span
                    className="transition block w-6 h-6 rounded-full bg-purple-950 peer-checked:bg-green-400 peer-checked:border-2 peer-checked:border-purple-950 flex-shrink-0">
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        );
      case 'chose_many':
        return (
          <fieldset key={question_id} className="flex flex-col gap-4 w-full max-w-[360px] mx-auto">
            <legend className="text-xl font-bold text-purple-950 my-4">{question}</legend>
            <div className="flex flex-col gap-2 w-full max-w-[360px]">
              {answers.map((answer, id) => (
                <label key={id}
                       className="flex justify-between cursor-pointer items-center px-4 py-3 border rounded-2xl border-purple-950 text-purple-950">
                  <span className="text-wrap max-w-3/4 w-full">{answer.answer}</span>
                  <input
                    className="visually-hidden peer"
                    type="checkbox"
                    value={answer.answer}
                    {...register(`answers[${index}]` as Path<T>, { required: true })}
                  />
                  <span className="transition block w-6 h-6 bg-purple-950 peer-checked:bg-green-400 text-purple-950">
                    <IoCheckmarkSharp className="w-6 h-6" />
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        );
      default:
        return <fieldset key={question_id}></fieldset>;
    }
  });

  return { formElements, handleSubmit, formState };
}

export default useCreateForm;
