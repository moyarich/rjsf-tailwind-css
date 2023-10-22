import { ISample } from '@/types';
import { RJSFSchema, UiSchema } from '@rjsf/utils';

export const schema: RJSFSchema = {
  $id: 'root-schema-id',
  title: 'Edit Home',
  description: 'Alter the template for the page',
  type: 'object',
  properties: {
    announcements: {
      type: 'object',
      properties: {
        title: { type: 'string', title: 'Title' },
        entries: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', title: 'ID' },
              text: { type: 'string', title: 'Text' },
            },
          },
        },
      },
    },
    hero: {
      type: 'object',
      properties: {
        banner: {
          type: 'object',
          properties: {
            text: { type: 'string', title: 'Text' },
            image: {
              type: 'object',
              properties: {
                url: { type: 'string', title: 'URL' },
                alt: { type: 'string', title: 'Alt Text' },
              },
            },
          },
        },
        posts: {
          type: 'object',
          properties: {
            entries: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string', title: 'ID' },
                  name: { type: 'string', title: 'Name' },
                  url: { type: 'string', title: 'URL' },
                },
              },
            },
          },
        },
      },
    },
    news: {
      type: 'object',
      properties: {
        title: { type: 'string', title: 'Title' },
        url: { type: 'string', title: 'URL' },
        noNewsText: { type: 'string', title: 'No News Text' },
        entries: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', title: 'ID' },
              type: { type: 'string', title: 'Type' },
              title: { type: 'string', title: 'Title' },
              date: { type: 'string', title: 'Date' },
              subTitle: { type: 'string', title: 'Subtitle' },
              url: { type: 'string', title: 'URL' },
              image: {
                type: 'object',
                properties: {
                  url: { type: 'string', title: 'URL' },
                  alt: { type: 'string', title: 'Alt Text' },
                },
              },
            },
          },
        },
      },
    },
    events: {
      type: 'object',
      properties: {
        title: { type: 'string', title: 'Title' },
        url: { type: 'string', title: 'URL' },
        noEventsText: { type: 'string', title: 'No Events Text' },
        entries: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', title: 'ID' },
              title: { type: 'string', title: 'Title' },
              description: { type: 'string', title: 'Description' },
              time: { type: 'string', title: 'Time' },
              url: { type: 'string', title: 'URL' },
              image: {
                type: 'object',
                properties: {
                  url: { type: 'string', title: 'URL' },
                  alt: { type: 'string', title: 'Alt Text' },
                },
              },
            },
          },
        },
      },
    },
    footer: {
      type: 'object',
      properties: {
        banner: {
          type: 'object',
          properties: {
            text: { type: 'string', title: 'Text' },
            image: {
              type: 'object',
              properties: {
                url: { type: 'string', title: 'URL' },
                alt: { type: 'string', title: 'Alt Text' },
              },
            },
          },
        },
        widgets: {
          type: 'object',
          properties: {
            copyright: {
              type: 'object',
              properties: {
                logoSrc: { type: 'string', title: 'Logo Source' },
                logoAlt: { type: 'string', title: 'Logo Alt Text' },
                intendedAudienceText: {
                  type: 'string',
                  title: 'Intended Audience Text',
                },
                copyrightText: { type: 'string', title: 'Copyright Text' },
                sgNumber: { type: 'string', title: 'SG Number' },
              },
            },
            policy: {
              type: 'object',
              properties: {
                title: { type: 'string', title: 'Title' },
                menu: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', title: 'ID' },
                      title: { type: 'string', title: 'Title' },
                      url: { type: 'string', title: 'URL' },
                      type: { type: 'string', title: 'Type' },
                    },
                  },
                },
              },
            },
            information: {
              type: 'object',
              properties: {
                title: { type: 'string', title: 'Title' },
                menu: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', title: 'ID' },
                      title: { type: 'string', title: 'Title' },
                      url: { type: 'string', title: 'URL' },
                      type: { type: 'string', title: 'Type' },
                    },
                  },
                },
              },
            },
            contactInfo: {
              type: 'object',
              properties: {
                title: { type: 'string', title: 'Title' },
                name: { type: 'string', title: 'Name' },
                address: { type: 'string', title: 'Address' },
                telephone: { type: 'string', title: 'Telephone' },
                fax: { type: 'string', title: 'Fax' },
                website: { type: 'string', title: 'Website' },
              },
            },
          },
        },
      },
    },
  },
};

export const uiSchema: UiSchema = {
  // Customize the UI schema as needed to control the form's appearance
};

export const formData = {
  announcements: {
    title: '',
    entries: [],
  },
  hero: {
    banner: {
      text: 'At __CPNY__, science is at the heart of everything we do. But more than that, science is a way of life. We push the boundaries of science to provide life-changing treatments.',
      image: {
        url: '/images/banner-homepage.png',
        alt: 'Banner Alt Text',
      },
    },
    posts: {
      entries: [
        {
          id: '4bdea75e-4145-4e70-8f18-2dddc932e24b',
          name: 'Cardiovascular, Renal, Metabolism',
          url: '/TherapeuticArea/1',
        },
        {
          id: '2f017a95-d1db-49a3-b49f-74b17f94f5c5',
          name: 'Oncology',
          url: '/TherapeuticArea/2',
        },
        {
          id: '6c175935-8704-4b02-a1d0-4ac1920c9e90',
          name: 'Respiratory & Immunology',
          url: '/TherapeuticArea/3',
        },
        {
          id: '3fdab0a3-0cc9-477e-8cc5-61d9e7b7ee00',
          name: 'Rare Diseases',
          url: '/TherapeuticArea/4',
        },
      ],
    },
  },
  news: {
    title: 'Latest News',
    url: '/allnews',
    noNewsText: 'No news is available at the moment. Please check back later.',
    entries: [
      {
        id: '3ea1de6c-d3f3-4929-b24e-2474cc4b0ae3',
        type: 'General News',
        title: 'Lynparza PROfound Virtual Launch',
        date: 'April 26',
        subTitle:
          'This launch webinar organized on 29th April 2021, features a global expert, Dr Joaquin Mateo...',
        url: 'News/1',
        image: {
          url: '/images/test-news.jpg',
          alt: 'Virtual Launch',
        },
      },
      {
        id: 'f450d180-4546-47f0-8d4e-4eb003971548',
        type: 'Video',
        title: 'Test News',
        date: 'April 27',
        subTitle:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa...',
        url: 'News/5',
        image: {
          url: '/images/test-news.jpg',
          alt: 'Test News',
        },
      },
    ],
  },

  events: {
    title: 'Upcoming Events',
    url: '',
    noEventsText: 'No upcoming events are scheduled.',
    entries: [
      {
        id: '1',
        title: 'Event 1',
        description: 'Some placeholder content in a paragraph.',
        time: 'now',

        image: {
          url: 'https://github.com/twbs.png',
          alt: '',
        },
        url: '',
      },
      {
        id: '2',
        title: 'Event 2',
        description:
          'Some placeholder content in a paragraph that goes a little longer so it wraps to a new line.',
        time: '3d',
        image: {
          url: 'https://github.com/twbs.png',
          alt: '',
        },
        url: '',
      },
      {
        id: '3',
        title: 'Event 3',
        description: 'Some placeholder content in a paragraph.',
        time: '1w',
        image: {
          url: 'https://github.com/twbs.png',
          alt: '',
        },
        url: '',
      },
    ],
  },

  footer: {
    banner: {
      text: "At __CPNY__, we put patients first as we partner with societies to truly understand patients' needs.",
      image: {
        url: '/images/footer-banner.jpg',
        alt: '',
      },
    },
    widgets: {
      copyright: {
        logoSrc: '/images/logo-__CPNY__medconnect-white.png',
        logoAlt: '__CPNY__MedConnect Logo',
        intendedAudienceText:
          'This website is intended for Healthcare Professionals in {{market}}.',
        copyrightText: '© __CPNY__ {{year}}',
        sgNumber: 'SG-4973',
      },
      policy: {
        title: 'Our Policies',
        menu: [
          {
            id: '1',
            title: 'Legal Notice and Terms of Use',
            url: 'https://www.__CPNY__.com/legal-notice-and-terms-of-use.html',
            type: 'custom',
          },
          {
            id: '2',
            title: 'Privacy Notice',
            url: 'https://www.globalprivacy.__CPNY__.com/',
            type: 'custom',
          },
          {
            id: '3',
            title: 'Cookie Policy',
            url: 'https://policy.cookies.com/8e80276f-en-gb.html',
            type: 'custom',
          },
        ],
      },

      information: {
        title: 'Information',
        menu: [
          {
            id: '4',
            title: 'Adverse Event Reporting',
            url: 'https://contact__CPNY__medical.__CPNY__.com/',
            type: 'custom',
          },
          {
            id: '5',
            title: 'Medical Information Request',
            url: 'https://contact__CPNY__medical.__CPNY__.com/',
            type: 'custom',
          },
          {
            id: '6',
            title: 'Product Quality Complaint',
            url: 'https://contact__CPNY__medical.__CPNY__.com/',
            type: 'custom',
          },
          {
            id: '7',
            title: "Geoff's Playground",
            url: '/TestGeoffsPlayground',
            type: 'custom',
          },
        ],
      },

      contactInfo: {
        title: 'Contact Us',
        name: '__CPNY__ Singapore Pte Ltd',
        address: 'Aperia Tower 2, Singapore 339510',
        telephone: '+4700',
        fax: '+3050',
        website: 'http://www.__.com/singapore',
      },
    },
  },
};

const sample : ISample = {
  schema,
  uiSchema,
  formData
}

export default sample