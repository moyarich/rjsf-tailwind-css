import React, { useCallback, useState } from 'react';

import { ErrorSchema, RJSFSchema, UiSchema, ValidatorType } from '@rjsf/utils';
import { IChangeEvent, FormProps } from '@rjsf/core';

import isEqualWith from 'lodash/isEqualWith';
import Editor from './editor';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FormBuilder } from '@ginkgo-bioworks/react-json-schema-form-builder';

import ThemeForm from '../theme';

const toJson = (val: unknown) => JSON.stringify(val ?? {}, null, 2);

interface EditorsProps {
  schema: RJSFSchema;
  setSchema: React.Dispatch<React.SetStateAction<RJSFSchema>>;
  uiSchema: UiSchema;
  setUiSchema: React.Dispatch<React.SetStateAction<UiSchema>>;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  validator: ValidatorType;
  extraErrors: ErrorSchema | undefined;
  setExtraErrors: React.Dispatch<React.SetStateAction<ErrorSchema | undefined>>;
  onFormDataChange?: (form: IChangeEvent<any, any, any>, id?: string) => void;
  onFormDataSubmit?: (
    form: IChangeEvent<any, any, any>,
    event: React.FormEvent<any>
  ) => void;
  formPreviewActive?: boolean;
}

export default function Editors({
  extraErrors,
  setExtraErrors,
  setFormData,
  schema,
  setSchema,
  uiSchema,
  setUiSchema,
  formData,
  validator,
  formPreviewActive,
  onFormDataChange,
  onFormDataSubmit,
}: EditorsProps) {
  const [updatedSchema, setUpdatedSchema] = useState<RJSFSchema>(schema);
  const [updatedUiSchema, setUpdatedUiSchema] = useState<UiSchema>(uiSchema);

  //-------------------
  //-------------------
  const onFormBuilderChange = useCallback(
    (newSchema: string, newUiSchema: string) => {
      setSchema(JSON.parse(newSchema));
      setUiSchema(JSON.parse(newUiSchema));
    }
  );
  const FormBuilderGuiEditor = () => {
    return (
      <FormBuilder
        className="schema-form-builder m-2"
        schema={JSON.stringify(updatedSchema)}
        uischema={JSON.stringify(updatedUiSchema)}
        onChange={onFormBuilderChange}
      />
    );
  };

  //-------------------
  //-------------------
  /**
   * FormPreview
   */
  const _onFormDataChange = useCallback(
    (form: IChangeEvent<any>, id: string | undefined) => {
      onFormDataChange && onFormDataChange(form, id);
    }
  );

  const _onFormDataSubmit = useCallback(
    (form: IChangeEvent<any, any, any>, event: React.FormEvent<any>) => {
      onFormDataSubmit && onFormDataSubmit(form, event);
    }
  );

  const FormPreview = () => {
    return (
      <ThemeForm
        schema={schema}
        uiSchema={uiSchema}
        formData={formData}
        onChange={_onFormDataChange}
        onSubmit={_onFormDataSubmit}
        validator={validator}
      />
    );
  };

  //-------------------
  //-------------------
  /**
   * Schema
   */
  const onSchemaEdited = useCallback((newSchema: RJSFSchema) => {
    setSchema(newSchema);
  });
  const SchemaEditor = () => {
    return (
      <Editor
        title="JSONSchema"
        code={toJson(schema)}
        onSave={(code: string) => {
          const codeObject = JSON.parse(code);
          onSchemaEdited(codeObject);
        }}
      />
    );
  };

  //-------------------
  //-------------------
  /**
   * UI Schema
   */
  const onUISchemaEdited = useCallback(
    (newUiSchema: UiSchema) => {
      setUiSchema(newUiSchema);
    },
    [setUiSchema]
  );

  const UISchemaEditor = () => {
    return (
      <Editor
        title="UISchema"
        code={toJson(uiSchema)}
        onSave={(code: string) => {
          const codeObject = JSON.parse(code);
          onUISchemaEdited(codeObject);
        }}
      />
    );
  };

  //-------------------
  //-------------------
  /**
   * FormData
   */

  const onFormDataEdited = useCallback(
    (newFormData: any) => {
      if (
        !isEqualWith(newFormData, formData, (newValue, oldValue) => {
          // The editor uses JSON.stringify to remove undefined values. So, compare the values and use JSON.stringify to check if the trimmed formData is identical to the untrimmed formData.
          return JSON.stringify(oldValue) === JSON.stringify(newValue);
        })
      ) {
        setFormData(newFormData);
      }
    },
    [formData, setFormData]
  );

  const FormDataEditor = () => {
    return (
      <Editor
        title="formData"
        code={toJson(formData)}
        onSave={(code: string) => {
          const codeObject = JSON.parse(code);
          onFormDataEdited(codeObject);
        }}
      />
    );
  };

  //-------------------
  //-------------------
  /**
   * Extra Errors
   */

  const onExtraErrorsEdited = useCallback(
    (newExtraErrors: ErrorSchema | undefined) => {
      setExtraErrors(newExtraErrors);
    },
    [setExtraErrors]
  );
  const ExtraErrorsEditorEditor = () => {
    return (
      <Editor
        title="extraErrors"
        code={toJson(extraErrors || {})}
        onSave={(code: string) => {
          const codeObject = JSON.parse(code);
          onExtraErrorsEdited(codeObject);
        }}
      />
    );
  };

  return (
    <>
      <Tabs defaultValue="source">
        <TabsList className="w-full justify-start inline-flex h-9 items-center rounded-lg bg-muted p-1 text-muted-foreground">
          <TabsTrigger value="source">Source</TabsTrigger>
          <TabsTrigger value="formDesigner">Form Designer</TabsTrigger>
        </TabsList>
        <div className="flex gap-[15px] mb-6">
          <div className="flex-1">
            <TabsContent value="source">
              <Tabs defaultValue="schema">
                <TabsList className="h-[25px]">
                  <TabsTrigger value="schema">Schema</TabsTrigger>
                  <TabsTrigger value="uiSchema">UiSchema</TabsTrigger>
                  <TabsTrigger value="formData">FormData</TabsTrigger>

                  {extraErrors && (
                    <TabsTrigger value="extraErrors">FormData</TabsTrigger>
                  )}
                </TabsList>
                <div className="nested-tab-contents mt-3 h-[500px] border-1 pb-2 overflow-hidden rounded-md resize">
                  <TabsContent value="schema" className="h-full">
                    <SchemaEditor />
                  </TabsContent>

                  <TabsContent value="uiSchema" className="h-full">
                    <UISchemaEditor />
                  </TabsContent>

                  <TabsContent value="formData" className="h-full">
                    <FormDataEditor />
                  </TabsContent>

                  {extraErrors && (
                    <TabsContent value="extraErrors" className="h-full">
                      <ExtraErrorsEditorEditor />
                    </TabsContent>
                  )}
                </div>
              </Tabs>
            </TabsContent>
            <TabsContent value="formDesigner">
              <div className="flex-1 mt-[49px]">
                <FormBuilderGuiEditor />
              </div>
            </TabsContent>
          </div>
          <div className="mt-[49px] flex-1 border rounded-md overflow-hidden resize py-4 px-6 h-full">
            <FormPreview />
          </div>
        </div>
      </Tabs>
    </>
  );
}
