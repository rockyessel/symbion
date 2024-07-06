'use client';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { MoreHorizontal } from 'lucide-react';

const FileMenu = () => {
  return (
    <Menubar className=''>
      <MenubarMenu>
        <MenubarTrigger className='w-fit h-10 bg-transparent'>
          <MoreHorizontal strokeWidth={1.5} />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Delete</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Download<MenubarShortcut>⌘,</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Move to <MenubarShortcut>⌘H</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Copy to <MenubarShortcut>⇧⌘H</MenubarShortcut>
          </MenubarItem>
          <MenubarShortcut />
          <MenubarItem>
            Hide <MenubarShortcut>⌘Q</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default FileMenu;
