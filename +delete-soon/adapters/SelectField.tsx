'use client';

import React from 'react';

import { FieldProps } from '@rjsf/utils';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const SelectField = ({
  id,
  onChange,
  schema,
  formData,
  uiSchema,
  disabled,
}: FieldProps<string>) => {
  return (
    <Select value={formData} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={uiSchema?.['ui:placeholder']} />
      </SelectTrigger>
      <SelectContent>
        {schema.oneOf?.map(
          (item: { title: string; const: string }, index: number) => (
            <SelectItem key={index} value={item?.const}>
              {item?.title}
            </SelectItem>
          )
        )}
      </SelectContent>
    </Select>
  );
};
