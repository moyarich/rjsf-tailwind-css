/*
 *   Copyright (c) 2023 Amazon.com, Inc. and its affiliates.
 *   All rights reserved.
 *
 *   Licensed under the Amazon Software License (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *   http://aws.amazon.com/asl/
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
 */

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

interface ISchemaSelectorProps {
    selectedSchema: string; // The currently selected schema
    handleSchemaSelectChange: (newSchema: string) => void; // A function to handle schema selection changes
    schemaData: Record<string, unknown>; // An object containing the available schema options
}

export const SchemaSelector = ({
    selectedSchema,
    handleSchemaSelectChange,
    schemaData,
}: ISchemaSelectorProps) => {
    return (
        <div className="rounded border">
            <div className="p-3">
                <div className="text-red-500">Select a template schema:</div>
                <div>
                    <Select value={selectedSchema} onValueChange={handleSchemaSelectChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Schema" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.keys(schemaData).map((schemaName) => (
                                <SelectItem key={schemaName} value={schemaName}>
                                    {schemaName}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="p-3">
                <h1>
                    <span className="text-red-300">{selectedSchema}</span>
                </h1>
                <p className="text-sm">React JSON Form Schema and React JSON Form UISchema</p>
            </div>
        </div>
    );
};
export default SchemaSelector;
