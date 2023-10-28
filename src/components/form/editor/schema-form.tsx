import React, { useState, useImperativeHandle, forwardRef } from "react";

import { RJSFSchema, UiSchema, ValidatorType, FormContextType } from "@rjsf/utils";
import { IChangeEvent, FormProps } from "@rjsf/core";

import "rc-dock/dist/rc-dock.css";

import ThemeForm from "../theme";

/**
 * uses forwardRef to change SchemaForm without rerending its parent (the rc-dock container)
 */
export interface ISchemaFormProps extends FormProps {
    schema: RJSFSchema;
    uiSchema: UiSchema;
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
        ...otherFormProps
    } = props;

    const [updatedSchema, setUpdatedSchema] = useState<RJSFSchema>(schema);
    const [updatedUiSchema, setUpdatedUiSchema] = useState<UiSchema>(uiSchema);
    const [updatedFormData, setUpdatedFormData] = useState<unknown>(formData);

    useImperativeHandle(
        ref,
        (): ISchemaFormRef => {
            return {
                setSchema: setUpdatedSchema,
                setUiSchema: setUpdatedUiSchema,
                setFormData: setUpdatedFormData,
            };
        },
        [updatedSchema, updatedUiSchema, updatedFormData],
    );

    (form: IChangeEvent<unknown>, event: React.FormEvent<unknown>) => {
        /*
        setFormData(form.formData);
        formDataEditorRef?.current?.setUpdatedCode(
            toJson(form.formData ?? {}),
        );
        onFormDataSubmit && onFormDataSubmit(form, event);
        */
    };

    const handleFormDataChange = (form: IChangeEvent<unknown>, id?: string) => {
        setUpdatedFormData(form.formData);
        onFormDataChange && onFormDataChange(form, id);
    };

    const handleFormDataSubmit = (
        form: IChangeEvent<unknown, RJSFSchema, FormContextType>,
        event: React.FormEvent<unknown>,
    ) => {
        setUpdatedFormData(form.formData);
        onFormDataSubmit && onFormDataSubmit(form, event);
    };

    const formProps = {
        ...otherFormProps,
        schema: updatedSchema,
        uiSchema: updatedUiSchema,
        formData: updatedFormData,
        onChange: handleFormDataChange,
        onSubmit: handleFormDataSubmit,
        validator: validator,
    };

    return <ThemeForm {...formProps} />;
});
