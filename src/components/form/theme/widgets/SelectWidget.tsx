import { ChangeEvent, FocusEvent } from 'react';
import {
  ariaDescribedByIds,
  FormContextType,
  enumOptionsIndexForValue,
  enumOptionsValueForIndex,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
  GenericObjectType
} from '@rjsf/utils';

export default function SelectWidget<
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = GenericObjectType
>({
  schema,
  id,
  options,
  required,
  disabled,
  readonly,
  value,
  multiple,
  autofocus,
  onChange,
  onBlur,
  onFocus,
  placeholder,
  rawErrors = [],
}: WidgetProps<T, S, F>) {
  console.log("SelectWidget options------>",options )
  const { enum:enumOptions, enumDisabled, emptyValue: optEmptyValue } = options;

  const emptyValue = multiple ? [] : '';

  function getValue(event: FocusEvent | ChangeEvent | any, multiple?: boolean) {
    if (multiple) {
      return [].slice
        .call(event.target.options as any)
        .filter((o: any) => o.selected)
        .map((o: any) => o.value);
    } else {
      return event.target.value;
    }
  }
  const selectedIndexes = enumOptionsIndexForValue<S>(
    value,
    enumOptions,
    multiple
  );

  return (
    <select
      id={id}
      name={id}
      value={
        typeof selectedIndexes === 'undefined' ? emptyValue : selectedIndexes
      }
      required={required}
      multiple={multiple}
      disabled={disabled || readonly}
      autoFocus={autofocus}
      className={`${
        rawErrors.length > 0 ? 'border-red-500' : 'border'
      } rounded p-2 focus:outline-none`}
      onBlur={
        onBlur &&
        ((event: FocusEvent) => {
          const newValue = getValue(event, multiple);
          onBlur(
            id,
            enumOptionsValueForIndex<S>(newValue, enumOptions, optEmptyValue)
          );
        })
      }
      onFocus={
        onFocus &&
        ((event: FocusEvent) => {
          const newValue = getValue(event, multiple);
          onFocus(
            id,
            enumOptionsValueForIndex<S>(newValue, enumOptions, optEmptyValue)
          );
        })
      }
      onChange={(event: ChangeEvent) => {
        const newValue = getValue(event, multiple);
        onChange(
          enumOptionsValueForIndex<S>(newValue, enumOptions, optEmptyValue)
        );
      }}
      aria-describedby={ariaDescribedByIds<T>(id)}
    >
      {!multiple && schema.default === undefined && (
        <option value="">{placeholder}</option>
      )}
      {(enumOptions as any).map(({ value, label }: any, i: number) => {
        const disabled: any =
          Array.isArray(enumDisabled) &&
          (enumDisabled as any).indexOf(value) != -1;
        return (
          <option key={i} id={label} value={String(i)} disabled={disabled}>
            {label}
          </option>
        );
      })}
    </select>
  );
}
