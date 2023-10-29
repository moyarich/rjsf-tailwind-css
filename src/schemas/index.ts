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

import menuNestedDropdown1Schema from "./menu-dropdown";
import menuNestedDropdown2Schema from "./menu-nested-dropdown";

const defaultSchemaData = {
    Home: homeSchema,
    Menu: menuSchema,
    Random: randomSchema,
    Video: videoSchema,
    Testing: testingSchema,
    "S3 File Upload": s3FileUploadSchema,
    "menu :dropdown 1": menuNestedDropdown1Schema,
    "menu :dropdown 2": menuNestedDropdown2Schema,
    //'Diseases': diseasesSchema,
};
const schemas = {
    Blank: { schema: {}, uiSchema: {}, formData: {} },
    ...defaultSchemaData,
};

export default schemas;
