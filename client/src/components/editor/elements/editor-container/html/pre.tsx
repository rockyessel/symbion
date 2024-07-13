'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { CodeBlockType, RenderProps } from '@/components/editor/types';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { codeThemes } from '@/components/editor/lib/constants';

const HtmlPreCodeElement = (props: RenderProps<CodeBlockType>) => {
  const { attributes, children, element } = props;

  console.log('code-block-props: ', props);

  const { props: props_ } = element;
  const { code, language, theme, isShowLins } = props_;

  const codeThemeKeys = Object.keys(codeThemes);

  return (
    <div
      data-language={language}
      data-theme={theme}
      className='w-full relative'
      {...attributes}
    >
      <div className='absolute right-0'>
        <div className='flex items-center gap-2'>
          <Select>
            <SelectTrigger className='w-[180px] p-1 text-sm'>
              <SelectValue placeholder='Change theme' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Themes</SelectLabel>
                {codeThemeKeys.map((theme, index) => (
                  <SelectItem key={index} value={theme}>
                    {theme}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className='w-[180px] p-1 text-sm'>
              <SelectValue placeholder='Select a fruit' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Languages</SelectLabel>
                {SyntaxHighlighter.supportedLanguages.map((lang, index) => (
                  <SelectItem key={index} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <pre className='w-full bg-zinc-500 h-full rounded-lg p-2'>
        <code>{children}</code>
      </pre>
    </div>
  );
};

export default HtmlPreCodeElement;
{
  /* <SyntaxHighlighter
        wrapLongLines={true}
        wrapLines={true}
        showInlineLineNumbers={isShowLins}
        language={language}
        style={codeThemes[theme]}
      >
        {code}
      </SyntaxHighlighter> */
}
