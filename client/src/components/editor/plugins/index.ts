import pipe from 'lodash/fp/pipe';
import { withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { withCodeBlock } from './withCodeBlock';
import { withPlainTextPaste } from './withPlainTextPaste';
import { withLoggings } from './withLoggings';
import { withBlockquote } from './withBlockquote';
import { withChecklist } from './withChecklist';
import { Editor } from 'slate';
import { withMarks } from './withMarks';

/**
 * A function that pipes together multiple Slate editor plugins to enhance the editor instance.
 * This function uses lodash's `pipe` function to compose the plugins.
 *
 * @param {Editor} editor - The initial editor instance to enhance.
 * @returns {Editor} - The enhanced editor instance with all the plugins applied.
 */
export const withPlugins = (editor: Editor): Editor =>
  pipe(
    withMarks,
    withReact,
    withHistory,
    withLoggings,
    withChecklist,
    withCodeBlock,
    withBlockquote,
    withPlainTextPaste
  )(editor);
