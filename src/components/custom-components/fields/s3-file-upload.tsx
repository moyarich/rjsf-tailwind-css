import { FC, ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { FieldProps } from "@rjsf/utils";

import { Auth, Storage } from "aws-amplify";

const S3FileUpload: FC<FieldProps<string>> = (props) => {
    const {
        onChange,
        formData,
        disabled,
        readonly,
        required,
        multiple,
        value,
        options,
        registry,
        formContext,
    } = props;
    const [text, setText] = useState<string>(formData || "");
    const [file, setFile] = useState<File | null>(null);

    console.log("formContext", formContext);

    const accept = options?.accept ? String(options.accept) : undefined;

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }

        const selectedFile: File = e.target.files[0];

        if (selectedFile) {
            const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase();
            const fileName = selectedFile.name;
            setFile(selectedFile);

            //Upload to S3 ...
            let s3Key = fileName;

            if (formContext.handleS3FileUpload) {
                const s3Result = await formContext.handleS3FileUpload(selectedFile);
                s3Key = s3Result.key;
            }

            onChange(s3Key);
            setText(s3Key);
        }
    };

    return (
        <div className="s3-file-upload">
            <div className="text-sm text-muted-foreground my-1">Upload file to S3</div>
            <div className="flex flex-col gap-3">
                <input
                    id="video"
                    type="file"
                    onChange={handleFileChange}
                    accept={accept}
                    className="file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:border file:border-solid file:border-blue-700 file:rounded-md border-blue-600"
                />
                {file ? (
                    <div className="file-preview">
                        <FilePreview file={file} />
                    </div>
                ) : null}

                <input
                    className="form-control"
                    value={text}
                    type="text"
                    onChange={({ target: { value } }) => {
                        onChange(value);
                        setText(value);
                    }}
                />
            </div>
        </div>
    );
};
export default S3FileUpload;

export interface IFilePreviewProps {
    file: File;
}

export const FilePreview = function ({ file }: IFilePreviewProps) {
    const { type } = file;
    const objectURL = URL.createObjectURL(file);

    if (type.indexOf("image") !== -1) {
        return <img src={objectURL} style={{ maxWidth: "100%" }} className="file-preview" />;
    } else if (type.indexOf("video") !== -1) {
        return (
            <video width={320} height={320} controls autoPlay={true} muted={true}>
                <source src={objectURL} />
            </video>
        );
    }
    return null;
};
