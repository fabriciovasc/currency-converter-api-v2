import type { NumberSchema } from 'joi';
import Joi from 'joi';

interface ValidationConfig {
  PORT: NumberSchema;
}

const validationConfig: ValidationConfig = {
  PORT: Joi.number().required().default(8090),
};

export default validationConfig;
