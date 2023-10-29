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
                    $ref: "#/definitions/menuItem",
                    /*
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
                    },*/
                    dropdownItems: {
                        type: "array",
                        items: {
                            $ref: "#/definitions/menuItem",
                            /*
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
                            */
                        },
                    },
                },
                required: ["id", "title", "url", "type"],
            },
        },
    },
    required: ["title", "entries"],
};

export const uiSchema = {
    // Customize the UI schema as needed to control the form's appearance
};

export const formData = {};

const sample = {
    schema,
    uiSchema,
    formData,
};

export default sample;
