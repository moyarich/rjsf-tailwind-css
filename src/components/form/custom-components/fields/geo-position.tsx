import { useState } from "react";

import { getWidget, FieldProps, RJSFSchema } from "@rjsf/utils";

interface IGeoPositionProps extends FieldProps {
    // Define any additional props specific to GeoPosition here if needed
}

export const GeoPosition: React.FC<IGeoPositionProps> = (props) => {
    const { name, formData: initialValue, onChange, idSchema, schema, registry } = props;
    const [updatedFormdata, setUpdatedFormData] = useState(initialValue);

    function getFieldId() {
        return `${idSchema.$id}`;
    }
    const { properties: schemaProperties = {} } = schema;
    const properties = Object.keys(schemaProperties);

    const { widgets, formContext, schemaUtils, globalUiOptions } = registry;

    //------------------------
    function log() {
        console.log("-g-etFieldId", getFieldId());
        console.log("previous formData---->", initialValue);
        console.dir(props, { depth: null });

        console.log("properties formData---->", properties);

        console.log("PROPS---->");
        console.dir(props, { depth: null });
    }

    //------------------------

    const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        //const newFormData = { ...formData, [name]: event.target.value } as unknown as T;
        const newFormData = {
            ...updatedFormdata,
            [name]: parseFloat(event.target.value),
        };

        setUpdatedFormData(newFormData);
        onChange(newFormData, undefined, getFieldId());
    };

    const inputClass =
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";

    return (
        <div className="flex gap-2 pb-3">
            <div>
                lat :
                <input
                    className={inputClass}
                    type="number"
                    value={updatedFormdata?.lat ?? ""}
                    onChange={handleChange("lat")}
                />
            </div>
            <div>
                lon :
                <input
                    className={inputClass}
                    type="number"
                    value={updatedFormdata?.lon ?? ""}
                    onChange={handleChange("lon")}
                />
            </div>
            <div>
                moya :
                <input
                    className={inputClass}
                    type="number"
                    value={updatedFormdata?.moya ?? ""}
                    onChange={handleChange("moya")}
                />
            </div>
            <div>hjjj</div>
        </div>
    );
};
