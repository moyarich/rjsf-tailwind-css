import { ChangeEvent, FocusEvent } from 'react';
import { Input } from '../ui/input';

import {
  FormContextType,
  GenericObjectType,
  RJSFSchema,
  StrictRJSFSchema,
  BaseInputTemplateProps,
  ariaDescribedByIds,
  examplesId,
  getInputProps,
} from '@rjsf/utils';

const INPUT_STYLE = {
  width: '100%',
};

export default function BaseInputTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: BaseInputTemplateProps<T, S, F>) {
  const {
    disabled,
    formContext,
    id,
    onBlur,
    onChange,
    onChangeOverride,
    onFocus,
    options,
    placeholder,
    readonly,
    schema,
    value,
    type,
  } = props;
  const inputProps = getInputProps<T, S, F>(schema, type, options, false);
  const { readonlyAsDisabled = true } = formContext as GenericObjectType;

  const handleNumberChange = onChangeOverride
    ? onChangeOverride
    : ({ target }: ChangeEvent<HTMLInputElement>) =>
        onChange(
          target.value === '' ? options.emptyValue : parseFloat(target.value)
        );

  const handleTextChange = onChangeOverride
    ? onChangeOverride
    : ({ target }: ChangeEvent<HTMLInputElement>) =>
        onChange(target.value === '' ? options.emptyValue : target.value);

  const handleBlur = ({ target }: FocusEvent<HTMLInputElement>) =>
    onBlur(id, target.value);

  const handleFocus = ({ target }: FocusEvent<HTMLInputElement>) =>
    onFocus(id, target.value);

  const InputTypeMap = {
    string: 'text',
    integer: 'number',
    datetime: 'datetime-local',
    textarea: 'text',
  };

  const input =
    inputProps.type === 'number' || inputProps.type === 'integer' ? (
      <Input
        className="base-input-template-number"
        disabled={disabled || (readonlyAsDisabled && readonly)}
        id={id}
        type="number"
        name={id}
        onBlur={!readonly ? handleBlur : undefined}
        onChange={!readonly ? handleNumberChange : undefined}
        onFocus={!readonly ? handleFocus : undefined}
        placeholder={placeholder}
        style={INPUT_STYLE}
        list={schema.examples ? examplesId<T>(id) : undefined}
        value={value as number}
        aria-describedby={ariaDescribedByIds<T>(id, !!schema.examples)}
      />
    ) : (
      <Input
        className="base-input-template-native"
        disabled={disabled || (readonlyAsDisabled && readonly)}
        id={id}
        type={
          InputTypeMap?.[inputProps.type as keyof typeof InputTypeMap] ??
          inputProps.type
        }
        onBlur={!readonly ? handleBlur : undefined}
        onChange={!readonly ? handleTextChange : undefined}
        onFocus={!readonly ? handleFocus : undefined}
        placeholder={placeholder}
        style={INPUT_STYLE}
        list={schema.examples ? examplesId<T>(id) : undefined}
        value={value as string}
        aria-describedby={ariaDescribedByIds<T>(id, !!schema.examples)}
      />
    );

  return (
    <>
      {input}
      {Array.isArray(schema.examples) && (
        <datalist id={examplesId<T>(id)}>
          {(schema.examples as string[])
            .concat(
              schema.default && !schema.examples.includes(schema.default)
                ? ([schema.default] as string[])
                : []
            )
            .map((example) => {
              return <option key={example} value={example} />;
            })}
        </datalist>
      )}
    </>
  );
}
