import { RJSFSchema, UiSchema } from '@rjsf/utils';

export const schema: RJSFSchema = {
  title: 'testing form',
  description: 'testing theme',
  type: 'object',
  properties: {
    "videos": {
      "type": "array",
      title: 'Videos',
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          },
          "title": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "url": {
            type: 'string',
            format: 'data-url',
          },
          "thumbnail": {
            type: 'string',
            format: 'data-url',
          },
          "tags": {
            "type": "array",
            "items": {
              "type": "string",
              "enum": ["tag1", "tag2", "tag3"]
            }
          },
          "upload_date": {
            "type": "string",
            "format": "date-time"
          },
          "duration": {
            "type": "string"
          },
          "views": {
            "type": "integer"
          },
          "likes": {
            "type": "integer"
          },
          "dislikes": {
            "type": "integer"
          },
          "uploader": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "username": {
                "type": "string"
              }
            }
          }
        },
        "required": ["id", "title", "url", "thumbnail"]
      }
    },
  },
  
 }


export const uiSchema: UiSchema = {
"ui:widgets":{
  "videos": {
    "items": {
      "id": {
        "ui:widget": "text"
      },
      "title": {
        "ui:widget": "text"
      },
      "description": {
        "ui:widget": "textarea"
      },
    /*  "url": {
        "ui:widget": "url"
      },
      "thumbnail": {
        "ui:widget": "url"
      },
      */
      "tags": {
        "ui:widget": "select",
        "ui:options": {
          "multiple": true,
          //"enum": ["tag1", "tag2", "tag3"]
        }
      },
      "upload_date": {
        "ui:widget": "datetime"
      },
      "duration": {
        "ui:widget": "text"
      },
      "views": {
        "ui:widget": "updown"
      },
      "likes": {
        "ui:widget": "updown"
      },
      "dislikes": {
        "ui:widget": "updown"
      },
      "uploader": {
        "id": {
          "ui:widget": "text"
        },
        "username": {
          "ui:widget": "text"
        }
      }
    }
  }
}
};

export const formData = {};

const sample = {
  schema,
  uiSchema,
  formData
}

export default sample