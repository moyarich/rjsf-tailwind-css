'use client';

import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ErrorSchema, RJSFSchema, UiSchema } from '@rjsf/utils';
import { IChangeEvent } from '@rjsf/core';

import validator from '@rjsf/validator-ajv8';

import Editors from '@/components/form/editor/editors';

// Import your schema and uiSchema data here
import * as homeSchema from '@/schemas/home';
import * as menuSchema from '@/schemas/menu';
import * as randomSchema from '@/schemas/random';
import * as videoSchema from '@/schemas/video';
import * as testingSchema from '@/schemas/_testing';
const schemaData = {
  Home: homeSchema,
  Menu: menuSchema,
  Random: randomSchema,
  Video: videoSchema,
  Testing: testingSchema,
  //'Diseases': diseasesSchema,
};

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
//import * as diseasesSchema from '@/dummy-data/diseases.ts';

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

  const handleFormDataChange = (form: IChangeEvent<any>, id?: string) => {
    console.log(id, form.formData);
  };

  const handleFormDataSubmit = (form: IChangeEvent<any>, event: any) => {
    console.log('onFormDataSubmit-->', form);
    setFormData(form.formData);
  };

  return (
    <div className="container">
      <div className="rounded border m-4 ">
        <div className="border-r p-3 flex-1">
          <h2 className="text-red-500">Select a schema:</h2>
          <div>
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

        <div className="p-3">
          <h1>
            <span className="text-red-300">{selectedSchema}</span>
          </h1>
          <p className="text-sm">
            React JSON Form Schema and React JSON Form UISchema
          </p>
        </div>
      </div>

      {
        <Editors
          schema={schema}
          uiSchema={uiSchema}
          formData={formData}
          validator={validator}
          setFormData={setFormData}
          setSchema={setSchema}
          setUiSchema={setUiSchema}
          extraErrors={extraErrors}
          setExtraErrors={setExtraErrors}
          onFormDataChange={handleFormDataChange}
          onFormDataSubmit={handleFormDataSubmit}
        />
      }
    </div>
  );
}
