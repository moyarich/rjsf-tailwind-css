import {
  ADDITIONAL_PROPERTY_FLAG,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  TranslatableString,
  WrapIfAdditionalTemplateProps,
} from '@rjsf/utils';

import { cn } from '../utils';

import { Label } from '../ui/label';

export default function WrapIfAdditionalTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: WrapIfAdditionalTemplateProps<T, S, F>) {
  const {
    id,
    classNames,
    style,
    disabled,
    label,
    onKeyChange,
    onDropPropertyClick,
    readonly,
    required,
    schema,
    children,
    uiSchema,
    registry,
  } = props;
  const { templates, translateString } = registry;
  // Button templates are not overridden in the uiSchema
  const { RemoveButton } = templates.ButtonTemplates;
  const keyLabel = translateString(TranslatableString.KeyLabel, [label]);
  const additional = ADDITIONAL_PROPERTY_FLAG in schema;
  const REQUIRED_FIELD_SYMBOL = '*';

  return (
    <div
      className={cn('wrap-if-additional-template', classNames)}
      style={style}
    >
      <div className="grid grid-cols-12">
        <div className="col-span-5 form-additional">
          <div className="form-group">
            <Label htmlFor={`${id}-key`}>
              {keyLabel}
              {required && (
                <span className="required ml-1">{REQUIRED_FIELD_SYMBOL}</span>
              )}
            </Label>

            <input
              className="form-input"
              type="text"
              id={`${id}-key`}
              onBlur={(event) => onKeyChange(event.target.value)}
              defaultValue={label}
            />
          </div>
        </div>
        <div className="form-additional form-group col-span-5">{children}</div>
        <div className="col-span-2">
          <RemoveButton
            className="array-item-remove btn-block"
            style={{ border: '0' }}
            disabled={disabled || readonly}
            onClick={onDropPropertyClick(label)}
            uiSchema={uiSchema}
            registry={registry}
          />
        </div>
      </div>
    </div>
  );
}
