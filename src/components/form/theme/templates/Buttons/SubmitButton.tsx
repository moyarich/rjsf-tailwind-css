import { EnterIcon } from '@radix-ui/react-icons';
import { Button } from '../../ui/button';

import {
  getSubmitButtonOptions,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  SubmitButtonProps,
} from '@rjsf/utils';

export default function SubmitButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({ uiSchema }: SubmitButtonProps<T, S, F>) {
  const {
    submitText,
    norender,
    props: submitButtonProps = {},
  } = getSubmitButtonOptions<T, S, F>(uiSchema);
  if (norender) {
    return null;
  }
  return (
    <div>
      <Button
        type="submit"
        {...submitButtonProps}
        className={`btn btn-submit ${submitButtonProps?.className ?? ''}`}
      >
        {submitText}
      </Button>
    </div>
  );
}
