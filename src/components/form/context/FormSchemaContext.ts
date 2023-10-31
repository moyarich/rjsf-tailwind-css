import React, { FC, createContext, useContext, useReducer, ReactNode } from 'react';
import { ErrorSchema, RJSFSchema, RegistryFieldsType, UiSchema } from "@rjsf/utils";

export interface FormSchema {
  schema: RJSFSchema;
  uiSchema: UiSchema;
  formData: unknown;
}

type Action =
  | { type: 'UPDATE_SCHEMA'; payload: RJSFSchema }
  | { type: 'UPDATE_UISCHEMA'; payload: UiSchema }
  | { type: 'UPDATE_FORMDATA'; payload: unknown };

// Create a context with a factory function for the default value
const createDefaultContextValue = () => ({
  formSchema: initialState,
  updateSchema: (newSchema: RJSFSchema) => {},
  updateUiSchema: (newUiSchema: UiSchema) => {},
  updateFormData: (newFormData: unknown) => {},
});

const FormSchemaContext = createContext(createDefaultContextValue());

// Define the initial state
const initialState: FormSchema = {
  schema: {} as RJSFSchema,
  uiSchema: {} as UiSchema,
  formData: {},
};

// Create a provider component
interface FormSchemaProviderProps {
  children: ReactNode;
}
export const FormSchemaProvider = ({ children }: FormSchemaProviderProps) => {


// Define the reducer function
const reducer = (state: FormSchema, action: Action): FormSchema => {
  switch (action.type) {
    case 'UPDATE_SCHEMA':
      return { ...state, schema: action.payload };
    case 'UPDATE_UISCHEMA':
      return { ...state, uiSchema: action.payload };
    case 'UPDATE_FORMDATA':
      return { ...state, formData: action.payload };
    default:
      return state;
  }
}

  const [formSchema, dispatch] = useReducer(reducer, initialState);

  const updateSchema = (newSchema: RJSFSchema) => {
    dispatch({ type: 'UPDATE_SCHEMA', payload: newSchema });
  };

  const updateUiSchema = (newUiSchema: UiSchema) => {
    dispatch({ type: 'UPDATE_UISCHEMA', payload: newUiSchema });
  };

  const updateFormData = (newFormData: unknown) => {
    dispatch({ type: 'UPDATE_FORMDATA', payload: newFormData });
  };

  return (
    <FormSchemaContext.Provider
      value={{
        formSchema,
        updateSchema,
        updateUiSchema,
        updateFormData
      }}
    >
      {children}
    </FormSchemaContext.Provider>
  );
}

export function useFormSchemaContext() {
  return useContext(FormSchemaContext);
}
