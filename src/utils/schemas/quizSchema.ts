import { z } from 'zod';

const answerSchema = z.object({
  answer: z.string({ required_error: 'This field is required' }).min(1, { message: 'This field is required' }),
  isCorrect: z.boolean(),
});

const quizSchema = z.object({
  id: z.string(),
  quizTitle: z.string({ required_error: 'This field is required' }).min(1, { message: 'This field is required' }),
  questions: z.array(z.object({
    question_id: z.string(),
    question: z.string({ required_error: 'This field is required' }).min(1, { message: 'This field is required' }),
    type: z.string(),
    answers: z.array(answerSchema).nonempty({ message: 'At least one answer must be chosen as correct' }).refine(data => {
      return data.some(answer => answer.isCorrect);
    }, { message: 'At least one answer must be correct', path: ['isCorrect'] }),
  })),
}).required();

export default quizSchema;
