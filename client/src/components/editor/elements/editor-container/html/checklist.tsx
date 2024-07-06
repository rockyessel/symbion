'use client';

import { CheckListType, RenderProps } from '@/components/editor/types';
import { Editor, Transforms } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';

const HtmlChecklistElement = (props: RenderProps<CheckListType>) => {
  const { attributes, children, element } = props;
  const editor = useSlate();

  const handleToggleCheck = () => {
    const path = ReactEditor.findPath(editor, element);
    toggleChecklistItem(editor, path);
  };

  const toggleChecklistItem = (editor: Editor, path: number[]) => {
    const newChecked = !element.checked;
    Transforms.setNodes(editor, { checked: newChecked }, { at: path });
  };

  return (
    <div {...attributes}>
      <input
        type='checkbox'
        checked={element.checked}
        readOnly={false}
        onChange={handleToggleCheck}
      />
      {children}
    </div>
  );
};

export default HtmlChecklistElement;
