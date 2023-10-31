"use client";

import { useState, useEffect } from "react";
import { NextPage } from "next";
import { useParams } from "next/navigation";

import { ErrorSchema, RJSFSchema, RegistryFieldsType, UiSchema } from "@rjsf/utils";
import { IChangeEvent } from "@rjsf/core";

import validator from "@rjsf/validator-ajv8";

import { IEditorFormProps } from "@/components/form/editor/editors-dock";

import customsSamples from "@/schemas";
import rjsfPlaygroundSamples from "@/schemas/samples";
import SpecialInput from "@/components/custom-components/fields/special-input";
import S3FileUpload from "@/components/custom-components/fields/s3-file-upload";
import handleUploadFile from "@/app/s3";
import UUIDInput from "@/components/custom-components/fields/uuid-input";
import ThemeForm from "@/components/form/theme";
import { GeoPosition } from "@/components/custom-components/fields/geo-position";
import { StorageField } from "@/components/custom-components/fields/storage-field";
import { FormSchemaProvider } from "@/components/form/context/FormSchemaContext";

const schemasSamples = {
    ...customsSamples,
    ...rjsfPlaygroundSamples,
};

const Page: NextPage = () => {
    const params = useParams();

    //-----------------------
    const s: RJSFSchema = {
        type: "object",
        properties: {
            id: {
                type: "string",
            },
            message: {
                type: "string",
                maxLength: 5,
            },
            location: {
                type: "object",
                required: ["lat", "lon"],
                properties: {
                    lat: { type: "number" },
                    lon: { type: "number" },
                    james: { type: "number" },
                },
            },
            media: {
                type: "object",
                properties: {
                    fileLocation: {
                        title: "File Location",
                        type: "string",
                        enum: ["s3", "url", "dataURL"],
                        default: "s3",
                    },
                    alt: {
                        type: "string",
                        title: "Alt Text",
                    },
                },
                dependencies: {
                    fileLocation: {
                        oneOf: [
                            {
                                properties: {
                                    fileLocation: {
                                        enum: ["s3"],
                                    },
                                    s3ObjectKey: {
                                        type: "string",
                                        title: "S3 Object Key",
                                    },
                                },
                                required: ["s3ObjectKey"],
                            },
                            {
                                properties: {
                                    fileLocation: {
                                        enum: ["url"],
                                    },
                                    url: {
                                        type: "string",
                                        title: "URL",
                                    },
                                },
                                required: ["url"],
                            },
                            {
                                properties: {
                                    fileLocation: {
                                        enum: ["dataURL"],
                                    },
                                    dataURL: {
                                        type: "string",
                                        title: "Data URL",
                                        format: "data-url",
                                    },
                                },
                                required: ["dataURL"],
                            },
                        ],
                    },
                },
                required: ["fileLocation"],
            },
        },
    };

    const uIs: UiSchema = {
        location: { "ui:field": "geo" },
        message: { "ui:field": "uuid-string" },
        // storage: { "ui:field": "storage" },
    };
    const frm = {
        name: "moya",
    };
    //-----------------------

    const [schema, setSchema] = useState<RJSFSchema>(s);
    const [uiSchema, setUiSchema] = useState<UiSchema>(uIs);
    const [formData, setFormData] = useState<any>(frm);
    const [extraErrors, setExtraErrors] = useState<ErrorSchema | undefined>();

    const handleFormDataChange = (form: IChangeEvent<unknown>, id?: string) => {
        console.log("handleFormDataChange[ -- form id: ", id);
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
    const fields: RegistryFieldsType = {
        geo: GeoPosition,
        "uuid-string": UUIDInput,
        storage: StorageField,
        "/schemas/s3-file-upload": S3FileUpload,
    };

    return (
        <div className="container p-6 text-green">
            <ThemeForm
                schema={schema}
                uiSchema={uiSchema}
                validator={validator}
                fields={fields}
                formData={formData}
                onChange={handleFormDataChange}
                onSubmit={handleFormDataSubmit}
            />
            <div className="group show-content">
                <label>
                    <input type="checkbox" />
                    <span className="content header">header</span>
                </label>
                <div className="content invisible group-[.show-content]:visible group-[.show-content]:bg-primary group-[.show-content]:text-primary-foreground">
                    my content
                </div>
            </div>
            <FormSchemaProvider>
                <TestCollaspe />
            </FormSchemaProvider>
        </div>
    );
};

export default Page;

//https://github.com/jalcock501/rjsf-collapsible-fields/tree/master/src/components
interface CollapsibleProps {
    collapseTitle: string;
    children: React.ReactNode;
    isOpened: boolean;
}

export const Collapsible: React.FC<CollapsibleProps> = ({ collapseTitle, children, isOpened }) => {
    const [isCollapsed, setIsCollapsed] = useState(!isOpened);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="flex flex-col gap-2">
            <label>
                <input
                    type="checkbox"
                    className="collapse-checkbox"
                    onChange={toggleCollapse}
                    checked={!isCollapsed}
                />
                <span className="content header"> {collapseTitle}</span>
            </label>

            <div
                className={`collapse-content bg-primary text-primary-foreground ${
                    isCollapsed ? "hidden" : "block"
                }`}
            >
                {children}
            </div>
        </div>
    );
};

export const TestCollaspe = () => {
    const [isOpened, setIsOpened] = useState(false);

    return (
        <div className="my-4">
            <button onClick={() => setIsOpened(!isOpened)}>
                {isOpened ? "Hide All" : "Show All"}
            </button>

            <div className="my-4">
                <Collapsible collapseTitle="Collapsible 1" isOpened={isOpened}>
                    <p>Content for Collapsible 1.</p>
                </Collapsible>
                <Collapsible collapseTitle="Collapsible 2" isOpened={isOpened}>
                    <p>Content for Collapsible 2.</p>
                </Collapsible>
                <Collapsible collapseTitle="Collapsible 3" isOpened={isOpened}>
                    <p>Content for Collapsible 3.</p>
                </Collapsible>
            </div>
        </div>
    );
};
