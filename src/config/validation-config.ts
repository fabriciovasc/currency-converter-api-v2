import type { NumberSchema, ObjectSchema } from 'joi';
import * as Joi from 'joi';

interface ValidationConfig {
  PORT: NumberSchema;
}

const validationConfig: ObjectSchema<ValidationConfig> = Joi.object({
  PORT: Joi.number().required().default(8090),
});

export default validationConfig;
