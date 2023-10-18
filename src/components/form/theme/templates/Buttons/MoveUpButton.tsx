import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Button } from '../../ui/button';

import {
  FormContextType,
  IconButtonProps,
  RJSFSchema,
  StrictRJSFSchema,
  TranslatableString,
} from '@rjsf/utils';

export default function MoveUpButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({ uiSchema, registry, ...props }: IconButtonProps<T, S, F>) {
  const { translateString } = registry;
  return (
    <Button
      {...props}
      className={`ml-1 ${props?.className ?? ''}`}
      variant="outline"
    >
      <ArrowUpIcon className="mr-1 w-6" />
      {translateString(TranslatableString.MoveUpButton)}
    </Button>
  );
}
