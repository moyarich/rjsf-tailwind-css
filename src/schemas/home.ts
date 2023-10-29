import { ISample } from "@/types";
import { RJSFSchema, UiSchema } from "@rjsf/utils";

export const schema: RJSFSchema = {
    $id: "root-schema-id",
    title: "Edit Home",
    description: "Alter the template for the page",
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
        media: {
            type: "object",
            properties: {
                fileLocation: {
                    title: "File Location",
                    type: "string",
                    enum: ["s3", "url", "dataURL"],
                    default: "s3",
                },
                alt: {
                    type: "string",
                    title: "Alt Text",
                },
            },
            dependencies: {
                fileLocation: {
                    oneOf: [
                        {
                            properties: {
                                fileLocation: {
                                    enum: ["s3"],
                                },
                                s3ObjectKey: {
                                    $ref: "#/definitions/s3-file-upload",
                                },
                            },
                            required: ["s3ObjectKey"],
                        },
                        {
                            properties: {
                                fileLocation: {
                                    enum: ["url"],
                                },
                                url: {
                                    type: "string",
                                    title: "URL",
                                },
                            },
                            required: ["url"],
                        },
                        {
                            properties: {
                                fileLocation: {
                                    enum: ["dataURL"],
                                },
                                dataURL: {
                                    type: "string",
                                    title: "Data URL",
                                    format: "data-url",
                                },
                            },
                            required: ["dataURL"],
                        },
                    ],
                },
            },
            required: ["fileLocation"],
        },
    },
    properties: {
        announcements: {
            type: "object",
            properties: {
                title: { type: "string", title: "Title" },
                entries: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: {
                                $ref: "#/definitions/uuid-string",
                            },
                            text: { type: "string", title: "Text" },
                        },
                    },
                },
            },
        },
        hero: {
            type: "object",
            properties: {
                banner: {
                    type: "object",
                    properties: {
                        text: { type: "string", title: "Text" },
                        image: {
                            type: "object",
                            properties: {
                                fileLocation: { type: "string", title: "File Location" },
                                url: { type: "string", title: "URL" },
                                alt: { type: "string", title: "Alt Text" },
                            },
                        },
                    },
                },
                posts: {
                    type: "object",
                    properties: {
                        entries: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    id: {
                                        $ref: "#/definitions/uuid-string",
                                    },
                                    name: { type: "string", title: "Name" },
                                    url: { type: "string", title: "URL" },
                                },
                            },
                        },
                    },
                },
            },
        },
        news: {
            type: "object",
            properties: {
                title: { type: "string", title: "Title" },
                url: { type: "string", title: "URL" },
                noNewsText: { type: "string", title: "No News Text" },
                entries: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: {
                                $ref: "#/definitions/uuid-string",
                            },
                            type: { type: "string", title: "Type" },
                            title: { type: "string", title: "Title" },
                            date: { type: "string", title: "Date" },
                            subTitle: { type: "string", title: "Subtitle" },
                            url: { type: "string", title: "URL" },
                            image: {
                                type: "object",
                                properties: {
                                    fileLocation: { type: "string", title: "File Location" },
                                    url: { type: "string", title: "URL" },
                                    alt: { type: "string", title: "Alt Text" },
                                },
                            },
                        },
                    },
                },
            },
        },
        events: {
            type: "object",
            properties: {
                title: { type: "string", title: "Title" },
                url: { type: "string", title: "URL" },
                noEventsText: { type: "string", title: "No Events Text" },
                entries: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: {
                                $ref: "#/definitions/uuid-string",
                            },
                            title: { type: "string", title: "Title" },
                            description: { type: "string", title: "Description" },
                            time: { type: "string", title: "Time" },
                            url: { type: "string", title: "URL" },
                            image: {
                                type: "object",
                                properties: {
                                    fileLocation: { type: "string", title: "File Location" },
                                    url: { type: "string", title: "URL" },
                                    alt: { type: "string", title: "Alt Text" },
                                },
                            },
                        },
                    },
                },
            },
        },
        footer: {
            type: "object",
            properties: {
                banner: {
                    type: "object",
                    properties: {
                        text: { type: "string", title: "Text" },
                        image: {
                            type: "object",
                            properties: {
                                fileLocation: { type: "string", title: "File Location" },
                                url: { type: "string", title: "URL" },
                                alt: { type: "string", title: "Alt Text" },
                            },
                        },
                    },
                },
                widgets: {
                    type: "object",
                    properties: {
                        copyright: {
                            type: "object",
                            properties: {
                                logoSrc: { type: "string", title: "Logo Source" },
                                logoAlt: { type: "string", title: "Logo Alt Text" },
                                intendedAudienceText: {
                                    type: "string",
                                    title: "Intended Audience Text",
                                },
                                copyrightText: { type: "string", title: "Copyright Text" },
                                sgNumber: { type: "string", title: "SG Number" },
                            },
                        },
                        policy: {
                            type: "object",
                            properties: {
                                title: { type: "string", title: "Title" },
                                menu: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            id: {
                                                $ref: "#/definitions/uuid-string",
                                            },
                                            title: { type: "string", title: "Title" },
                                            url: { type: "string", title: "URL" },
                                            type: { type: "string", title: "Type" },
                                        },
                                    },
                                },
                            },
                        },
                        information: {
                            type: "object",
                            properties: {
                                title: { type: "string", title: "Title" },
                                menu: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            id: {
                                                $ref: "#/definitions/uuid-string",
                                            },
                                            title: { type: "string", title: "Title" },
                                            url: { type: "string", title: "URL" },
                                            type: { type: "string", title: "Type" },
                                        },
                                    },
                                },
                            },
                        },
                        contactInfo: {
                            type: "object",
                            properties: {
                                title: { type: "string", title: "Title" },
                                name: { type: "string", title: "Name" },
                                address: { type: "string", title: "Address" },
                                telephone: { type: "string", title: "Telephone" },
                                fax: { type: "string", title: "Fax" },
                                website: { type: "string", title: "Website" },
                            },
                        },
                    },
                },
            },
        },
    },
    required: ["title"],
};

export const uiSchema: UiSchema = {
    // Customize the UI schema as needed to control the form's appearance
};

export const formData = {
    title: "home v1",
    announcements: {
        entries: [
            {
                id: "072e868e-e205-4712-840a-99eb8f976066",
            },
        ],
        title: "",
    },
    hero: {
        posts: {
            entries: [
                {
                    id: "4b0029ce-f557-45d6-b34c-39590420870c",
                    name: "Cardiovascular, Renal, Metabolism",
                    url: "/TherapeuticArea/1",
                },
                {
                    id: "8ba4def7-230d-4499-bae6-ecda3c91b681",
                    name: "Oncology",
                    url: "/TherapeuticArea/2",
                },
                {
                    id: "a8d893ef-ddca-448c-b6e4-460274df2129",
                    name: "Respiratory & Immunology",
                    url: "/TherapeuticArea/3",
                },
                {
                    id: "d78d83c5-7f34-4443-b676-72d2b73cee0c",
                    name: "Rare Diseases",
                    url: "/TherapeuticArea/4",
                },
            ],
        },
        banner: {
            text: "At __CPNY__, science is at the heart of everything we do. But more than that, science is a way of life. We push the boundaries of science to provide life-changing treatments.",
            image: {
                url: "/images/banner-homepage.png",
                alt: "Banner Alt Text",
                fileLocation: "url",
            },
        },
    },
    news: {
        entries: [
            {
                id: "3ea1de6c-d3f3-4929-b24e-2474cc4b0ae3",
                type: "General News",
                title: "Lynparza PROfound Virtual Launch",
                date: "April 26",
                subTitle:
                    "This launch webinar organized on 29th April 2021, features a global expert, Dr Joaquin Mateo...",
                url: "News/1",
                image: {
                    fileLocation: "url",
                    url: "/images/test-news.jpg",
                    alt: "Virtual Launch",
                },
            },
            {
                id: "f450d180-4546-47f0-8d4e-4eb003971548",
                type: "Video",
                title: "Test News",
                date: "April 27",
                subTitle:
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa...",
                url: "News/5",
                image: {
                    fileLocation: "url",
                    url: "/images/test-news.jpg",
                    alt: "Test News",
                },
            },
        ],
        title: "Latest News",
        url: "/allnews",
        noNewsText: "No news is available at the moment. Please check back later.",
    },
    events: {
        entries: [
            {
                id: "a5200720-fd3c-4f4a-a755-a487a7144ef8",
                title: "Event 1",
                description: "Some placeholder content in a paragraph.",
                time: "now",
                image: {
                    fileLocation: "url",
                    url: "https://github.com/twbs.png",
                    alt: "",
                },
                url: "",
            },
            {
                id: "e14a114a-c294-4e12-afe4-f9c645045ec1",
                title: "Event 2",
                description:
                    "Some placeholder content in a paragraph that goes a little longer so it wraps to a new line.",
                time: "3d",
                image: {
                    fileLocation: "url",
                    url: "https://github.com/twbs.png",
                    alt: "",
                },
                url: "",
            },
            {
                id: "15b43420-5200-4493-b767-724cfe6d49cd",
                title: "Event 3",
                description: "Some placeholder content in a paragraph.",
                time: "1w",
                image: {
                    fileLocation: "url",
                    url: "https://github.com/twbs.png",
                    alt: "",
                },
                url: "",
            },
        ],
        title: "Upcoming Events",
        url: "",
        noEventsText: "No upcoming events are scheduled.",
    },
    footer: {
        widgets: {
            policy: {
                menu: [
                    {
                        id: "cd23c597-8882-4c28-80e8-593a6dbbc227",
                        title: "Legal Notice and Terms of Use",
                        url: "https://www.__CPNY__.com/legal-notice-and-terms-of-use.html",
                        type: "custom",
                    },
                    {
                        id: "7c90cbef-e236-42b8-91d1-43fa6bd8aa87",
                        title: "Privacy Notice",
                        url: "https://www.globalprivacy.__CPNY__.com/",
                        type: "custom",
                    },
                    {
                        id: "1f4db59e-a633-4401-8aeb-4502f0693613",
                        title: "Cookie Policy",
                        url: "https://policy.cookies.com/8e80276f-en-gb.html",
                        type: "custom",
                    },
                ],
                title: "Our Policies",
            },
            information: {
                menu: [
                    {
                        id: "edbc1905-751f-4ae3-8038-1aea5a8cf6cb",
                        title: "Adverse Event Reporting",
                        url: "https://contact__CPNY__medical.__CPNY__.com/",
                        type: "custom",
                    },
                    {
                        id: "1e4bb4ce-e325-4c0e-8054-241905a26eb5",
                        title: "Medical Information Request",
                        url: "https://contact__CPNY__medical.__CPNY__.com/",
                        type: "custom",
                    },
                    {
                        id: "a3faa94d-7f48-4126-8cac-f8e9d4788ebe",
                        title: "Product Quality Complaint",
                        url: "https://contact__CPNY__medical.__CPNY__.com/",
                        type: "custom",
                    },
                    {
                        id: "4ceaa4c1-03b2-42b2-86aa-fbd6f5207e9b",
                        title: "Geoff's Playground",
                        url: "/TestGeoffsPlayground",
                        type: "custom",
                    },
                ],
                title: "Information",
            },
            copyright: {
                logoSrc: "/images/logo-__CPNY__medconnect-white.png",
                logoAlt: "__CPNY__MedConnect Logo",
                intendedAudienceText:
                    "This website is intended for Healthcare Professionals in {{market}}.",
                copyrightText: "© __CPNY__ {{year}}",
                sgNumber: "SG-4973",
            },
            contactInfo: {
                title: "Contact Us",
                name: "__CPNY__ Singapore Pte Ltd",
                address: "Aperia Tower 2, Singapore 339510",
                telephone: "+4700",
                fax: "+3050",
                website: "http://www.__.com/singapore",
            },
        },
        banner: {
            text: "At __CPNY__, we put patients first as we partner with societies to truly understand patients' needs.",
            image: {
                fileLocation: "url",
                url: "/images/footer-banner.jpg",
                alt: "",
            },
        },
    },
};

const sample: ISample = {
    schema,
    uiSchema,
    formData,
};

export default sample;
