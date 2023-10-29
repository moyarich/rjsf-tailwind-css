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
                    title: "Dropdown Items",
                    type: "array",
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
                allOf: [
                    { $ref: "#/definitions/menuItem" },
                    { $ref: "#/definitions/dropdown-menu" },
                ],
            },
        },
    },
    required: ["title", "entries"],
};
export const uiSchema = {
    // Customize the UI schema as needed to control the form's appearance
};

export const formData2 = {
    entries: [
        {
            type: "post",
            title: "bvnb",
            url: "vcn",
            dropdownMenu: [
                {
                    id: "61d3dbbe-ed2e-48b0-9a49-d38e88b21339",
                    title: " cvxb",
                    url: "vbxb",
                },
            ],
            id: "0fa42d59-e9f2-4001-8e41-add07a7163d4",
        },
    ],
};

export const formData = {
    title: "header menu",
    entries: [
        {
            id: "7f2c5422-6061-4483-8ef5-4c37632de2e1",
            title: "Home",
            url: "/home",
            type: "category",
            dropdownItems: [],
        },
        {
            id: "4f59d742-0b45-4e47-84e2-1b5db63f7a51",
            title: "Therapeutic Areas",
            url: "/therapeuticAreas",
            type: "category",
            dropdownItems: [
                {
                    id: "1f27bb25-79f2-4c1e-8a06-6b7a9a20c8f6",
                    title: "Cardiovascular, Renal & Metabolism",
                    url: "/therapeutic/1",
                    type: "post",
                },
                {
                    id: "6a0de3c0-0a84-4c0a-9bf1-2e779aad90f9",
                    title: "Type 2 Diabetes",
                    url: "/disease/1",
                },
                {
                    id: "9e3c8d01-48d3-4cf5-aae6-0a6e073f44ec",
                    title: "Heart Failure",
                    url: "/disease/4",
                },
                {
                    id: "d9a24a5d-01c3-451a-8cd6-4dd8830725c0",
                    title: "Chronic Kidney Disease",
                    url: "/disease/5",
                },
            ],
        },
        {
            id: "a9f738c6-178e-4240-a0ca-5a3b0e0634fc",
            title: "Brands",
            url: "/brands",
            type: "page",
            dropdownItems: [
                {
                    id: "8ec8153c-1460-4c9e-8a78-3fb1e7c93b9b",
                    title: "Fasenra",
                    url: "/brand/181/Fasenra",
                },
                {
                    id: "47b75ab1-7f17-478c-90d2-8fb535907ead",
                    title: "Forxiga",
                    url: "/brand/1/Forxiga",
                },
                {
                    id: "edf1a9f4-cf0c-49b0-a0f2-7a2e0c1ce754",
                    title: "Lynparza",
                    url: "/brand/2/Lynparza",
                },
                // Add more items with UUID values as IDs
            ],
        },
        {
            id: "a9f738c6-178e-4240-a0ca-5a3b0e0634fc",
            title: "Videos",
            url: "/videos",
            type: "page",
        },
    ],
};

const sample = {
    schema,
    uiSchema,
    formData,
};

export default sample;
