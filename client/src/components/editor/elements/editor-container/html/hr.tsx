'use client';

import { useFocused, useSelected } from 'slate-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils/helpers';
import { RenderProps, SeparatorType } from '@/components/editor/types';

const HtmlHrElement = (props: RenderProps<SeparatorType>) => {
  const { attributes, children } = props;

  const selected = useSelected();
  const focused = useFocused();

  return (
    <div contentEditable={false} {...attributes}>
      {children}
      <div
        className={cn(
          'w-full cursor-default',
          selected && focused
            ? 'ring-gray-700 ring-2'
            : 'hover:ring-2 hover:ring-gray-400'
        )}
        contentEditable={false}
      >
        <Separator />
      </div>
    </div>
  );
};

export default HtmlHrElement;
