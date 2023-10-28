import React, { forwardRef, useCallback, useImperativeHandle, useState, useRef } from "react";
import MonacoEditor, { OnMount } from "@monaco-editor/react";

import { CheckIcon, TrashIcon } from "@radix-ui/react-icons";

import prettier from "prettier/standalone";
import typescriptParser from "prettier/parser-typescript";

export interface IEditorRef {
    setUpdatedCode: React.Dispatch<React.SetStateAction<string>>;
}

export type EditorProps = {
    title: string;
    code: string;
    onChange?: (code: string) => void;
    onSave?: (code: string) => void;
    height?: string | number;
    className?: string;
    defaultValue?: string;
};

export const Editor = forwardRef((props: EditorProps, ref) => {
    const { title, code, onChange, onSave, height = "100%", className, defaultValue = "" } = props;
    const [valid, setValid] = useState(true);

    const [updatedCode, setUpdatedCode] = useState<string>(code ?? "");

    const editor = useRef<any>();

    useImperativeHandle(
        ref,
        (): IEditorRef => {
            return {
                setUpdatedCode,
            };
        },
        [updatedCode],
    );

    const typeScriptConfig = {
        parser: "typescript",
        plugins: [typescriptParser],
    };

    function handleEditorBeforeMount(monaco) {
        monaco.languages.registerDocumentFormattingEditProvider("typescript", {
            displayName: "Prettier",
            provideDocumentFormattingEdits(model, options, token) {
                const prettyVal = prettier.format(model.getValue(), typeScriptConfig);
                return [{ range: model.getFullModelRange(), text: prettyVal }];
            },
        });
    }

    const onCodeSave = () => {
        onSave && onSave(updatedCode);
    };

    const onCodeChange = useCallback(
        (code: string | undefined) => {
            if (!code) {
                onChange && onChange(defaultValue);
                return;
            }

            try {
                setValid(true);
                setUpdatedCode(code);
                onChange && onChange(code);
            } catch (err) {
                setValid(false);
            }
        },
        [setValid, onChange],
    );

    const monacoEditorOptions = {
        formatOnType: true,
        tabSize: 2,
        margin: { top: -3 },
        padding: { top: 6, bottom: 10 },
        lineNumbersMinChars: 3,
        minimap: {
            enabled: true,
        },
        scrollbar: {
            useShadows: false,
            vertical: "auto" as const,
        },
        mouseWheelZoom: true,
        automaticLayout: true,
        //-----------
        renderLineHighlightOnlyWhenFocus: true,
        overviewRulerBorder: false,
        hideCursorInOverviewRuler: true,
    };

    const icon = valid ? <CheckIcon /> : <TrashIcon />;
    const cls = valid ? "text-green-500" : "text-red-500";

    return (
        <div className="h-full">
            <div className="header flex p-2 items-center border-b-2 shadow-b-sm p-1">
                <div className="p-2 gap-1 inline-flex items-center">
                    {icon}
                    <span className={cls}>{title}</span>
                </div>
                {onSave && (
                    <div className="action flex flex-1 items-center justify-end">
                        <button
                            className="bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 py-2 rounded-md px-8"
                            onClick={onCodeSave}
                        >
                            Save
                        </button>
                    </div>
                )}
            </div>

            <MonacoEditor
                className={className}
                language="json"
                value={updatedCode}
                theme="vs-light"
                onChange={onCodeChange}
                height={height}
                options={monacoEditorOptions}
                beforeMount={handleEditorBeforeMount}
            />
        </div>
    );
});

export default Editor;
