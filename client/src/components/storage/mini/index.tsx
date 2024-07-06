'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import NextImage from '@/components/native/image';
import { ChangeEvent, ReactNode, SyntheticEvent, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Image as ImageIcon, ImageDown, Trash2, BookImage } from 'lucide-react';

interface Props {
  children: ReactNode;
}

const MiniStorageUploader = ({ children }: Props) => {
  const [urlImage, setUrlImage] = useState<string>('');
  const [allowAlt, setAllowAlt] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [altText, setAltText] = useState('');

  const handleFilesOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files_ = Array.from(event.target.files);
      if (files_.length > 4) {
        return;
      }
    }
  };

  const handleFilesSubmission = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (files.length > 0) {
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className=''>
        <DialogHeader>
          <DialogTitle>Image Insertion</DialogTitle>
          <DialogDescription>
            {`Choose your insertion method.`}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue='single' className='px-4'>
          <TabsList className='grid w-full grid-cols-4'>
            <TabsTrigger value='single'>Single</TabsTrigger>
            <TabsTrigger value='grid'>Grid</TabsTrigger>
            <TabsTrigger value='inline'>Inline</TabsTrigger>
            <TabsTrigger value='url'>URL</TabsTrigger>
          </TabsList>
          <TabsContent value='single' className='w-full '>
            <form className='flex flex-col gap-4'>
              <fieldset>
                {/* File */}
                {true ? (
                  <fieldset className='relative'>
                    <Badge className='absolute top-0 left-0 m-2 z-10'>
                      Preview
                    </Badge>
                    <NextImage
                      src='https://'
                      className='w-full rounded-md h-28 overflow-hidden'
                      width={200}
                      height={200}
                      alt=''
                    />
                    <Button className='absolute bottom-0 right-0 m-2 z-10'>
                      <Trash2 color='red' size={16} strokeWidth={0.5} />
                    </Button>
                  </fieldset>
                ) : (
                  <fieldset className='bg-gray-900 rounded-md border-dashed border-2 p-2'>
                    <label className='w-full h-full flex flex-col gap-2'>
                      <ImageDown
                        className='w-full inline-flex items-center justify-center'
                        size={28}
                        strokeWidth={0.5}
                      />
                      <input
                        name='single'
                        type='file'
                        accept='image/*'
                        className='w-0 h-0'
                      />
                      <span className='text-center'>Drag or Select file</span>
                    </label>
                  </fieldset>
                )}
                {true && (
                  <fieldset className='mt-2'>
                    <Input
                      value={altText}
                      onChange={(event) => setAltText(event.target.value)}
                      name='alt'
                      type='text'
                      placeholder='ALT Text'
                    />
                  </fieldset>
                )}
              </fieldset>
              <fieldset>
                <Button type='submit'>Upload</Button>
              </fieldset>
            </form>
          </TabsContent>
          <TabsContent value='grid' className='w-full py-5 pb-10'>
            <form className='flex flex-col gap-4'>
              <fieldset>
                {/* File */}
                {files.length > 0 ? (
                  <fieldset
                    className={'relative grid grid-cols-2 gap-[0.5px] p-0'}
                  >
                    <Badge className='absolute top-0 left-0 m-2 z-10'>
                      Preview
                    </Badge>
                    {files.map((imageFile, index) => (
                      <fieldset
                        style={{
                          gridColumn:
                            files.length === 3 && index === 2
                              ? 'span 2'
                              : files.length === 1 && index === 0
                              ? 'span 2'
                              : '',
                        }}
                        key={index}
                        className='relative'
                      >
                        <NextImage
                          className='w-full rounded-md h-28 overflow-hidden'
                          width={200}
                          height={200}
                          alt=''
                          src={URL.createObjectURL(imageFile)}
                        />
                        <Button
                          onClick={() => {}}
                          className='absolute bottom-0 right-0 m-2 z-10'
                        >
                          <Trash2 color='red' size={16} strokeWidth={0.5} />
                        </Button>
                      </fieldset>
                    ))}

                    <Button className='absolute bottom-0 left-0 m-2 z-10'>
                      <span className='text-xs'>Clear All</span>
                    </Button>
                  </fieldset>
                ) : (
                  <fieldset className='bg-gray-900 rounded-md border-dashed border-2 p-2'>
                    <label className='w-full h-full flex flex-col gap-2'>
                      <BookImage
                        className='w-full inline-flex items-center justify-center'
                        size={28}
                        strokeWidth={0.5}
                      />
                      <input
                        multiple
                        type='file'
                        accept='image/*'
                        className='w-0 h-0'
                      />
                      <span className='inline-flex flex-col gap-1'>
                        <span className='text-center'>Drag or Select file</span>
                        <span className='text-center'>
                          Four(4) selection is allowed.
                        </span>
                      </span>
                    </label>
                  </fieldset>
                )}
              </fieldset>
              <fieldset>
                <Button type='submit'>Upload</Button>
              </fieldset>
            </form>
          </TabsContent>
          <TabsContent value='inline' className='w-full py-5 pb-10'>
            <form className='flex flex-col gap-4'>
              <fieldset>
                {/* File */}
                {false ? (
                  <fieldset className='relative'>
                    <Badge className='absolute top-0 left-0 m-2 z-10'>
                      Preview
                    </Badge>
                    <NextImage
                      src='https://'
                      className='w-full rounded-md h-28 overflow-hidden'
                      width={200}
                      height={200}
                      alt=''
                    />
                    <Button className='absolute bottom-0 right-0 m-2 z-10'>
                      <Trash2 color='red' size={16} strokeWidth={0.5} />
                    </Button>
                  </fieldset>
                ) : (
                  <fieldset className='bg-gray-900 rounded-md border-dashed border-2 p-2'>
                    <label className='w-full h-full flex flex-col gap-2'>
                      <ImageDown
                        className='w-full inline-flex items-center justify-center'
                        size={28}
                        strokeWidth={0.5}
                      />
                      <input
                        name='single'
                        type='file'
                        accept='image/*'
                        className='w-0 h-0'
                      />
                      <span className='text-center'>Drag or Select file</span>
                    </label>
                  </fieldset>
                )}
                {false && (
                  <fieldset className='mt-2 flex flex-col gap-2'>
                    <fieldset>
                      <Input
                        value={altText}
                        onChange={(event) => setAltText(event.target.value)}
                        name='alt'
                        type='text'
                        placeholder='ALT Text'
                      />
                    </fieldset>

                    <fieldset>
                      <Label>Position</Label>
                      <Select
                        defaultValue={'Left'}
                        onValueChange={(value: 'left' | 'right') => {}}
                      >
                        <SelectTrigger className='w-full p-4'>
                          <SelectValue placeholder='Select payment method.' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value='left'>Left</SelectItem>
                            <SelectItem value='right'>Right</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </fieldset>

                    <fieldset>
                      <Label>Want to allow Caption?</Label>
                      <fieldset className='w-full mt-2 inline-flex gap-3 items-start'>
                        <Label className='relative inline-flex items-center cursor-pointer'>
                          <Input
                            className='sr-only peer'
                            type='checkbox'
                            title='Allow Caption'
                            name='allowAlt'
                            checked={allowAlt}
                          />
                          <div className="w-8 h-5 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-900 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-slate-600" />
                        </Label>
                        <span className='text-sm font-medium'>
                          {allowAlt ? 'Allowed.' : 'Not allowed.'}
                        </span>
                      </fieldset>
                    </fieldset>
                  </fieldset>
                )}
              </fieldset>
              <fieldset>
                <Button type='submit'>Upload</Button>
              </fieldset>
            </form>
          </TabsContent>
          <TabsContent value='url' className='w-full py-5 pb-10'>
            <form className='flex flex-col gap-4'>
              <fieldset>
                <Label>Enter Image URL</Label>
                <fieldset>
                  <Input
                    value={urlImage}
                    onChange={(event) => setUrlImage(event.target.value)}
                    name='URL Image'
                    type='text'
                    placeholder='https://cdn.sanity.io/files/'
                  />
                </fieldset>
              </fieldset>

              <fieldset>
                <Label>Alt Text</Label>
                <fieldset>
                  <Input
                    value={altText}
                    onChange={(event) => setAltText(event.target.value)}
                    name='alt'
                    type='text'
                    placeholder='ALT Text'
                  />
                </fieldset>
              </fieldset>

              <fieldset>
                <Label>
                  You can only use Image URLs from this host:{' '}
                  <Link
                    target='_blank'
                    href='https://expressjsvercelstarter.vercel.app?ref=blogengine'
                  >
                    <Badge>cdn.sanity.io</Badge>.
                  </Link>
                  Any other will be rejected.
                </Label>
              </fieldset>

              <fieldset className='flex items-center justify-between'>
                <Button type='submit' className='m-2'>
                  Insert Image
                </Button>
                <Button onClick={() => setUrlImage('')} className='m-2'>
                  Clear
                </Button>
              </fieldset>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default MiniStorageUploader;
