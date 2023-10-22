import React, { useEffect, useState } from "react";

import { ErrorSchema, RJSFSchema, UiSchema, ValidatorType, FormContextType } from "@rjsf/utils";
import { IChangeEvent, FormProps } from "@rjsf/core";

import isEqualWith from "lodash/isEqualWith";

import DockLayout, {
    DockMode,
    LayoutBase,
    TabBase,
    TabData,
} from "rc-dock";
import "rc-dock/dist/rc-dock.css";


import FormBuilderGuiEditor from "./form-builder-gui-editor";
import Editor from "./editor";
import ThemeForm from "../theme";

export interface IEditorFormProps extends Omit<FormProps, 'schema' | 'uiSchema' | 'formData' | 'onChange' | 'onSubmit' | 'validator'> {}


const toJson = (val: unknown) => JSON.stringify(val ?? {}, null, "\t");

interface EditorsProps {
    editorTitle?: string;
    schema: RJSFSchema;
    setSchema: React.Dispatch<React.SetStateAction<RJSFSchema>>;
    uiSchema: UiSchema;
    setUiSchema: React.Dispatch<React.SetStateAction<UiSchema>>;
    otherFormProps?: IEditorFormProps;
    formData: unknown;
    setFormData: React.Dispatch<React.SetStateAction<unknown>>;
    validator: ValidatorType;
    extraErrors?: ErrorSchema;
    setExtraErrors?: React.Dispatch<React.SetStateAction<ErrorSchema | undefined>>;
    onFormDataChange?: (
        form: IChangeEvent<unknown, RJSFSchema, FormContextType>,
        id?: string
    ) => void;
    onFormDataSubmit?: (
        form: IChangeEvent<unknown, RJSFSchema, FormContextType>,
        event: React.FormEvent<unknown>
    ) => void;
    onTemplateSave?: (
        schema: RJSFSchema,
        uiSchema?: UiSchema,
        formData?: unknown,
        extraErrors?: ErrorSchema
    ) => void;
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
    otherFormProps = {}
}: EditorsProps) {
    const _onTemplateSave = () => {
        onTemplateSave && onTemplateSave(schema, uiSchema, formData, extraErrors);
    };

    //-------------------
    //-------------------
    /**
     * FormPreview
     */



    const _onFormDataChange = (form: IChangeEvent<unknown>, id: string | undefined) => {
        onFormDataChange && onFormDataChange(form, id);
    };

    const _onFormDataSubmit = (
        form: IChangeEvent<unknown, RJSFSchema, FormContextType>,
        event: React.FormEvent<unknown>
    ) => {
        onFormDataSubmit && onFormDataSubmit(form, event);
    };
    const formProps = {...otherFormProps, 
        schema   :schema,
        uiSchema:uiSchema,
        formData:formData,
        onChange:_onFormDataChange,
        onSubmit:_onFormDataSubmit,
        validator:validator,
    }

    const FormPreview = () => {
        return (
            <ThemeForm
                {...formProps}
            />
        );
    };

    //-------------------
    //-------------------
    /**
     * FormData
     */

    const FormBuilderGui = () => {
        return (
            <FormBuilderGuiEditor
                schema={toJson(schema)}
                uiSchema={toJson(uiSchema)}
                onSave={(newSchema: string, newUiSchema: string) => {
                    setSchema(JSON.parse(newSchema));
                    setUiSchema(JSON.parse(newUiSchema));
                }}
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

    const onFormDataEdited = (newFormData: any) => {
        if (
            !isEqualWith(newFormData, formData, (newValue, oldValue) => {
                // The editor uses JSON.stringify to remove undefined values. So, compare the values and use JSON.stringify to check if the trimmed formData is identical to the untrimmed formData.
                return JSON.stringify(oldValue) === JSON.stringify(newValue);
            })
        ) {
            setFormData(newFormData);
        }
    };

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
        if (newExtraErrors) {
            setExtraErrors && setExtraErrors(newExtraErrors);
        }
    };

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

    const loadTab = ({ id }: TabBase): TabData => {
        let tab = {} as TabData;

        switch (id) {
            case "uiSchema":
                tab = {
                    id: "uiSchema",
                    title: "UiSchema",
                    content: (
                        <div className="relative overflow-auto h-screen p-2 m-2">
                            <UISchemaEditor />
                        </div>
                    ),
                };
                break;
            case "formData":
                tab = {
                    id: "formData",
                    title: "FormData",
                    content: (
                        <div className="relative overflow-auto h-screen p-2 m-2">
                            <FormDataEditor />
                        </div>
                    ),
                };
                break;
            case "formBuilder":
                tab = {
                    id: "formBuilder",
                    title: "Form Builder",
                    content: (
                        <div className="relative overflow-auto h-screen p-2 m-2">
                            <FormBuilderGui />
                        </div>
                    ),
                };

                break;
            case "preview":
                tab = {
                    id: "preview",
                    title: "Preview",
                    content: (
                        <div className="relative overflow-auto h-screen p-2 m-2">
                            <FormPreview />{" "}
                        </div>
                    ),
                };
                break;
            case "extraErrors":
                tab = {
                    id: "extraErrors",
                    title: "Extra Errors",
                    content: (
                        <div className="relative overflow-auto h-screen p-2 m-2">
                            <ExtraErrorsEditorEditor />
                        </div>
                    ),
                };
            case "schema":
            default:
                tab = {
                    id: "schema",
                    title: "Schema",
                    content: (
                        <div className="relative overflow-auto h-screen p-2 m-2">
                            <SchemaEditor />
                        </div>
                    ),
                };
                break;
        }

        return tab;
    };

    const defaultLayout: LayoutBase = {
        dockbox: {
            mode: "horizontal" as DockMode,
            children: [
                {
                    mode: "vertical" as DockMode,
                    children: [
                        {
                            tabs: [
                                { id: "schema" },
                                { id: "uiSchema" },
                                //...(extraErrors ? [{ id: 'extraErrors'}] : []),
                                { id: "formBuilder" },
                            ],
                        },
                    ],
                },

                {
                    mode: "vertical" as DockMode,
                    children: [
                        {
                            tabs: [{ id: "preview" }, { id: "formData" }],
                        },
                    ],
                },
            ],
        },
    };

    const [layout, setLayout] = useState<LayoutBase>(defaultLayout);

    useEffect(() => {
        dockLayoutRef.loadLayout(layout as LayoutBase);
    });

    let dockLayoutRef: DockLayout;

    const getRef = (r: DockLayout) => {
        dockLayoutRef = r;
    };
    return (
        <div className="mb-4">
            <div className="header flex pt-2 items-center">
                {editorTitle && (
                    <div className="p-2 gap-1 inline-flex items-center">
                        <span className="text-lg">{editorTitle}</span>
                    </div>
                )}
                <div className="action flex flex-1 items-center justify-end">
                    <button
                        className="bg-primary text-primary-foreground shadow hover:bg-primary/90 py-2 rounded-tl-md rounded-tr-md px-8"
                        onClick={_onTemplateSave}
                    >
                        Save Template
                    </button>
                </div>
            </div>
            <div className="relative h-screen">
                <DockLayout
                    ref={getRef}
                    layout={layout}
                    loadTab={loadTab}
                    dropMode="edge"
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 10,
                        marginBottom: "10px",
                    }}
                    onLayoutChange={(newLayout) => {
                        setLayout(newLayout);
                    }}
                />
            </div>
        </div>
    );
}
