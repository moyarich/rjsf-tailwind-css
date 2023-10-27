export const schema = {
    title: "Main Menu",
    description: "The main menu for categories",
    type: "object",
    properties: {
        type: "array",
        items: {
            type: "object",
            properties: {
                id: {
                    type: "string",
                    title: "ID",
                },
                title: {
                    type: "string",
                    title: "Title",
                },
                url: {
                    type: "string",
                    title: "URL",
                },
                type: {
                    type: "string",
                    title: "Type",
                },
                dropdownItems: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: {
                                type: "string",
                                title: "ID",
                            },
                            title: {
                                type: "string",
                                title: "Title",
                            },
                            url: {
                                type: "string",
                                title: "URL",
                            },
                            type: {
                                type: "string",
                                title: "Type",
                            },
                        },
                    },
                },
            },
        },
    },
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
