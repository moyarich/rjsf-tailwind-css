import React, { forwardRef, useCallback, useImperativeHandle, useState, useRef } from "react";
import MonacoEditor, { OnMount, BeforeMount, Monaco } from "@monaco-editor/react";

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

    function handleEditorBeforeMount(monacoEditor: Monaco) {
        monacoEditor.languages.registerDocumentFormattingEditProvider("typescript", {
            displayName: "Prettier",
            provideDocumentFormattingEdits(model, options, token) {
                const prettyVal = prettier.format(model.getValue(), typeScriptConfig);
                return [{ range: model.getFullModelRange(), text: prettyVal }];
            },
        });
    }

    const editorRef = useRef<any>();

    const onEditorMount: OnMount = (getValue, monacoEditor) => {
        editorRef.current = monacoEditor;
        monacoEditor.onDidChangeModelContent(() => {
            onChange && onChange(getValue());
        });
        monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
    };

    const onFormatClick = () => {
        // Get the current value from the editor
        const unformatted = editorRef.current.getModel().getValue();

        // Format the value
        const formatted = prettier
            .format(unformatted, {
                ...typeScriptConfig,
                useTabs: false,
                semi: true,
                singleQuote: true,
            })
            .then((formatted) => {
                // Set the formatted value back in the editor
                editorRef.current.setValue(formatted);
            });
    };

    const onClearClick = () => {
        editorRef.current.setValue("");
    };

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

                <div className="action flex flex-1 items-center justify-end">
                    <div className="group relative m-12 flex justify-center">
                        <button
                            className="rounded bg-amber-500 px-4 py-2 text-sm text-white shadow-sm"
                            onClick={onFormatClick}
                        >
                            Format
                        </button>
                        <span className="absolute top-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
                            ✨ Format
                        </span>
                    </div>

                    {onSave && (
                        <button
                            className="bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 py-2 rounded-md px-8"
                            onClick={onCodeSave}
                        >
                            Save
                        </button>
                    )}
                </div>
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
                onMount={onEditorMount}
            />
        </div>
    );
});

export default Editor;
