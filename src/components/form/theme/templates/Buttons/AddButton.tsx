import { PlusIcon } from '@radix-ui/react-icons';
import { cn } from '../../utils';
import { Button } from '../../ui/button';

import {
  FormContextType,
  IconButtonProps,
  RJSFSchema,
  StrictRJSFSchema,
  TranslatableString,
  GenericObjectType
} from '@rjsf/utils';

export default function AddButton<
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = GenericObjectType
>({ uiSchema, registry, ...props }: IconButtonProps<T, S, F>) {
  const { translateString } = registry;
  return (
    <Button
    {...props}
    className={cn("ml-1", props?.className ?? '')}>
      <PlusIcon className="mr-1 w-6" />
      {translateString(TranslatableString.AddItemButton)}
    </Button>
  );
}
