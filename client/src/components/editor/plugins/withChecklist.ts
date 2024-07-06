'use client';

import { Path, Range } from 'slate';
import { Element, Transforms, Editor } from 'slate';
import { CheckListNode, ParagraphNode } from '../nodes';
import { KeyboardEvent } from 'react';

/**
 * Helper function to check if the current selection is within a checklist.
 * @param {Editor} editor - The editor instance.
 * @returns {boolean} - Returns true if the selection is within a checklist, false otherwise.
 */
const isInChecklist = (editor: Editor) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => Element.isElement(n) && n.type === 'check-list',
  });
  return !!match;
};

/**
 * Toggle the checked state of the current checklist item at the given path.
 * @param {Editor} editor - The editor instance.
 * @param {Path} path - The path of the checklist item to toggle.
 */
const toggleChecklistItem = (editor: Editor, path: Path) => {
  const [node] = Editor.node(editor, path);
  // @ts-ignore
  // TODO: fix type error
  const newChecked = !node.checked;
  Transforms.setNodes(editor, { checked: newChecked }, { at: path });
};

/**
 * Enhances the editor to handle checklist-specific behavior.
 * @param {Editor} editor - The editor instance.
 * @returns {Editor} - The enhanced editor instance.
 */
export const withChecklist = (editor: Editor): Editor => {
  // Store the original methods to preserve their behavior
  const { insertBreak, deleteBackward, onKeyDown } = editor;

  /**
   * Override the insertBreak method to handle inserting new checklist items.
   */
  editor.insertBreak = () => {
    if (isInChecklist(editor)) {
      const { selection } = editor;
      if (selection && Range.isCollapsed(selection)) {
        const [checklistEntry] = Editor.nodes(editor, {
          match: (n) => Element.isElement(n) && n.type === 'check-list',
        });
        if (checklistEntry) {
          const [, checklistPath] = checklistEntry;
          const end = Editor.end(editor, checklistPath);
          const text = Editor.string(editor, checklistPath);

          const paragraph = ParagraphNode();

          // Remove the empty checklist item
          if (text === '' && Range.includes(selection, end)) {
            Transforms.removeNodes(editor, { at: checklistPath });
            Transforms.insertNodes(editor, paragraph);
            return;
          }

          // Insert a new checklist item if at the end of the current item
          if (Range.includes(selection, end)) {
            const checklist = CheckListNode(false);
            Transforms.insertNodes(editor, checklist, {
              at: Path.next(checklistPath),
            });
            Transforms.move(editor, { distance: 1, unit: 'line' });
            return;
          }
        }
      }
    }
    // Call the original insertBreak method if not in a checklist
    insertBreak();
  };

  /**
   * Override the deleteBackward method to handle deleting checklist items.
   * @param {...any} args - The arguments for the deleteBackward method.
   */
  editor.deleteBackward = (...args) => {
    if (isInChecklist(editor)) {
      const { selection } = editor;
      if (selection && Range.isCollapsed(selection)) {
        const [checklistEntry] = Editor.nodes(editor, {
          match: (n) => Element.isElement(n) && n.type === 'check-list',
        });

        if (checklistEntry) {
          const [, path] = checklistEntry;
          const { anchor } = selection;
          const isAtNodeStart = Editor.isStart(editor, anchor, path);
          const text = Editor.string(editor, path);

          // Remove the checklist item if it's empty and at the start
          if (isAtNodeStart && text === '') {
            Transforms.removeNodes(editor, { at: path });
            return;
          }
        }
      }
    }
    // Call the original deleteBackward method if not in a checklist
    deleteBackward(...args);
  };

  // /**
  //  * Handle keydown events to add checklist-specific behavior.
  //  * @param {KeyboardEvent<HTMLDivElement>} event - The keydown event.
  //  */
  // editor.onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
  //   if (!isInChecklist(editor)) {
  //     if (onKeyDown) {
  //       onKeyDown(event);
  //     }
  //     return;
  //   }

  //   const { selection } = editor;
  //   console.log('hello world!!!!!!!!!!');

  //   // Handle Enter key to convert empty checklist to paragraph or insert new checklist item
  //   if (event.ctrlKey && event.key === 'Enter') {
  //     if (selection && Range.isCollapsed(selection)) {
  //       const [checklistEntry] = Editor.nodes(editor, {
  //         match: (n) => Element.isElement(n) && n.type === 'check-list',
  //       });

  //       if (checklistEntry) {
  //         const [, path] = checklistEntry;
  //         const { anchor } = selection;
  //         const isAtNodeStart = Editor.isStart(editor, anchor, path);
  //         const text = Editor.string(editor, path);

  //         // Remove the checklist item if it's empty and at the start
  //         if (isAtNodeStart && text === '') {
  //           Transforms.removeNodes(editor, { at: path });
  //           return;
  //         }
  //       }
  //     }
  //   }

  //   // Handle space key to toggle checklist item
  //   if (event.ctrlKey && event.key === ' ') {
  //     if (selection && Range.isCollapsed(selection)) {
  //       const [match] = Editor.nodes(editor, {
  //         match: (n) => Element.isElement(n) && n.type === 'check-list',
  //       });
  //       if (match) {
  //         toggleChecklistItem(
  //           editor,
  //           Array.from(Editor.path(editor, selection))
  //         );
  //         event.preventDefault();
  //         return;
  //       }
  //     }
  //   }

  //   // Call the original onKeyDown method if it exists
  //   if (onKeyDown) {
  //     onKeyDown(event);
  //   }
  // };

  return editor;
};
