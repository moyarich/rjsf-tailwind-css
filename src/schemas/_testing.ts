import { RJSFSchema, UiSchema } from '@rjsf/utils';

export const schema: RJSFSchema = {
  type: 'object',
  properties: { type: 'string' },
  additionalProperties: { type: 'number' },
};

export const uiSchema: UiSchema = {
  // Customize the UI schema as needed to control the form's appearance
};

export const formData = {};
