"use client";

import { useState } from "react";
import { NextPage } from "next";
import { useParams } from "next/navigation";

import { ErrorSchema, RJSFSchema, RegistryFieldsType, UiSchema } from "@rjsf/utils";
import { IChangeEvent } from "@rjsf/core";

import validator from "@rjsf/validator-ajv8";

import { IEditorFormProps } from "@/components/form/editor/editors-dock";

import customsSamples from "@/schemas";
import rjsfPlaygroundSamples from "@/schemas/samples";
import SpecialInput from "@/components/form/custom-components/fields/special-input";
import S3FileUpload from "@/components/form/custom-components/fields/s3-file-upload";
import handleUploadFile from "@/app/s3";
import UUIDInput from "@/components/form/custom-components/fields/uuid-input";
import ThemeForm from "@/components/form/theme";
import { GeoPosition } from "@/components/form/custom-components/fields/geo-position";

const schemasSamples = {
    ...customsSamples,
    ...rjsfPlaygroundSamples,
};

const Page: NextPage = () => {
    const params = useParams();

    const s: RJSFSchema = {
        type: "object",
        properties: {
            name: { type: "string" },
            location: {
                type: "object",
                required: ["lat", "lon"],
                properties: {
                    lat: { type: "number" },
                    lon: { type: "number" },
                    james: { type: "number" },
                },
            },
        },
    };

    const uIs: UiSchema = { location: { "ui:field": "geo" } };

    const [schema, setSchema] = useState<RJSFSchema>(s);
    const [uiSchema, setUiSchema] = useState<UiSchema>(uIs);
    const [formData, setFormData] = useState<any>({});
    const [extraErrors, setExtraErrors] = useState<ErrorSchema | undefined>();

    const fields: RegistryFieldsType = { geo: GeoPosition };

    const handleFormDataChange = (form: IChangeEvent<unknown>, id?: string) => {
        console.log("handleFormDataChange -- form id: ", id);
        console.dir(form.formData, { depth: null });
        setFormData(form.formData);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleFormDataSubmit = (form: IChangeEvent<unknown>, _event: unknown) => {
        setFormData(form.formData);
        console.log(form, "form");
    };

    const otherFormProps: IEditorFormProps = {
        fields: {
            "/schemas/specialString": SpecialInput,
            "/schemas/s3-file-upload": S3FileUpload,
            "/schemas/uuid-string": UUIDInput,
        },
        formContext: {
            handleS3FileUpload: handleUploadFile,
        },
    };

    return (
        <div className="container p-6 text-green">
            <ThemeForm
                schema={schema}
                uiSchema={uiSchema}
                validator={validator}
                fields={fields}
                onChange={handleFormDataChange}
                onSubmit={handleFormDataSubmit}
            />
        </div>
    );
};

export default Page;
