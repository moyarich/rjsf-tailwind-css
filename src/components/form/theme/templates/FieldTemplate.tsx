import {
  FieldTemplateProps,
  FormContextType,
  getTemplate,
  getUiOptions,
  RJSFSchema,
  StrictRJSFSchema,
  GenericObjectType
} from '@rjsf/utils';

import { Label } from '../ui/label';

export default function FieldTemplate<
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = GenericObjectType
>({
  id,
  children,
  displayLabel,
  rawErrors = [],
  errors,
  help,
  description,
  rawDescription,
  classNames,
  style,
  disabled,
  label,
  hidden,
  onDropPropertyClick,
  onKeyChange,
  readonly,
  required,
  schema,
  uiSchema,
  registry,
}: FieldTemplateProps<T, S, F>) {
  const uiOptions = getUiOptions(uiSchema);
  const WrapIfAdditionalTemplate = getTemplate<
    'WrapIfAdditionalTemplate',
    T,
    S,
    F
  >('WrapIfAdditionalTemplate', registry, uiOptions);
  if (hidden) {
    return <div className="hidden">{children}</div>;
  }

  const REQUIRED_FIELD_SYMBOL = '*';

  return (
    <WrapIfAdditionalTemplate
      classNames={classNames}
      style={style}
      disabled={disabled}
      id={id}
      label={label}
      onDropPropertyClick={onDropPropertyClick}
      onKeyChange={onKeyChange}
      readonly={readonly}
      required={required}
      schema={schema}
      uiSchema={uiSchema}
      registry={registry}
    >
      <div className="field-template">
        {displayLabel && (
          <Label
            htmlFor={id}
            className={rawErrors.length > 0 ? 'text-danger' : ''}
          >
            {label}
            {required ? REQUIRED_FIELD_SYMBOL : null}
          </Label>
        )}
        {children}
        {displayLabel && rawDescription && (
          <div
            className={`font-inter text-sm ${
              rawErrors.length > 0 ? 'text-danger' : 'text-muted-foreground'
            }`}
          >
            {description}
          </div>
        )}
        {errors}
        {help}
      </div>
    </WrapIfAdditionalTemplate>
  );
}
