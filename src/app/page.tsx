'use client';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState,useEffect } from 'react';
import { NextPage } from "next";
import { useParams } from "next/navigation";

import { ErrorSchema, RJSFSchema, UiSchema } from '@rjsf/utils';
import { IChangeEvent } from '@rjsf/core';

import validator from '@rjsf/validator-ajv8';

import Editors from '@/components/form/editor/editors-dock';

// Import your schema and uiSchema data here
import * as homeSchema from '@/schemas/home';
import * as menuSchema from '@/schemas/menu';
import * as randomSchema from '@/schemas/random';
import * as videoSchema from '@/schemas/video';
import * as testingSchema from '@/schemas/_testing';

const defaultSchemaData = {
  Home: homeSchema,
  Menu: menuSchema,
  Random: randomSchema,
  Video: videoSchema,
  Testing: testingSchema,
  //'Diseases': diseasesSchema,
};


import { SchemaSelector } from '@/components/schema-selector';


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
    const {
        schema: s = {},
        uiSchema: uiS = {},
        formData: fd = {},
    } = defaultSchemaData?.[selectedSchema as keyof typeof defaultSchemaData]  ?? {};

    setSchema(s as RJSFSchema);
    setUiSchema(uiS as RJSFSchema);
    setFormData(fd as FormData);
}, [selectedSchema]);


  const handleFormDataChange = (form: IChangeEvent<unknown>, id?: string) => {
    console.log(id, form.formData);
};

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleFormDataSubmit = (form: IChangeEvent<unknown>, _event: unknown) => {
      setFormData(form.formData);
  };

  const handleTemplateSave = (
    schema: RJSFSchema,
    uiSchema?: UiSchema,
    formData?: unknown,
    extraErrors?: ErrorSchema
) => {
  console.log("-->handleTemplateSave schema-->",schema)
  console.log("-->handleTemplateSave uiSchema-->",uiSchema)
  console.log("-->handleTemplateSave formData-->",formData)
  console.log("-->handleTemplateSave extraErrors-->",extraErrors)
}


  return (
    <div className="container">
     <SchemaSelector selectedSchema={selectedSchema} handleSchemaSelectChange={handleSchemaSelectChange } schemaData={defaultSchemaData} />

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
          onTemplateSave={handleTemplateSave}
        />
      }
    </div>
  );
}

export default Page
