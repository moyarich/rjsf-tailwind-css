import {
    ErrorListProps,
    FormContextType,
    RJSFValidationError,
    RJSFSchema,
    StrictRJSFSchema,
    TranslatableString,
} from "@rjsf/utils";

/** The `ErrorList` component is the template that renders the all the errors associated with the fields in the `Form`
 *
 * @param props - The `ErrorListProps` for this component
 */
export default function ErrorList<
    T = any,
    S extends StrictRJSFSchema = RJSFSchema,
    F extends FormContextType = any,
>({ errors, registry }: ErrorListProps<T, S, F>) {
    const { translateString } = registry;
    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow mb-4">
            <div className="p-2">
                <h3 className="text-red-500 font-semibold leading-none tracking-tight">
                    {translateString(TranslatableString.ErrorsLabel)}
                </h3>
            </div>
            <ul className="p-2 grid gap-1">
                {errors.map((error: RJSFValidationError, i: number) => {
                    return (
                        <li
                            key={i}
                            className="mb-1 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0"
                        >
                            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-red-600"></span>
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">{error.stack}</p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
