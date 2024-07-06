'use client';

import './styles/index.css';
import { Fragment, useCallback, useMemo } from 'react';
import { createEditor, Descendant } from 'slate';
import { withPlugins } from './plugins';
import FixedToolbar from './toolbars/fixed';
import { emptyParagraph } from './lib/constants';
import FloatingToolbar from './toolbars/floating';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { withLoggings } from './plugins/withLoggings';
import { withChecklist } from './plugins/withChecklist';
import { withCodeBlock } from './plugins/withCodeBlock';
import { withPlainTextPaste } from './plugins/withPlainTextPaste';
import { withMarks } from './plugins/withMarks';
import { Locale } from '@/i18n.config';
import Elements from './elements';
import { cn } from '@/lib/utils/helpers';
import { ParagraphNode } from './nodes';
import { withInLines } from './plugins/withInLines';
import { NodeEntry } from 'slate';

// type f = {
  // editor: ReactEditor;
  // initialValue: Descendant[];
  // children: ReactNode;
  // onChange?: ((value: Descendant[]) => void) | undefined;
  // onSelectionChange?: ((selection: Selection) => void) | undefined;
  // onValueChange?: ((value: Descendant[]) => void) | undefined;
// };

interface Props {
  locale?: Locale;
  readOnly?: boolean;
  onChange?: (value: Descendant[]) => void;
  className?: string;
  content?: Descendant[];
  initialValue?: Descendant[];
}

export const TextEditor = ({
  locale = 'en',
  readOnly = false,
  ...props
}: Props) => {
  const { content, className, onChange, initialValue } = props;
  // const editor = useMemo(() => withPlugins(createEditor()), []);

  // DEFAULT
  const descendant = content ?? [ParagraphNode([{ text: 'No content found' }])];
  const initialDescendant = initialValue ?? emptyParagraph;

  const editor = useMemo(
    () =>
      withInLines(
        withMarks(
          withPlainTextPaste(
            withCodeBlock(
              withChecklist(
                withLoggings(withHistory(withReact(createEditor())))
              )
            )
          )
        )
      ),
    []
  );

  const { eHtml, rHtml } = Elements();

  const decorate = useCallback(
    (nodeEntry: NodeEntry) => {
      const ranges = [] as NodeEntry[] & { withPlaceholder?: boolean }[];
      if (readOnly) return ranges;

      const [node, path] = nodeEntry;
    },
    [readOnly]
  );

  return (
    <Fragment>
      {readOnly ? (
        <Slate editor={editor} initialValue={descendant} onChange={onChange}>
          <Editable
            readOnly={readOnly}
            className={cn('outline-none border-none', className)}
            renderLeaf={rHtml.leafs}
            renderElement={rHtml.elements}
          />
        </Slate>
      ) : (
        <Slate
          editor={editor}
          initialValue={initialDescendant}
          onChange={onChange}
        >
          <div className='relative'>
            <div className='!relative'>
              <FixedToolbar />
              <FloatingToolbar />
            </div>
            <div className='px-16 py-4'>
              <Editable
                autoFocus={true}
                placeholder='Type something...'
                readOnly={readOnly}
                id='editor'
                className='relative outline-none border-none'
                renderLeaf={eHtml.leafs}
                renderElement={eHtml.elements}
                onKeyDown={editor.onKeyDown}
              />
            </div>
          </div>
        </Slate>
      )}
    </Fragment>
  );
};

// export default TextEditor;
