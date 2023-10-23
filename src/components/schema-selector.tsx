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
                        <SelectContent className="h-60">
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
