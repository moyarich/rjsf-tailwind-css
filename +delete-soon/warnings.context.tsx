'use client';

import { createContext, useContext, useMemo } from 'react';
import get from 'lodash/get';

export type InputName = string;

export type InputWarning = string | string[];

export interface InputsWarnings {
  [k: InputName]: InputWarning | InputsWarnings;
}

export interface IWarningsContext {
  warnings?: InputsWarnings;
}

export const WarningsContext = createContext({} as IWarningsContext);

export const convertFieldIdToObjectPath = (id: string) => {
  return id.replace('root_', '').replaceAll('_', '.');
};

export const useWarnings = (fieldId: string) => {
  const { warnings } = useContext(WarningsContext);

  const fieldWarnings = useMemo(
    () =>
      get(
        warnings,
        convertFieldIdToObjectPath(fieldId),
        null
      ) as InputWarning | null,
    [fieldId, warnings]
  );

  return {
    fieldWarnings,
  };
};
