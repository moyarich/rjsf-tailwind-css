import React, { useState, useImperativeHandle, forwardRef } from "react";

import { RJSFSchema, UiSchema, ValidatorType, FormContextType } from "@rjsf/utils";
import { IChangeEvent, FormProps } from "@rjsf/core";

import "rc-dock/dist/rc-dock.css";

import ThemeForm from "../theme";

export interface IEditorFormProps
    extends Omit<
        FormProps,
        "schema" | "uiSchema" | "formData" | "onChange" | "onSubmit" | "validator"
    > {}

const toJson = (val: unknown) => JSON.stringify(val ?? {}, null, "\t");

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
        [_schema, _uiSchema, _formData, schema, uiSchema, formData],
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
