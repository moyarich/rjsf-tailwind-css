"use client";

import { useState, useEffect, useRef } from "react";
import { NextPage } from "next";
import { useParams } from "next/navigation";

import { ErrorSchema, RJSFSchema, UiSchema } from "@rjsf/utils";
import { IChangeEvent } from "@rjsf/core";

import validator from "@rjsf/validator-ajv8";

import Editors, { IEditorFormProps } from "@/components/form/editor/editors-dock";

import { SchemaSelector } from "@/components/schema-selector";
import customsSamples from "@/schemas";
import rjsfPlaygroundSamples from "@/schemas/samples";
import SpecialInput from "@/components/custom-components/fields/special-input";
import S3FileUpload from "@/components/custom-components/fields/s3-file-upload";
import handleUploadFile from "@/app/s3";
import UUIDInput from "@/components/custom-components/fields/uuid-input";

const schemasSamples = {
    ...customsSamples,
    ...rjsfPlaygroundSamples,
};

const Page: NextPage = () => {
    const params = useParams();

    const [selectedSchema, setSelectedSchema] = useState("Home");

    const [schema, setSchema] = useState<RJSFSchema>({});
    const [uiSchema, setUiSchema] = useState<UiSchema>({});
    const [formData, setFormData] = useState<any>({});

    const [extraErrors, setExtraErrors] = useState<ErrorSchema | undefined>();
    const editorsRef = useRef<unknown>();

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
        editorsRef?.current?.resetLayout();
    }, [selectedSchema]);

    /*
    const handleFormDataChange = (form: IChangeEvent<unknown>, id?: string) => {
        console.log("handleFormDataChange -- form id: ", id);
        console.dir(form.formData, { depth: null });
        setFormData(form.formData);
    };
*/
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleFormDataSubmit = (form: IChangeEvent<unknown>, _event: unknown) => {
        setFormData(form.formData);
        console.log(form, "form");
    };

    const handleTemplateSave = (
        schema: RJSFSchema,
        uiSchema?: UiSchema,
        formData?: unknown,
        extraErrors?: ErrorSchema,
    ) => {
        console.log("-->handleTemplateSave -->");
        console.dir({ uiSchema, formData, extraErrors }, { depth: null });
    };

    const otherFormProps: IEditorFormProps = {
        fields: {
            "/schemas/specialString": SpecialInput,
            "/schemas/s3-file-upload": S3FileUpload,
            "uuid-string": UUIDInput,
        },
        widgets: {
            specialString: SpecialInput,
            "s3-file-upload": S3FileUpload,
            uuid: UUIDInput,
        },
        formContext: {
            handleS3FileUpload: handleUploadFile,
        },
    };

    return (
        <div className="container">
            <SchemaSelector
                selectedSchema={selectedSchema}
                handleSchemaSelectChange={handleSchemaSelectChange}
                schemaData={schemasSamples}
            />

            {selectedSchema && (
                <Editors
                    ref={editorsRef}
                    schema={schema}
                    uiSchema={uiSchema}
                    formData={formData}
                    validator={validator}
                    setFormData={setFormData}
                    setSchema={setSchema}
                    setUiSchema={setUiSchema}
                    extraErrors={extraErrors}
                    setExtraErrors={setExtraErrors}
                    onTemplateSave={handleTemplateSave}
                    otherFormProps={otherFormProps}
                    onFormDataSubmit={handleFormDataSubmit}
                />
            )}
        </div>
    );
};

export default Page;
