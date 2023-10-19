import {
  ADDITIONAL_PROPERTY_FLAG,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  TranslatableString,
  WrapIfAdditionalTemplateProps,
  GenericObjectType
} from '@rjsf/utils';

import { cn } from '../utils';

import { Label } from '../ui/label';
import { Input } from '../ui/input';

export default function WrapIfAdditionalTemplate<
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = GenericObjectType
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

  if (!additional) {
    return (
      <div className={classNames} style={style}>
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn('wrap-if-additional-template flex flex-wrap items-end gap-2', classNames)}
      style={style}
    >
     
        <div className="flex-1 ">

            <Label htmlFor={`${id}-key`}>
              {keyLabel}
              {required && (
                <span className="required ml-1">{REQUIRED_FIELD_SYMBOL}</span>
              )}
            </Label>

            <Input
              className="form-input"
              type="text"
              id={`${id}-key`}
              onBlur={(event) => onKeyChange(event.target.value)}
              defaultValue={label}
            />
        </div>
        <div className="form-additional flex-1">{children}</div>
        <div className="">
          <RemoveButton
            className="array-item-remove btn-block"
            style={{ border: '0' }}
            disabled={disabled || readonly}
            onClick={()=>{onDropPropertyClick(label)}}
            uiSchema={uiSchema}
            registry={registry}
          />
        </div>
      </div>
    
  );
}
