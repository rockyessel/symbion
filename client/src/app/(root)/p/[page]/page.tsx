import {
  Bug,
  Calendar,
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  ListTree,
  LogOut,
  Mail,
  Mailbox,
  MessageSquare,
  Newspaper,
  PlusCircle,
  Settings,
  StickyNote,
  User,
  UserPlus,
  Users,
  Waypoints,
} from 'lucide-react';
import { socials } from '@/lib/utils/constants';
import { domainURL, truncate } from '@/lib/utils/helpers';
import { CirclePlus, Copy, Heart, MoreHorizontal, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import NextImage from '@/components/native/image';

interface Props {
  params: { page: string | `0x${string}` };
}

const PageDetailed = async ({ params: { page } }: Props) => {
  const description = `
            Lorem ipsum dolor sit amet,consectetur adipisicing elit.
            Inventore qui voluptatum molestiae, tempora corrupti magni,
            doloremque provident voluptate nihil sequi saepe iure eligendi
            id laboriosam suscipit, error unde explicabo vitae. Lorem ipsum
            dolor sit amet, consectetur adipisicing elit. Inventore qui voluptatum
            molestiae, tempora corrupti magni, doloremque provident voluptate nihil
            sequi saepe iure eligendi id laboriosam suscipit, error unde explicabo
            vitae.Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Inventore qui voluptatum molestiae, tempora corrupti magni,
            doloremque provident voluptate nihil sequi saepe iure eligendi id
            laboriosam suscipit, error unde explicabo vitae.Lorem ipsum dolor
            sit amet, consectetur adipisicing elit. Inventore qui voluptatum
            molestiae, tempora corrupti magni, doloremque provident voluptate
            nihil sequi saepe iure eligendi id laboriosam suscipit, error unde
            explicabo vitae.
  `;

  return (
    <div className='w-full p-4'>
      {/* <div className='flex items-start justify-between'>
        <div>
          <div className='flex items-center gap-1'>
            <div className='flex items-center gap-1.5'>
              <NextImage
                src={domainURL('/wallets/nova.svg')}
                width={400}
                height={400}
                className='w-4 h-4 rounded-full'
              />

              <p className='text-zinc-500 text-xl'>
                <span>p</span>/
                <span className='text-lime-600 font-medium'>lleryo</span>
              </p>
            </div>

            <Copy strokeWidth={2.25} size={20} className='w-4 h-4' />
          </div>

          <div className='mt-2'>
            <div className='inline-flex items-end'>
              <p className='text-sm text-zinc-300 max-w-xl'>
                {truncate(description, 200)}
              </p>

              <button className='inline-flex items-center text-lime-600'>
                <span className='text-xs'>read more</span>
                <Plus className='w-4 h-4' strokeWidth={2.25} size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className='border border-zinc-700/40 bg-black text-zinc-500 rounded-lg p-2'>
          <div className='flex flex-col gap-1'>
            <div className='flex items-center gap-1'>
              <div className='flex items-center gap-1.5'>
                <p className='text-zinc-500'>
                  <span>Hash:</span>
                  <span className='text-lime-600 font-medium'>
                    0x39c390cnioc3ino3c3cionnio3rni3ionni3c
                  </span>
                </p>
              </div>
              <Copy strokeWidth={2.25} size={20} className='w-4 h-4' />
            </div>

            <div className='flex items-center gap-1'>
              <div className='flex items-center gap-1.5'>
                <p className='text-zinc-500'>
                  <span>did:page:</span>
                  <span className='text-lime-600 font-medium'>
                    0x39c390cnioc3ino3c3cionnio3rni3ionni3c
                  </span>
                </p>
              </div>
              <Copy strokeWidth={2.25} size={20} className='w-4 h-4' />
            </div>

            
          </div>
        </div>
      </div> */}

      <div className='pt-9 border-b border-zinc-700/40'>
        <div className='px-4 flex-col justify-start items-start gap-3 flex'>
          <div className='flex items-start justify-between'>
            <div className='flex items-center gap-2'>
              <div className='inline-flex items-center gap-1'>
                <p>
                  <span className='text-gray-400 text-xl font-normal leading-7'>
                    rockyessel
                  </span>
                  <span>/</span>
                  <span className='text-lime-600 text-xl font-semibold leading-7'>
                    lleryo
                  </span>
                </p>

                <Copy strokeWidth={2.25} size={20} className='w-4 h-4' />
              </div>
              <div className='p-px bg-gradient-to-b from-gray-800 to-black rounded-md border border-zinc-700/40 justify-start items-center gap-px flex'>
                <div className='px-2 py-1 justify-start items-center flex'>
                  <Heart strokeWidth={2.25} size={20} className='w-4 h-4' />
                  <div className='pl-0.5 flex-col justify-start items-center inline-flex'>
                    <div className='text-center text-gray-500 text-sm font-normal leading-none'>
                      reputation
                    </div>
                  </div>
                </div>
                <div className='px-1.5 py-1 border-l border-zinc-700/40 justify-center items-center flex'>
                  <div className='text-center text-gray-400 text-sm font-normal leading-none'>
                    492
                  </div>
                </div>
              </div>
              <p className='inline-flex items-center gap-1'>
                <span>・</span>
                <span className='text-zinc-500  '>company</span>
              </p>
            </div>

            <div className='flex items-center gap-2.5'>
              {socials.slice(0, 3).map((social, index) => (
                <NextImage
                  src={domainURL(social.icon)}
                  alt={social.name}
                  width={400}
                  height={400}
                  className='w-6 h-6'
                  key={index}
                />
              ))}
            </div>
          </div>

          <div className='flex items-center gap-2 text-xs'>
            <p>3.3K members</p>
            <p>1K articles</p>
          </div>

          <div className='mt-2'>
            <div className='inline-flex items-end'>
              <p className='text-sm text-zinc-400 max-w-xl'>
                {truncate(description, 200)}
              </p>

              <button className='inline-flex items-center text-lime-600'>
                <span className='text-xs'>read more</span>
                <Plus className='w-4 h-4' strokeWidth={2.25} size={20} />
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className='justify-start items-start inline-flex'>
            <div className='rounded-lg py-1.5 px-2 bg-gradient-to-b from-gray-800 to-zinc-900 shadow border border-zinc-700/40 justify-start items-center gap-2 inline-flex'>
              <div className='flex-col justify-start items-start inline-flex'>
                <Heart strokeWidth={2.25} size={20} className='w-4 h-4' />
              </div>
              <div className='flex-col justify-start items-start inline-flex'>
                <div className='text-lime-600 text-sm font-normal leading-tight'>
                  image-to-Text
                </div>
              </div>
            </div>
          </div>

          {/* Submenu */}
          <div className='self-stretch pt-1 justify-between items-center inline-flex'>
            <div className='h-12 flex-col justify-start items-start inline-flex'>
              <div className='h-12 justify-start items-center inline-flex'>
                <div className='px-3.5 pt-2.5 pb-3 border-b-2 border-gray-700 justify-start items-center flex'>
                  <div className='w-5 h-4 pr-1.5 flex-col justify-start items-start inline-flex'>
                    <div className='w-4 h-4 flex-col justify-center items-start flex'>
                      <CirclePlus />
                    </div>
                  </div>
                  <div className='font-semibold'>Main</div>
                </div>
                <div className='px-3.5 pt-2.5 pb-3 justify-start items-center flex'>
                  <div className='w-5 h-4 pr-1.5 flex-col justify-start items-start inline-flex'>
                    <div className='w-4 h-4 flex-col justify-center items-start flex'>
                      <Calendar />
                    </div>
                  </div>
                  <div className='flex-col justify-start items-start inline-flex'>
                    <div className='text-gray-600 text-base font-normal'>
                      Events
                    </div>
                  </div>
                </div>
                <div className='px-3.5 pt-2.5 pb-3 justify-start items-center flex'>
                  <div className='w-5 h-4 pr-1.5 flex-col justify-start items-start inline-flex'>
                    <div className='w-4 h-4 flex-col justify-center items-start flex'>
                      <Newspaper />
                    </div>
                  </div>
                  <div className='flex-col justify-start items-start inline-flex'>
                    <div className='text-gray-600 text-base font-normal'>
                      Articles
                    </div>
                  </div>
                </div>
                <div className='px-3.5 pt-2.5 pb-3 justify-start items-center flex'>
                  <div className='w-5 h-4 pr-1.5 flex-col justify-start items-start inline-flex'>
                    <div className='w-4 h-4 flex-col justify-center items-start flex'>
                      <Users />
                    </div>
                  </div>
                  <div className='flex-col justify-start items-start inline-flex'>
                    <div className='text-gray-600 text-base font-normal'>
                      Members
                    </div>
                  </div>
                </div>
                <div className='px-3.5 pt-2.5 pb-3 justify-start items-center flex'>
                  <div className='w-5 h-4 pr-1.5 flex-col justify-start items-start inline-flex'>
                    <div className='w-4 h-4 flex-col justify-center items-start flex'>
                      <ListTree />
                    </div>
                  </div>
                  <div className='flex-col justify-start items-start inline-flex'>
                    <div className='text-gray-600 text-base font-normal'>
                      Media
                    </div>
                  </div>
                </div>
                <div className='px-3.5 pt-2.5 pb-3 justify-start items-center flex'>
                  <div className='w-5 h-4 pr-1.5 flex-col justify-start items-start inline-flex'>
                    <div className='w-4 h-4 flex-col justify-center items-start flex'>
                      <div className='w-4 h-4 relative' />
                    </div>
                  </div>
                  <div className='text-gray-600 text-base font-normal'>
                    Connections
                  </div>
                  <div className='h-4 pl-1.5 flex-col justify-start items-start inline-flex'>
                    <div className='h-4 px-1 pt-px pb-0.5 bg-black rounded shadow justify-center items-center inline-flex'>
                      <div className='text-white text-xs font-normal leading-3'>
                        23
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='justify-start items-start gap-1.5 flex'>
              <div className=''>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className='p-1.5 bg-gradient-to-b from-gray-800 to-black rounded-lg border border-zinc-700/40 justify-center items-center flex'>
                      <MoreHorizontal
                        size={20}
                        strokeWidth={2.25}
                        className='w-4 h-4'
                      />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='w-56'>
                    <DropdownMenuLabel>Page options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Newspaper className='mr-2 h-4 w-4' />
                        <span>Publish article</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <StickyNote className='mr-2 h-4 w-4' />
                        <span>Write posts</span>
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Calendar className='mr-2 h-4 w-4' />
                        <span>Add Events</span>
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Waypoints className='mr-2 h-4 w-4' />
                        <span>Connect page</span>
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Mailbox className='mr-2 h-4 w-4' />
                      <span>Contact lleryo</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bug className='mr-2 h-4 w-4' />
                      <span>Report</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <CirclePlus className='mr-2 h-4 w-4' />
                      <span>Join lleryo</span>
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className='self-stretch flex-col justify-start items-start inline-flex'>
                <div className='self-stretch px-3 py-1 bg-gradient-to-b from-gray-800 to-black rounded-lg border border-gray-800 justify-center items-center gap-1 inline-flex'>
                  <div className='w-4 h-3.5 pr-0.5 flex-col justify-start items-start inline-flex'>
                    <div className='w-3.5 h-3.5 flex-col justify-center items-center flex'>
                      <CirclePlus
                        size={20}
                        strokeWidth={2.25}
                        className='w-4 h-4 text-lime-600'
                      />
                    </div>
                  </div>
                  <div className='text-center text-white text-sm font-normal leading-tight'>
                    Join this company
                  </div>
                  <div className='w-2.5 h-3.5 flex-col justify-start items-start inline-flex'>
                    <div className='w-3.5 h-3.5 flex-col justify-center items-center flex'>
                      <div className='w-3.5 h-3.5 px-1 pt-1.5 pb-1 justify-center items-center inline-flex' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageDetailed;
