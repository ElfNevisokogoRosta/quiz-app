import { FC } from 'react';
import { QuestionType } from '@/utils/types';
import useCreateForm from '@/utils/hooks/useCreateForm';

import FormSlider from '@/components/Form/FormSlider.tsx';

interface QuizFormProps {
  questions?: QuestionType[];
  func: (data: string[]) => void;
}

type FormField = {
  answers: string[];
};
const QuizForm: FC<QuizFormProps> = ({ questions, func }) => {


  const { formElements, handleSubmit, formState } = useCreateForm<FormField>(questions!);
  const onSubmit = (data: FormField) => {
    func(data.answers);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSlider slides={formElements} errors={formState.errors} />
      </form>
    </div>
  );
};

export default QuizForm;
