'use client';
import { FieldTemplateProps } from '@rjsf/utils';
import React, { useMemo } from 'react';
import { useWarnings } from '../warnings.context';

import clsx from 'clsx';
import { Label } from '../../ui/label';

interface ErrorMessageProps {
  text: string;
  className?: string;
}

export const ErrorMessage = ({ text, className }: ErrorMessageProps) => {
  return (
    <div className={clsx('text-destructive text-[0.8rem]', className)}>
      {text}
    </div>
  );
};

interface ErrorsListProps {
  errors: string[];
  type?: 'error' | 'warning';
  className?: string;
}

export const ErrorsList = ({
  errors,
  type = 'error',
  className,
}: ErrorsListProps) => {
  return (
    <ul className={clsx('pl-2', className)}>
      {errors.map((error, index) => (
        <li key={`error-list-item-${index}`}>
          <ErrorMessage
            text={error}
            className={type === 'warning' ? 'text-amber-400' : undefined}
          />
        </li>
      ))}
    </ul>
  );
};

export const GlobalFieldTemplate = ({
  id,
  label,
  children,
  displayLabel,
  rawErrors,
  description,
  uiSchema,
  required,
}: FieldTemplateProps) => {
  const { fieldWarnings } = useWarnings(id);

  const isLabelEnabled = displayLabel || (uiSchema && uiSchema['ui:label']);

  // Removing error duplicates for oneOf validation
  const errors = useMemo(() => Array.from(new Set(rawErrors)), [rawErrors]);

  return (
    <div className={`flex flex-col gap-2 py-1 field-wrapper-${id}`}>
      {isLabelEnabled ? (
        <Label htmlFor={id}>
          {label}
          {required ? (
            <span className="text-red-600">{' * '}</span>
          ) : (
            <span className="opacity-50">{' (optional) '}</span>
          )}
        </Label>
      ) : null}
      {children}
      {rawErrors ? <ErrorsList errors={errors} /> : null}
      {fieldWarnings ? (
        <ErrorsList
          errors={
            Array.isArray(fieldWarnings) ? fieldWarnings : [fieldWarnings]
          }
          type="warning"
        />
      ) : null}
      {id !== 'root' && (
        <div className="font-inter text-muted-foreground text-sm">
          {description}
        </div>
      )}
    </div>
  );
};
