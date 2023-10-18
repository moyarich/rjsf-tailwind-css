'use client';

import { FieldProps } from '@rjsf/utils';
import React, { useCallback } from 'react';

import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

export type InputProps = React.HTMLProps<HTMLInputElement>;

export const TextField = ({
  id,
  name,
  uiSchema,
  formData,
  disabled,
  schema,
  onChange,
}: FieldProps<string>) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  const inputProps = {
    id,
    name,
    value: formData || '',
    placeholder: uiSchema?.['ui:placeholder'],
    disabled,
    onChange: handleChange,
  };

  let inputType = 'text';

  switch (schema.type) {
    case 'number':
      inputType = 'number';
      break;
    case 'string':
      inputType = 'text';
      break;
    default:
      inputType = 'text';
  }

  return uiSchema?.['ui:widget'] === 'textarea' ? (
    <Textarea {...inputProps} />
  ) : (
    <Input
      {...inputProps}
      type={schema.type === 'number' ? 'number' : 'text'}
    />
  );
};
