import { FC, useState } from "react";
import { FieldProps } from "@rjsf/utils";
import { v4 as uuidv4 } from "uuid";

export const UUIDInput: FC<FieldProps<string>> = ({ id, onChange, formData }) => {
    const [confirming, setConfirming] = useState(false);

    const handleGenerateUUID = () => {
        if (formData && formData.trim() !== "" && !confirming) {
            setConfirming(true);
            console.log("confirming, ", confirming);
        } else {
            const newUUID = uuidv4();
            onChange(newUUID);
            setConfirming(false);
        }
    };

    const handleConfirm = () => {
        const newUUID = uuidv4();
        onChange(newUUID);
        setConfirming(false);
    };

    return (
        <div className="mb-4 p-2">
            <input
                type="text"
                id={id}
                value={formData || ""}
                onChange={(e) => onChange(e.target.value)}
                className="w-full text-[0.8rem]  bg-gray-200 border border-gray-400 rounded py-2 px-4 focus:outline-none focus:border-blue-400"
            />

            <button
                type="button"
                onClick={handleGenerateUUID}
                className="mt-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
            >
                Generate UUID
            </button>

            {confirming && (
                <div className="mt-2 text-sm px-4 py-3 mb-4 rounded-lg shadow-lg">
                    <p className="text-[0.8rem] text-primary">
                        Are you sure you want to generate a new UUID?
                    </p>
                    <div className="flex gap-2 mt-2">
                        <button
                            type="button"
                            onClick={handleConfirm}
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-secondary text-secondary-foreground shadow hover:bg-secondary/90 h-9 px-4 py-2"
                        >
                            Accept
                        </button>
                        <button
                            type="button"
                            onClick={() => setConfirming(false)}
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-muted text-muted-foreground shadow hover:bg-muted/90 h-9 px-4 py-2"
                        >
                            Deny
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UUIDInput;
