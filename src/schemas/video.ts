import { RJSFSchema, UiSchema } from '@rjsf/utils';

export const schema: RJSFSchema = {
  type: 'object',
  properties: {
    title: { type: 'string', title: 'Title' },
    description: { type: 'string', title: 'Description' },
    url: { type: 'string', title: 'Video URL' },
    thumbnail: { type: 'string', title: 'Thumbnail URL' },
    tags: { type: 'array', title: 'Tags', items: { type: 'string' } },
    upload_date: { type: 'string', title: 'Upload Date', format: 'date-time' },
    duration: { type: 'string', title: 'Duration' },
    views: { type: 'integer', title: 'Views' },
    likes: { type: 'integer', title: 'Likes' },
    dislikes: { type: 'integer', title: 'Dislikes' },
    uploader: {
      type: 'object',
      properties: {
        id: { type: 'string', title: 'Uploader ID' },
        username: { type: 'string', title: 'Uploader Username' },
        profile_image: { type: 'string', title: 'Uploader Profile Image URL' },
      },
    },
  },
};

export const uiSchema: UiSchema = {
  title: {
    'ui:placeholder': 'Enter video title',
  },
  description: {
    'ui:widget': 'textarea',
    'ui:placeholder': 'Enter video description',
  },
  url: {
    'ui:placeholder': 'Enter video URL',
  },
  thumbnail: {
    'ui:placeholder': 'Enter thumbnail URL',
  },
  tags: {
    'ui:options': {
      addable: true,
      orderable: true,
      removable: true,
    },
  },
  upload_date: {
    'ui:widget': 'alt-datetime',
  },
  duration: {
    'ui:placeholder': '00:00:00',
  },
  uploader: {
    id: {
      'ui:placeholder': "Enter uploader's ID",
    },
    username: {
      'ui:placeholder': "Enter uploader's username",
    },
    profile_image: {
      'ui:placeholder': "Enter uploader's profile image URL",
    },
  },
};

export const formData = {
  id: 'unique_video_id',
  title: 'Video Title',
  description: 'A short description of the video content.',
  url: 'https://example.com/video_url',
  thumbnail: 'https://example.com/thumbnail_url.jpg',
  tags: ['tag1', 'tag2', 'tag3'],
  upload_date: '2023-10-17T14:30:00Z',
  duration: '00:10:30',
  views: 12345,
  likes: 987,
  dislikes: 123,
  uploader: {
    id: 'user123',
    username: 'user123_username',
  },
};

const sample = {
  schema,
  uiSchema,
  formData
}

export default sample
