"use client";
import "bootstrap/dist/css/bootstrap.min.css";

import { useState, useEffect } from "react";
import { NextPage } from "next";
import { useParams } from "next/navigation";

import { ErrorSchema, RJSFSchema, UiSchema } from "@rjsf/utils";
import { IChangeEvent } from "@rjsf/core";

import validator from "@rjsf/validator-ajv8";

import Editors from "@/components/form/editor/editors-dock";



import { SchemaSelector } from "@/components/schema-selector";
import customsSamples from "@/schemas"
import rjsfPlaygroundSamples from "@/schemas/samples"

const schemasSamples = {
    ...customsSamples,
    ...rjsfPlaygroundSamples

}

const Page: NextPage = () => {
    const params = useParams();

    const [selectedSchema, setSelectedSchema] = useState("Home");

    const [schema, setSchema] = useState<RJSFSchema>({});
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
        } = schemasSamples?.[selectedSchema as keyof typeof schemasSamples] ?? {};

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
        console.log("-->handleTemplateSave schema-->", schema);
        console.log("-->handleTemplateSave uiSchema-->", uiSchema);
        console.log("-->handleTemplateSave formData-->", formData);
        console.log("-->handleTemplateSave extraErrors-->", extraErrors);
    };

    return (
        <div className="container">
            <SchemaSelector
                selectedSchema={selectedSchema}
                handleSchemaSelectChange={handleSchemaSelectChange}
                schemaData={schemasSamples}
            />

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
};

export default Page;
