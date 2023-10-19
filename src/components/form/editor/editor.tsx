import React, { useCallback, useState } from 'react';
import MonacoEditor from '@monaco-editor/react';

import { CheckIcon, TrashIcon } from '@radix-ui/react-icons';

export type EditorProps = {
  title: string;
  code: string;
  onChange?: (code: string) => void;
  onSave?: (code: string) => void;
  height?: string | number;
  className?: string;
};

export default function Editor({
  title,
  code,
  onChange,
  onSave,
  height = '100%',
  className,
}: EditorProps) {
  const [valid, setValid] = useState(true);

  const [updatedCode, setUpdatedCode] = useState<string>(code ?? '');

  const onCodeSave = () => {
    onSave && onSave(updatedCode);
  };

  const onCodeChange = useCallback(
    (code: string | undefined) => {
      if (!code) {
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
    [setValid, onChange]
  );

  const monacoEditorOptions = {
    minimap: {
      enabled: false,
    },
    automaticLayout: true,
  };

  const icon = valid ? <CheckIcon /> : <TrashIcon />;
  const cls = valid ? 'text-green-500' : 'text-red-500';

  return (
    <div className="h-full">
      <div className="header flex p-2 items-center border-b-2 border p-1">
        <div className="p-2 gap-1 inline-flex items-center">
          {icon}
          <span className={cls}>{title}</span>
        </div>
        <div className="action flex flex-1 items-center justify-end">
          <button
            className="bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 py-2 rounded-md px-8"
            onClick={onCodeSave}
          >
            Save
          </button>
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
      />
    </div>
  );
}
