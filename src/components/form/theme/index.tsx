import { WidgetProps, RegistryWidgetsType } from '@rjsf/utils';
import { withTheme, ThemeProps } from '@rjsf/core';

import { widgets } from './widgets';
import { fields } from './fields';
import { templates } from './templates';

const ThemeObject: ThemeProps = {
  fields: fields,
  templates: templates,
  widgets: widgets,
};

const ThemeForm = withTheme(ThemeObject);
export default ThemeForm;
