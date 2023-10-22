/*
import { RJSFSchema, UiSchema } from '@rjsf/utils';


export const schema: RJSFSchema = {};

export const uiSchema: UiSchema = {
  // Customize the UI schema as needed to control the form's appearance
};

export const formData = {};
*/

// Import your schema and uiSchema data here
import homeSchema from "./home";
import menuSchema from "./menu";
import randomSchema from "./random";
import videoSchema from "./video";
import testingSchema from "./_testing";
import s3FileUploadSchema from "./s3-file-upload";

const defaultSchemaData = {
    Home: homeSchema,
    Menu: menuSchema,
    Random: randomSchema,
    Video: videoSchema,
    Testing: testingSchema,
    'S3 File Upload': s3FileUploadSchema
    //'Diseases': diseasesSchema,
};
const schemas = {
  Blank: { schema: {}, uiSchema: {}, formData: {} },
  ...defaultSchemaData
}


export default schemas