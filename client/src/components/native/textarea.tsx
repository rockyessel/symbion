'use client';

import React, {
  useState,
  useRef,
  useEffect,
  DetailedHTMLProps,
  TextareaHTMLAttributes,
} from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { cn } from '@/lib/utils/helpers';
import { Textarea } from '../ui/textarea';

interface Props
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  className?: string;
  label: string;
}

const NativeTextarea = ({ label, className, disabled, ...props }: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasText, setHasText] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      setHasText(textareaRef.current.value !== '');
    }
  }, []);

  const handleFocus = () => {
    setIsFocused(true);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleBlur = () => {
    if (textareaRef.current) {
      setHasText(textareaRef.current.value !== '');
      if (textareaRef.current.value === '') {
        setIsFocused(false);
      }
    }
  };

  return (
    <div className='w-full relative bg-inherit' onClick={handleFocus}>
      <Textarea
        {...props}
        disabled={disabled}
        placeholder={disabled ? '' : props.placeholder}
        ref={textareaRef}
        className={cn('w-full px-2', className)}
        onFocus={handleFocus}
        onBlur={handleBlur}

      />
      <Label
        className={cn(
          'absolute cursor-text left-0 text-sm text-lime-500 bg-neutral-900 mx-1 transition-all',
          {
            '-top-3 text-lime-600 text-sm ': isFocused || hasText,
            'top-2 text-lime-500 w-full pt-1 px-2 pr-10':
              !isFocused && !hasText,
          }
        )}
        onClick={handleFocus}
      >
        {label}
      </Label>
    </div>
  );
};

export default NativeTextarea;
