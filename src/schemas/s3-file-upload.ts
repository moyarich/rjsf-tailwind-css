import { RJSFSchema, UiSchema } from "@rjsf/utils";

export const uiSchema: UiSchema = {
    // Customize the UI schema as needed to control the form's appearance
};

export const formData = {};

export const schema: RJSFSchema = {
    title: "A registration form",
    description: "A custom-field form example.",
    type: "object",
    definitions: {
        specialString: {
            $id: "/schemas/specialString",
            type: "string",
        },
        "uuid-string": {
            $id: "/schemas/uuid-string",
            type: "string",
        },
        "s3-file-upload": {
            type: "object",
            properties: {
                id: {
                    $id: "/schemas/uuid-string",
                    type: "string",
                    title: "Id",
                },
                s3ObjectKey: {
                    $id: "/schemas/s3-file-upload",
                    type: "string",
                    title: "S3 Object Key",
                },
                description: {
                    type: "string",
                    default: "Default name",
                },
            },
        },
    },
    properties: {
        s3Videos: {
            type: "array",
            title: "S3 Videos",
            items: {
                $ref: "#/definitions/s3-file-upload",
            },
        },
    },
};

const sample = {
    schema,
    uiSchema,
    formData,
};

export default sample;
