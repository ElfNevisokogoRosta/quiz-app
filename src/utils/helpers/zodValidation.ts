import { ZodSchema } from 'zod';

const zodValidation = (schema: ZodSchema, obj: unknown) => {
  return schema.parse(obj);
};

export default zodValidation;