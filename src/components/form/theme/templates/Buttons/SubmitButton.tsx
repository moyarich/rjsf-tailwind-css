import { EnterIcon } from '@radix-ui/react-icons';
import { cn } from '../../utils';
import { Button } from '../../ui/button';

import {
  getSubmitButtonOptions,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  SubmitButtonProps,
} from '@rjsf/utils';

export default function SubmitButton<
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = GenericObjectType
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
        className={cn(`btn btn-submit`, submitButtonProps?.className ?? "")}
      >
        {submitText}
      </Button>
    </div>
  );
}
