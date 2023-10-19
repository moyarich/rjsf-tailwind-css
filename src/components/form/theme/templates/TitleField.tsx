import {
  FormContextType,
  TitleFieldProps,
  RJSFSchema,
  StrictRJSFSchema,
  GenericObjectType
} from '@rjsf/utils';

const REQUIRED_FIELD_SYMBOL = '*';

/** The `TitleField` is the template to use to render the title of a field
 *
 * @param props - The `TitleFieldProps` for this component
 */
export default function TitleField<
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = GenericObjectType
>(props: TitleFieldProps<T, S, F>) {
  const { id, title, required } = props;
  return (
    <legend id={id} className="title-field text-sm font-medium leading-none">
      {title}
      {required && (
        <span className="ml-1 required">{REQUIRED_FIELD_SYMBOL}</span>
      )}
    </legend>
  );
}
