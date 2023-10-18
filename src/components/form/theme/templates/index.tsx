import BaseInputTemplate from './BaseInputTemplate';
import ArrayFieldItemTemplate from './ArrayFieldItemTemplate';
import ArrayFieldTemplate from './ArrayFieldTemplate';
import DescriptionField from './DescriptionField';
import TitleField from './TitleField';

import AddButton from './Buttons/AddButton';
import RemoveButton from './Buttons/RemoveButton';
import MoveDownButton from './Buttons/MoveDownButton';
import CopyButton from './Buttons/CopyButton';
import MoveUpButton from './Buttons/MoveUpButton';
import SubmitButton from './Buttons/SubmitButton';
import ObjectFieldTemplate from './ObjectFieldTemplate';
import FieldTemplate from './FieldTemplate';
import { StrictRJSFSchema, TemplatesType } from '@rjsf/utils';
import WrapIfAdditionalTemplate from './WrapIfAdditionalTemplate';

export const templates: Partial<TemplatesType<any, StrictRJSFSchema, any>> = {
  BaseInputTemplate,
  DescriptionFieldTemplate: DescriptionField,
  TitleFieldTemplate: TitleField,
  ArrayFieldItemTemplate,
  ArrayFieldTemplate,
  ObjectFieldTemplate,
  FieldTemplate,
  WrapIfAdditionalTemplate,
  ButtonTemplates: {
    AddButton,
    RemoveButton,
    CopyButton,
    MoveDownButton,
    MoveUpButton,
    SubmitButton,
  },
};
