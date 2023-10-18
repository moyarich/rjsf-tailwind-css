'use client';

//import { FormBuilder } from '@ginkgo-bioworks/react-json-schema-form-builder';
import { useState, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ErrorSchema, RJSFSchema, UiSchema } from '@rjsf/utils';
import { IChangeEvent } from '@rjsf/core';
import Editors from '@/components/form/editor/editors';
//import { DynamicForm } from '@/components/form/dynamic-form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
//import * as diseasesSchema from '@/dummy-data/diseases.ts';

// Import your schema and uiSchema data here
import * as homeSchema from '@/dummy-data/home';
import * as menuSchema from '@/dummy-data/menu';
import * as randomSchema from '@/dummy-data/random';

const schemaData = {
  Home: homeSchema,
  Menu: menuSchema,
  Random: randomSchema,
  //'Diseases': diseasesSchema,
};

export default function Home() {
  const [selectedSchema, setSelectedSchema] = useState('Home');

  const {
    schema: s,
    uiSchema: uiS,
    formData: fd,
  } = schemaData?.[selectedSchema as keyof typeof schemaData] ?? {};

  const [schema, setSchema] = useState<RJSFSchema>(s ?? {});
  const [uiSchema, setUiSchema] = useState<UiSchema>(uiS ?? {});
  const [formData, setFormData] = useState<any>(fd ?? {});

  const [extraErrors, setExtraErrors] = useState<ErrorSchema | undefined>();

  const handleFormDataChange = (form: IChangeEvent<any>) => {
    console.log(form.formData);
  };

  const handleFormDataSubmit = (form: IChangeEvent<any>) => {
    console.log(form.formData);
  };

  const handleSchemaSelectChange = useCallback(
    (selected: string): void => {
      setSelectedSchema(selected);

      const {
        schema: s,
        uiSchema: uiS,
        formData: fd,
      } = schemaData?.[selected as keyof typeof schemaData] ?? {};

      setSchema(s ?? {});
      setUiSchema(uiS ?? {});
      setFormData(fd ?? {});
    },
    [schemaData]
  );
  /*
  function handleSchemaSelectChange(selected: string): void {
    setSelectedSchema(selected);

    const {
      schema: s,
      uiSchema: uiS,
      formData: fd,
    } = schemaData?.[selected as keyof typeof schemaData] ?? {};

    setSchema(s ?? {});
    setUiSchema(uiS ?? {});
    setFormData(fd ?? {});
  }
  */

  return (
    <>
      <div className="flex felx-col gap-4 rounded p-12 border m-4">
        <div>
          <h1>
            <span className="text-red-500">{selectedSchema}</span>
          </h1>
          <p className="text-sm">
            React JSON Form Schema and React JSON Form UISchema
          </p>
        </div>
        <div>
          <h2>Select a schema:</h2>
          <Select
            value={selectedSchema}
            onValueChange={handleSchemaSelectChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Schema" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(schemaData).map((schemaName) => (
                <SelectItem key={schemaName} value={schemaName}>
                  {schemaName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* <div className="mb-8 p-4">
        <DynamicForm<any>
          className="max-w-[384px]"
          schema={schema}
          uiSchema={uiSchema}
          formData={formData}
          onChange={handleFormDataChange}
          onSubmit={handleFormDataSubmit}
          //transformErrors={transformRJSFErrors}
        />
      </div>*/}

      <Editors
        formData={formData}
        setFormData={setFormData}
        schema={schema}
        setSchema={setSchema}
        uiSchema={uiSchema}
        setUiSchema={setUiSchema}
        extraErrors={extraErrors}
        setExtraErrors={setExtraErrors}
      />
    </>
  );
}
