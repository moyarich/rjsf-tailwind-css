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

import FormBuilderGuiEditor, { IFormBuilderGuiEditorRef } from "./form-builder-gui-editor";
import Editor, { IEditorRef } from "./editor";
import ThemeForm from "../theme";
import { ISchemaFormRef, SchemaForm } from "./SchemaForm";

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

    const formBuilderGuiRef = useRef<IFormBuilderGuiEditorRef>();
    const schemaFormRef = useRef<ISchemaFormRef>();
    const schemaEditorRef = useRef<IEditorRef>();
    const uiSchemaEditorRef = useRef<IEditorRef>();
    const formDataEditorRef = useRef<IEditorRef>();

    // This ref will always be defined
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const dockLayoutRef = useRef<DockLayout>(null!);

    useImperativeHandle(
        ref,
        () => {
            return {
                resetLayout: () => {
                    setLayout(getDefaultLayout());
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
                                ref={uiSchemaEditorRef}
                                title="UISchema"
                                code={toJson(uiSchema)}
                                onChange={(code: string) => {
                                    const codeObject = JSON.parse(code);
                                    setUiSchema(codeObject);

                                    formBuilderGuiRef?.current?.setUiSchema(code);
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
                                ref={formDataEditorRef}
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
                                        schemaFormRef?.current?.setFormData(newFormData);
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
                                ref={formBuilderGuiRef}
                                schema={toJson(schema)}
                                uiSchema={toJson(uiSchema)}
                                onChange={(newSchema: string, newUiSchema: string) => {
                                    const schemaObj = JSON.parse(newSchema);
                                    const uiSchemaObj = JSON.parse(newUiSchema);

                                    setSchema(schemaObj);
                                    setUiSchema(uiSchemaObj);

                                    schemaFormRef?.current?.setSchema(schemaObj);
                                    schemaFormRef?.current?.setUiSchema(uiSchemaObj);

                                    schemaEditorRef?.current?.setUpdatedCode(toJson(schemaObj));
                                    uiSchemaEditorRef?.current?.setUpdatedCode(toJson(uiSchemaObj));
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
                                onFormDataChange={(form: IChangeEvent<unknown>, id?: string) => {
                                    setFormData(form.formData);
                                    formDataEditorRef?.current?.setUpdatedCode(
                                        toJson(form.formData ?? {}),
                                    );
                                    onFormDataChange && onFormDataChange(form, id);
                                }}
                                onFormDataSubmit={(
                                    form: IChangeEvent<unknown>,
                                    event: React.FormEvent<unknown>,
                                ) => {
                                    setFormData(form.formData);
                                    formDataEditorRef?.current?.setUpdatedCode(
                                        toJson(form.formData ?? {}),
                                    );
                                    onFormDataSubmit && onFormDataSubmit(form, event);
                                }}
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
                                ref={schemaEditorRef}
                                title="JSONSchema"
                                code={toJson(schema)}
                                onChange={(code: string) => {
                                    const codeObject = JSON.parse(code);
                                    setSchema(codeObject);

                                    schemaFormRef?.current?.setSchema(codeObject);
                                    formBuilderGuiRef?.current?.setSchema(code);
                                }}
                            />
                        </div>
                    ),
                };
                break;
        }

        return tab;
    };

    const getDefaultLayout = (): LayoutBase => {
        return {
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
    };

    useEffect(() => {
        console.log("useEffect: load Dock Layout---->");
        setLayout({ ...getDefaultLayout() });
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
                                className="bg-primary text-primary-foreground shadow hover:bg-primary/90 active:bg-primary/70 py-2 rounded-tl-md rounded-tr-md px-8"
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
                                setLayout({ ...newLayout });
                            }}
                        />
                    </div>
                </div>
            )}
        </>
    );
});

export default Editors;
