import { Checkbox } from '../ui/checkbox';
import { RJSVInputAdapter } from '../../types';

export const BooleanField: RJSVInputAdapter<boolean> = ({
  formData,
  schema,
  onChange,
}) => {
  return (
    <label className="flex flex-row items-center gap-3">
      <Checkbox
        className="border-secondary data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground"
        color="primary"
        checked={formData}
        onCheckedChange={(e) => {
          onChange(Boolean(e));
        }}
      />
      <span>{schema.title}</span>
    </label>
  );
};
