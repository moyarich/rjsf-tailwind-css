import { RJSFSchema, UiSchema } from '@rjsf/utils';

export const schema: RJSFSchema = {
  title: 'A registration form',
  description: 'Moya custom SHADCN/Radix RJSF theme',
  type: 'object',
  required: ['firstName', 'lastName'],
  properties: {
    rating: {
      type: 'integer',
      minimum: 0,
      maximum: 5,
    },
    age: {
      type: 'integer',
      title: 'Age',
      minLength: 10,
    },
    price: {
      title: 'Price per task ($)',
      type: 'number',
      multipleOf: 0.03,
      minimum: 1,
    },
    fruits: { type: 'array', items: { type: 'string' } },
    comments: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          date: {
            type: 'string',
            format: 'date',
          },
          message: {
            type: 'string',
            maxLength: 5,
          } /*
          tags: {
            type: 'string',
            enum: ['foo', 'bar'],
          },*/,
        },
      },
    },
    firstName: {
      type: 'string',
      title: 'First name',
      default: 'Chuck',
    },
    lastName: {
      type: 'string',
      title: 'Last name',
    },
    password: {
      type: 'string',
      title: 'Password',
    },
    description: {
      type: 'string',
      title: 'Description',
      minLength: 10,
    },
    telephone: {
      type: 'string',
      title: 'Telephone',
      minLength: 10,
    },
    createdAt: {
      format: 'date-time',
      title: 'Created At',
      type: 'string',
    },
    modifiedTime: {
      format: 'time',
      title: 'Modified Time',
      type: 'string',
    },

    awsCertified: {
      title: 'awsCertified',
      type: 'boolean',
      default: true,
    },
    /*
    emotions: {
      enum: ['sad', 'happy', 'afraid'],
      title: 'Emotions',
      type: 'string',
    },
    location: {
      enum: ['s-12', 's-45', 's-23'],
      title: 'Location',
      type: 'string',
      enumNames: ['S12', 'S45', 'S23'],
    },
    subscriptionYears: {
      title: 'subscriptionYears',
      type: 'string',
      anyOf: [
        {
          type: 'number',
          title: 'one',
          enum: [1],
        },
        {
          type: 'number',
          title: 'two',
          enum: [2],
        },
        {
          type: 'number',
          title: 'three',
          enum: [3],
        },
      ],
    },
    */
  },
};
export const uiSchema: UiSchema = {
  password: {
    'ui:widget': 'password',
  },
  description: {
    'ui:widget': 'textarea',
  },
  emotions: {
    'ui:widget': 'radio',
  },
};

export const formData = {};
