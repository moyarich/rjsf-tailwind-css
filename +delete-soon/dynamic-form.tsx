'use client';

import {
  RJSFSchema,
  RJSFValidationError,
  RegistryFieldsType,
  UiSchema,
} from '@rjsf/utils';
import Form, { IChangeEvent, FormProps } from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';

import ThemeForm from './radix-ui-theme';

interface Props<TFormData> extends FormProps<TFormData> {}

export function DynamicForm<TFormData extends object>(props: Props<TFormData>) {
  return (
    <>
      <ThemeForm {...{ ...props, validator: validator }} />

      {/* 
     <Form {...{ ...props, validator: validator }} />
        */}
    </>
  );
}
