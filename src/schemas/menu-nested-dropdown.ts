export const schema = {
    title: "Main Menu",
    description: "The main menu for categories",
    type: "object",
    definitions: {
        "uuid-string": {
            $id: "/schemas/uuid-string",
            type: "string",
        },
        menuItem: {
            title: "Menu",
            type: "object",
            properties: {
                id: {
                    $id: "/schemas/uuid-string",
                    type: "string",
                    title: "Id",
                },
                title: {
                    type: "string",
                },
                url: {
                    type: "string",
                },
                type: {
                    type: "string",
                    enum: ["category", "post", "page"],
                },
            },
            required: ["id", "title", "url", "type"],
        },
        "dropdown-menu": {
            title: "Menu",
            type: "object",
            properties: {
                dropdownItems: {
                    type: "array",
                    title: "Dropdown Items",
                    items: {
                        $ref: "#/definitions/menuItem",
                    },
                },
                url: {
                    type: "string",
                },
            },
        },
    },
    properties: {
        title: {
            type: "string",
        },
        entries: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    menu: {
                        allOf: [
                            { $ref: "#/definitions/menuItem" },
                            { $ref: "#/definitions/dropdown-menu" },
                        ],
                    },
                },
            },
        },
    },
    required: ["title", "entries"],
};

export const uiSchema = {
    // Customize the UI schema as needed to control the form's appearance
};

export const formData = {
    entries: [
        {
            menu: {
                id: "222584ec-f96b-4194-ae3d-b10ed83582d4",
                title: "bn",
                url: "bn",
                type: "post",
                dropdownItems: [
                    {
                        id: "5fb2606f-5b17-4a9e-a228-71e2364a44a7",
                        title: "v",
                        url: "bnn",
                        type: "post",
                    },
                ],
            },
        },
    ],
};
const sample = {
    schema,
    uiSchema,
    formData,
};

export default sample;
