import { useState, forwardRef, useImperativeHandle } from "react";
//import "bootstrap/dist/css/bootstrap.min.css";

import "./form-builder.css";

import { FormBuilder } from "@ginkgo-bioworks/react-json-schema-form-builder";

export interface IFormBuilderGuiEditorRef {
    setSchema: React.Dispatch<React.SetStateAction<string>>;
    setUiSchema: React.Dispatch<React.SetStateAction<string>>;
}

export interface IFormBuilderGuiEditorProps {
    schema: string;
    uiSchema: string;
    onSave?: (newSchema: string, newUiSchema: string) => void;
    onChange?: (newSchema: string, newUiSchema: string) => void;
}

export const FormBuilderGuiEditor = forwardRef((props: IFormBuilderGuiEditorProps, ref) => {
    const { schema, uiSchema, onChange, onSave } = props;

    const [updatedSchema, setUpdatedSchema] = useState<string>(schema);
    const [updatedUiSchema, setUpdatedUiSchema] = useState<string>(uiSchema);

    useImperativeHandle(
        ref,
        (): IFormBuilderGuiEditorRef => {
            return {
                setSchema: setUpdatedSchema,
                setUiSchema: setUpdatedUiSchema,
            };
        },
        [updatedSchema, updatedUiSchema],
    );

    const onFormBuilderChange = (newSchema: string, newUiSchema: string) => {
        setUpdatedSchema(newSchema);
        setUpdatedUiSchema(newUiSchema);
        onChange && onChange(newSchema, newUiSchema);
    };

    const onFormBuilderSave = () => {
        onSave && onSave(updatedSchema, updatedUiSchema);
    };

    const SaveButton = () => {
        return (
            <button
                className="bg-primary text-primary-foreground shadow hover:bg-primary/90 active:bg-primary/70 h-9 py-2 rounded-md px-8"
                onClick={onFormBuilderSave}
            >
                Save
            </button>
        );
    };

    return (
        <div>
            {onSave && (
                <div className="action flex flex-1 items-center justify-center">
                    <SaveButton />
                </div>
            )}
            <FormBuilder
                className="schema-form-builder m-2"
                schema={updatedSchema}
                uischema={updatedUiSchema}
                onChange={onFormBuilderChange}
            />
            {onSave && (
                <div className="action flex flex-1 items-center justify-center">
                    <SaveButton />
                </div>
            )}
        </div>
    );
});

export default FormBuilderGuiEditor;
