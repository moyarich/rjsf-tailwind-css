import React, { useEffect, useState, useRef, useImperativeHandle, forwardRef } from "react";

import {
    ErrorSchema,
    RJSFSchema,
    UiSchema,
    ValidatorType,
    FormContextType,
    PROPERTIES_KEY,
} from "@rjsf/utils";
import Form, { IChangeEvent, FormProps } from "@rjsf/core";

import isEqualWith from "lodash/isEqualWith";

import DockLayout, { DockMode, LayoutBase, TabBase, TabData } from "rc-dock";
import "rc-dock/dist/rc-dock.css";

import FormBuilderGuiEditor from "./form-builder-gui-editor";
import Editor from "./editor";
import ThemeForm from "../theme";

export interface IEditorFormProps
    extends Omit<
        FormProps,
        "schema" | "uiSchema" | "formData" | "onChange" | "onSubmit" | "validator"
    > {}

const toJson = (val: unknown) => JSON.stringify(val ?? {}, null, "\t");

export interface EditorsProps {
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
        id?: string,
    ) => void;
    onFormDataSubmit?: (
        form: IChangeEvent<unknown, RJSFSchema, FormContextType>,
        event: React.FormEvent<unknown>,
    ) => void;
    onTemplateSave?: (
        schema: RJSFSchema,
        uiSchema?: UiSchema,
        formData?: unknown,
        extraErrors?: ErrorSchema,
    ) => void;
}

const Editors = forwardRef((props: EditorsProps, ref) => {
    const {
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
        otherFormProps = {},
    } = props;

    const [layout, setLayout] = useState<LayoutBase | undefined>();

    const schemaFormRef = useRef<ISchemaFormRef>();

    // This ref will always be defined
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const dockLayoutRef = useRef<DockLayout>(null!);

    useImperativeHandle(
        ref,
        () => {
            return {
                resetLayout: () => {
                    setLayout(defaultLayout);
                },
                ...(dockLayoutRef?.current ?? {}),
            };
        },
        [schema, uiSchema, formData],
    );

    const _onTemplateSave = () => {
        onTemplateSave && onTemplateSave(schema, uiSchema, formData, extraErrors);
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
                onChange={(code: string) => {
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
                        <div className="relative h-full p-8 m-2">
                            <Editor
                                title="UISchema"
                                code={toJson(uiSchema)}
                                onChange={(code: string) => {
                                    const codeObject = JSON.parse(code);
                                    setUiSchema(codeObject);
                                }}
                            />
                        </div>
                    ),
                };
                break;
            case "formData":
                tab = {
                    id: "formData",
                    title: "FormData",
                    content: (
                        <div className="relative h-full p-8 m-2">
                            <Editor
                                title="formData"
                                code={toJson(formData)}
                                onChange={(code: string) => {
                                    const newFormData = JSON.parse(code);
                                    if (
                                        !isEqualWith(
                                            newFormData,
                                            formData,
                                            (newValue, oldValue) => {
                                                // The editor uses JSON.stringify to remove undefined values. So, compare the values and use JSON.stringify to check if the trimmed formData is identical to the untrimmed formData.
                                                return (
                                                    JSON.stringify(oldValue) ===
                                                    JSON.stringify(newValue)
                                                );
                                            },
                                        )
                                    ) {
                                        setFormData(newFormData);
                                    }
                                }}
                            />
                        </div>
                    ),
                };
                break;
            case "formBuilder":
                tab = {
                    id: "formBuilder",
                    title: "Form Builder",
                    content: (
                        <div className="relative overflow-auto h-full p-8 m-2">
                            <FormBuilderGuiEditor
                                schema={toJson(schema)}
                                uiSchema={toJson(uiSchema)}
                                onChange={(newSchema: string, newUiSchema: string) => {
                                    const schemaObj = JSON.parse(newSchema);
                                    const uiSchemaObj = JSON.parse(newUiSchema);

                                    setSchema(schemaObj);
                                    setUiSchema(uiSchemaObj);

                                    schemaFormRef?.current?.setSchema(schemaObj);
                                    schemaFormRef?.current?.setUiSchema(uiSchemaObj);
                                }}
                            />
                        </div>
                    ),
                };

                break;
            case "preview":
                tab = {
                    id: "preview",
                    title: "Preview",
                    content: (
                        <div className="relative overflow-auto h-full p-8 m-2">
                            <SchemaForm
                                ref={schemaFormRef}
                                schema={schema}
                                uiSchema={uiSchema}
                                formData={formData}
                                validator={validator}
                                onFormDataChange={onFormDataChange}
                                onFormDataSubmit={onFormDataSubmit}
                                {...otherFormProps}
                            />
                        </div>
                    ),
                };
                break;
            case "extraErrors":
                tab = {
                    id: "extraErrors",
                    title: "Extra Errors",
                    content: (
                        <div className="relative h-full p-8 m-2">
                            <ExtraErrorsEditorEditor />
                        </div>
                    ),
                };
                break;
            case "schema":
            default:
                tab = {
                    id: "schema",
                    title: "Schema",
                    content: (
                        <div className="relative h-full p-8 m-2">
                            <Editor
                                title="JSONSchema"
                                code={toJson(schema)}
                                onChange={(code: string) => {
                                    const codeObject = JSON.parse(code);
                                    setSchema(codeObject);

                                    schemaFormRef?.current?.setSchema(codeObject);
                                }}
                            />
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

    useEffect(() => {
        console.log("useEffect: load Dock Layout---->");
        setLayout(defaultLayout);
    }, []);

    return (
        <>
            {layout && (
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
                            ref={dockLayoutRef}
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
                                console.log("Dock layout onLayoutChange: load Dock Layout---->");
                                dockLayoutRef.current.loadLayout(newLayout as LayoutBase);
                                setLayout(newLayout);
                            }}
                        />
                    </div>
                </div>
            )}
        </>
    );
});

export default Editors;

/**
 * uses forwardRef to change SchemaForm without rerending its parent (the rc-dock container)
 */
export interface ISchemaFormProps {
    schema: RJSFSchema;
    uiSchema: UiSchema;
    otherFormProps?: IEditorFormProps;
    formData: unknown;
    validator: ValidatorType;
    onFormDataChange?: (
        form: IChangeEvent<unknown, RJSFSchema, FormContextType>,
        id?: string,
    ) => void;
    onFormDataSubmit?: (
        form: IChangeEvent<unknown, RJSFSchema, FormContextType>,
        event: React.FormEvent<unknown>,
    ) => void;
}
export interface ISchemaFormRef {
    setSchema: React.Dispatch<React.SetStateAction<RJSFSchema>>;
    setUiSchema: React.Dispatch<React.SetStateAction<UiSchema>>;
    setFormData: React.Dispatch<React.SetStateAction<unknown>>;
}
export const SchemaForm = forwardRef((props: ISchemaFormProps, ref) => {
    const {
        schema,
        uiSchema,
        formData,
        validator,
        onFormDataChange,
        onFormDataSubmit,
        otherFormProps,
    } = props;

    const [_schema, _setSchema] = useState(schema);
    const [_uiSchema, _setUiSchema] = useState(uiSchema);
    const [_formData, _setFormData] = useState(formData);

    useImperativeHandle(
        ref,
        (): ISchemaFormRef => {
            return {
                setSchema: _setSchema,
                setUiSchema: _setUiSchema,
                setFormData: _setFormData,
            };
        },
        [_schema, _setSchema, _uiSchema, _setUiSchema],
    );

    const formProps = {
        ...otherFormProps,
        schema: _schema,
        uiSchema: _uiSchema,
        formData: _formData,
        onChange: onFormDataChange,
        onSubmit: onFormDataSubmit,
        validator: validator,
    };

    return <ThemeForm {...formProps} />;
});
