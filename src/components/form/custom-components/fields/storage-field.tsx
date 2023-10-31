import { FC, useState } from "react";
import { FieldProps } from "@rjsf/utils";

export const StorageField: FC<FieldProps> = (props) => {
    const { formData: initialValue, onChange, idSchema, schema, name: fieldName } = props;

    console.log(schema);

    const [updatedFormData, setUpdatedFormData] = useState(initialValue ?? {});
    const { fileLocation = "", s3ObjectKey = "", url = "", dataURL = "" } = updatedFormData ?? {};

    function getFieldId() {
        return `${idSchema.$id}`;
    }

    const handleChange = (name: string, value: string) => {
        const newField = {
            ...updatedFormData[fieldName],
            [name]: value,
        };

        const newFormData = {
            ...updatedFormData,
            [fieldName]: newField,
        };

        setUpdatedFormData(newFormData);
        onChange(newFormData, undefined, getFieldId());
    };

    return (
        <div>
            <label>File Location:</label>
            <select
                value={fileLocation}
                onChange={(event) => handleChange("fileLocation", event.target.value)}
            >
                <option value="">Select a file location</option>
                <option value="s3">S3</option>
                <option value="url">URL</option>
                <option value="dataURL">Data URL</option>
            </select>

            {fileLocation === "s3" && (
                <InputField
                    label="S3 Object Key"
                    value={s3ObjectKey}
                    onChangeHandler={(e) => handleChange("s3ObjectKey", e.target.value)}
                />
            )}

            {fileLocation === "url" && (
                <InputField
                    label="URL"
                    value={url}
                    onChangeHandler={(e) => handleChange("url", e.target.value)}
                />
            )}

            {fileLocation === "dataURL" && (
                <InputField
                    label="Data URL"
                    value={dataURL}
                    onChangeHandler={(e) => handleChange("dataURL", e.target.value)}
                />
            )}
        </div>
    );
};

interface InputFieldProps {
    label: string;
    value: string;
    onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChangeHandler }) => {
    return (
        <div>
            <label>{label}:</label>
            <input type="text" value={value} onChange={onChangeHandler} />
        </div>
    );
};
