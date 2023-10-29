import { FC, useState } from "react";
import { FieldProps } from "@rjsf/utils";
import { v4 as uuidv4 } from "uuid";

const UUIDInput: FC<FieldProps<string>> = ({ id, onChange, formData }) => {
    const [confirming, setConfirming] = useState(false);

    const handleGenerateUUID = () => {
        if (formData && formData.trim() !== "" && !confirming) {
            setConfirming(true);
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
        <div className="mb-4">
            <label htmlFor={id} className="block text-gray-700 font-bold">
                ID
            </label>
            <input
                type="text"
                id={id}
                value={formData || ""}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-gray-200 border border-gray-400 rounded py-2 px-4 focus:outline-none focus:border-blue-400"
            />
            <button
                type="button"
                onClick={handleGenerateUUID}
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Generate UUID
            </button>
            {confirming && (
                <div className="mt-2 text-red-700">
                    Are you sure you want to generate a new UUID?
                    <button
                        type="button"
                        onClick={handleConfirm}
                        className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Yes
                    </button>
                    <button
                        type="button"
                        onClick={() => setConfirming(false)}
                        className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        No
                    </button>
                </div>
            )}
        </div>
    );
};

export default UUIDInput;
