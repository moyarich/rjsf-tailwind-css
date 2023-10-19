'use client';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState,useEffect } from 'react';
import { NextPage } from "next";
import { useParams } from "next/navigation";

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


const Page: NextPage = () => {
  const params = useParams();

  const [selectedSchema, setSelectedSchema] = useState('Home');

  const [schema, setSchema] = useState<RJSFSchema>( {});
  const [uiSchema, setUiSchema] = useState<UiSchema>({});
  const [formData, setFormData] = useState<any>({});

  const [extraErrors, setExtraErrors] = useState<ErrorSchema | undefined>();

  function handleSchemaSelectChange(selected: string): void {
    setSelectedSchema(selected);
  }
  useEffect(() => {
    console.log("selectedSchema--->", selectedSchema);
    const {
        schema: s = {},
        uiSchema: uiS = {},
        formData: fd = {},
    } = schemaData?.[selectedSchema as keyof typeof schemaData]  ?? {};

    setSchema(s as RJSFSchema);
    setUiSchema(uiS as RJSFSchema);
    setFormData(fd as FormData);
}, [selectedSchema]);

  const handleFormDataChange = (form: IChangeEvent<any>, id?: string) => {
    console.log(id, form.formData);
  };

  const handleFormDataSubmit = (form: IChangeEvent<any>, event: any) => {
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

      <fieldset className="mb-4 border p-2 relative">
                        <legend className="text-muted-foreground font-light text-base p-0 block transform origin-top-left whitespace-nowrap overflow-hidden overflow-ellipsis absolute left-0 top-0 translate-x-[14px] -translate-y-[9px] scale-75  z-10">
  User's Credentials
  </legend>
                        <div className="mb-4">
                            <label >Username:</label>
                            <input id="username" type="text" className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded username" placeholder="Username..." name="username"/>
                            </div> </fieldset>

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

export default Page
