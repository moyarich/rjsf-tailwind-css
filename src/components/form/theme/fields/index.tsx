import { RegistryFieldsType } from '@rjsf/utils';
import { RJSVInputAdapter } from '../types';

import { BooleanField } from './BooleanField';

export const fields: Record<keyof RegistryFieldsType, RJSVInputAdapter<any>> = {
  //StringField: TextInputAdapter,
  BooleanField: BooleanField,
};
