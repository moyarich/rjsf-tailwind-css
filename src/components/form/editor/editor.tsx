import React, { forwardRef, useCallback, useImperativeHandle, useState, useRef } from "react";
import MonacoEditor, { OnMount, BeforeMount, Monaco } from "@monaco-editor/react";

import { CheckIcon, TrashIcon } from "@radix-ui/react-icons";

import prettier from "prettier";
import type { Options } from "prettier";
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

    useImperativeHandle(
        ref,
        (): IEditorRef => {
            return {
                setUpdatedCode,
            };
        },
        [updatedCode],
    );

    const editorRef = useRef<any>();

    const getParser = (language: string): Pick<Options, "parser"> & Pick<Options, "plugins"> => {
        switch (language) {
            case "typescript":
                return { parser: "typescript", plugins: [typescriptParser] };
            default:
                return {};
        }
    };

    const prettyValFormat = (source: string, language: string) => {
        return prettier.format(source, {
            useTabs: false,
            semi: true,
            singleQuote: true,
            ...getParser(language),
        });
    };

    const setFormatter = (monaco: Monaco): void => {
        monaco.languages.getLanguages().forEach(({ id: language }) => {
            monaco.languages.registerDocumentFormattingEditProvider(language, {
                provideDocumentFormattingEdits: (model) => {
                    return [
                        {
                            range: model.getFullModelRange(),
                            text: prettyValFormat(model.getValue(), language),
                        },
                    ];
                },
            });
        });
    };

    function handleEditorBeforeMount(monacoEditor: Monaco) {
        //setFormatter(monacoEditor);
    }

    const formatValue = () => {
        // Get the current value from the editor
        const unformatted = editorRef.current.getModel().getValue();

        // Format the value
        const formatted = prettyValFormat(unformatted, "typescript");

        // Set the formatted value back in the editor
        editorRef.current.setValue(formatted);
    };

    const onEditorMount: OnMount = (_editor, monacoEditor: Monaco) => {
        editorRef.current = _editor;
        // ]shortcut
        _editor.addCommand(monacoEditor.KeyMod.Alt | monacoEditor.KeyCode.Enter, () => {
            //formatValue();
        });
        _editor.getModel()?.updateOptions({ tabSize: 2 });
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
                            onClick={formatValue}
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
