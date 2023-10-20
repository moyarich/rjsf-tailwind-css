"use client"

import 'rc-dock/dist/rc-dock.css';
import React, { useCallback, useState } from 'react';

import { ErrorSchema, RJSFSchema, UiSchema, ValidatorType,FormContextType } from '@rjsf/utils';
import { IChangeEvent, FormProps } from '@rjsf/core';

import isEqualWith from 'lodash/isEqualWith';

import DockLayout, { DockMode, LayoutData } from 'rc-dock';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import FormBuilderGuiEditor from "./form-builder-gui-editor";
import Editor from './editor';
import ThemeForm from '../theme';

const toJson = (val: unknown) => JSON.stringify(val ?? {}, null, "\t");

interface EditorsProps {
  editorTitle?: string;
  schema: RJSFSchema;
  setSchema: React.Dispatch<React.SetStateAction<RJSFSchema>>;
  uiSchema: UiSchema;
  setUiSchema: React.Dispatch<React.SetStateAction<UiSchema>>;
  formData: unknown;
  setFormData: React.Dispatch<React.SetStateAction<unknown>>;
  validator: ValidatorType;
  extraErrors?: ErrorSchema;
  setExtraErrors?: React.Dispatch<React.SetStateAction<ErrorSchema | undefined>>;
  onFormDataChange?: (form: IChangeEvent<unknown, RJSFSchema, FormContextType>, id?: string) => void;
  onFormDataSubmit?: (
    form: IChangeEvent<unknown, RJSFSchema, FormContextType>,
    event: React.FormEvent<unknown>
  ) => void;
  onTemplateSave?:(schema : RJSFSchema,uiSchema?: UiSchema,formData?:unknown, extraErrors?:ErrorSchema ) => void
}

export default function Editors({
  editorTitle,
  extraErrors,
  setExtraErrors,
  setFormData,
  schema,
  setSchema,
  uiSchema,
  setUiSchema,
  formData,
  validator,
  onFormDataChange,
  onFormDataSubmit,
  onTemplateSave,
}: EditorsProps) {
 


  const _onTemplateSave = () => {
    onTemplateSave && onTemplateSave(schema ,uiSchema,formData, extraErrors)

  }

  //-------------------
  //-------------------
  /**
   * FormPreview
   */
  const _onFormDataChange = (form: IChangeEvent<unknown>, id: string | undefined) => {
      onFormDataChange && onFormDataChange(form, id);
    }


  const _onFormDataSubmit = 
    (form: IChangeEvent<unknown, RJSFSchema, FormContextType>, event: React.FormEvent<unknown>) => {
      onFormDataSubmit && onFormDataSubmit(form, event);
    }


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

  const SchemaEditor = () => {
    return (
      <Editor
        title="JSONSchema"
        code={toJson(schema)}
        onSave={(code: string) => {
          const codeObject = JSON.parse(code);
          setSchema(codeObject);
        }}
      />
    );
  };

  //-------------------
  //-------------------
  /**
   * UI Schema
   */


  const UISchemaEditor = () => {
    return (
      <Editor
        title="UISchema"
        code={toJson(uiSchema)}
        onSave={(code: string) => {
          const codeObject = JSON.parse(code);
          setUiSchema(codeObject);
        }}
      />
    );
  };

  //-------------------
  //-------------------
  /**
   * FormData
   */

  const onFormDataEdited =
    (newFormData: any) => {
      if (
        !isEqualWith(newFormData, formData, (newValue, oldValue) => {
          // The editor uses JSON.stringify to remove undefined values. So, compare the values and use JSON.stringify to check if the trimmed formData is identical to the untrimmed formData.
          return JSON.stringify(oldValue) === JSON.stringify(newValue);
        })
      ) {
        setFormData(newFormData);
      }
    }

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

  const onExtraErrorsEdited = (newExtraErrors?: ErrorSchema) => {
      if(newExtraErrors){
        setExtraErrors && setExtraErrors(newExtraErrors);
      }
    }

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




const defaultLayout = {
  dockbox: {
    mode: 'horizontal' as DockMode, 
      children: [
        {
          tabs: [
            { id: 'tab1', title: 'tab1', content: <div>Hello World</div> },
            { id: 'source', title: 'Source' , content: <div>Hello World</div>},
            { id: 'formDesigner', title: 'Form Designer' , content:   <FormBuilderGuiEditor
            schema={toJson(schema)}
            uiSchema={toJson(uiSchema)}
              onChange={(newSchema: string, newUiSchema: string) => {
                setSchema(JSON.parse(newSchema));
                setUiSchema(JSON.parse(newUiSchema));
              }}
            />},
          ],
        },
        {
          tabs: [
            { id: 'schema', title: 'Schema', content: <SchemaEditor /> },
            { id: 'uiSchema', title: 'UiSchema', content:  <UISchemaEditor /> },
            { id: 'formData', title: 'FormData' , content: <FormDataEditor />},
            { id: 'preview', title: 'Preview' , content: <FormPreview />},
            ...(extraErrors
              ? [{ id: 'extraErrors', title: 'Extra Errors', content: <ExtraErrorsEditorEditor /> }]
              : []),
          ],
        },  
    ],
  },
};





  return (
    <div className="mb-4">
      <div className="header flex pt-2 items-center">
        {/* Header Content */}
      </div>
      <div className="h-screen relative p-1 rounded-tl-md rounded-bl-md rounded-br-md border-4  border-primary border-opacity-10">
      <DockLayout
        defaultLayout={defaultLayout}
        style={{
          position: 'absolute',
          left: 10,
          top: 10,
          right: 10,
          bottom: 10,
        }}
      />
 
      </div>
    </div>
  );
}

  /*
const defaultLayout3: LayoutData = {
  dockbox: {
    mode: 'horizontal' as DockMode,
    children: [
      {
        mode: 'vertical' as DockMode,
        children: [
          {
            tabs: [ { id: 'formDesigner', title: 'Form Designer' , content:   <FormBuilderGuiEditor schema={toJson(schema)} uiSchema={toJson(uiSchema)} onChange={(newSchema: string, newUiSchema: string) => { setSchema(JSON.parse(newSchema)); setUiSchema(JSON.parse(newUiSchema)); }}/>},
          ],
          },
          {
            tabs: [
              { id: 'schema', title: 'Schema', content: <SchemaEditor /> },
              { id: 'uiSchema', title: 'UiSchema', content:  <UISchemaEditor /> },
              ...(extraErrors
                ? [{ id: 'extraErrors', title: 'Extra Errors', content: <ExtraErrorsEditorEditor /> }]
                : []),
            ],
          },
        ],
      },
      {
        mode: 'horizontal' as DockMode,
        children: [
          {
            mode: 'vertical' as DockMode,
            children: [
              {
                tabs: [ { id: 'preview', title: 'Preview' , content: <FormPreview />},
                { id: 'formData', title: 'FormData' , content: <FormDataEditor />},
              ],
              },
            ],
          },
        ],
      },
    ],
  },
};



const defaultLayout = {
  dockbox: {
    mode: 'horizontal' as DockMode, 
      children: [
        {
          tabs: [
            { id: 'tab1', title: 'tab1', content: <div>Hello World</div> },
            { id: 'source', title: 'Source' , content: <div>Hello World</div>},
            { id: 'formDesigner', title: 'Form Designer' , content:   <FormBuilderGuiEditor
            schema={toJson(schema)}
            uiSchema={toJson(uiSchema)}
              onChange={(newSchema: string, newUiSchema: string) => {
                setSchema(JSON.parse(newSchema));
                setUiSchema(JSON.parse(newUiSchema));
              }}
            />},
          ],
        },
        {
          tabs: [
            { id: 'schema', title: 'Schema', content: <SchemaEditor /> },
            { id: 'uiSchema', title: 'UiSchema', content:  <UISchemaEditor /> },
            { id: 'formData', title: 'FormData' , content: <FormDataEditor />},
            ...(extraErrors
              ? [{ id: 'extraErrors', title: 'Extra Errors', content: <ExtraErrorsEditorEditor /> }]
              : []),
          ],
        },  
    ],
  },
};

*/


  /*
  const defaultLayoutSource = {
    dockbox: {
      mode: 'horizontal' as DockMode, 
        children: [
          {
            tabs: [
              { id: 'schema', title: 'Schema', content: <SchemaEditor /> },
              { id: 'uiSchema', title: 'UiSchema', content:  <UISchemaEditor /> },
              { id: 'formData', title: 'FormData' , content: <FormDataEditor />},
              ...(extraErrors
                ? [{ id: 'extraErrors', title: 'Extra Errors', content: <ExtraErrorsEditorEditor /> }]
                : []),
            ],
          },  
      ],
    },
  };
  const defaultLayout2 = {
  dockbox: {
    mode: 'horizontal' as DockMode, 
      children: [
        {
          tabs: [
            { id: 'source', title: 'Source' , content:  <DockLayout
            defaultLayout={defaultLayoutSource}
            style={{
              position: 'absolute',
              left: 10,
              top: 10,
              right: 10,
              bottom: 10,
            }}
          />},
            { id: 'formDesigner', title: 'Form Designer' , content:   <FormBuilderGuiEditor schema={toJson(schema)} uiSchema={toJson(uiSchema)} onChange={(newSchema: string, newUiSchema: string) => { setSchema(JSON.parse(newSchema)); setUiSchema(JSON.parse(newUiSchema)); }}/>},
          ],
        }
    ],
  },
};
const createTab = (tabInfo: string, props = {}) => {
  let customTab = {
    id: `${tabInfo}-sed`,
    title: tabInfo,
    content: <div>{`Content for ${tabInfo}`}</div>,
    //closable: true,
    //group: 'card custom',
  };
  return { ...customTab, ...props };
};
*/