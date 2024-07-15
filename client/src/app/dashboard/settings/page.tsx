import Link from 'next/link';
import { CircleUser, Menu, Package2, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import NativeInput from '@/components/native/input';

const SettingsPage = () => {
  return (
    <section className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      <Dashboard />
    </section>
  );
};

export default SettingsPage;

export function Dashboard() {
  return (
    <div className=''>
      <main className=''>
        <div className='mx-auto grid w-full max-w-6xl gap-2'>
          <h1 className='text-3xl font-semibold'>Settings</h1>
        </div>
        <div className='mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]'>
          <nav
            className='grid gap-4 text-sm text-muted-foreground'
            x-chunk='dashboard-04-chunk-0'
          >
            <Link href='#' className='font-semibold text-primary'>
              DID
            </Link>
            <Link href='#'>Security</Link>
            <Link href='#'>Integrations</Link>
            <Link href='#'>Support</Link>
            <Link href='#'>Organizations</Link>
            <Link href='#'>Advanced</Link>
          </nav>
          <div className='grid gap-6'>
            <Card
              x-chunk='dashboard-04-chunk-1'
              className='bg-neutral-700/40 border-zinc-700/40'
            >
              <CardHeader>
                <CardTitle>Store Name</CardTitle>
                <CardDescription>
                  Used to identify your store in the marketplace.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <NativeInput
                    label='Enter your project name'
                    placeholder='Store Name'
                    className='border-neutral-900 border'
                    labelClassName='pl-2 bg-neutral-700/40'
                  />
                </form>
              </CardContent>
              <CardFooter className='border-t border-zinc-700/40 px-6 py-4'>
                <Button>Save</Button>
              </CardFooter>
            </Card>
            <Card
              x-chunk='dashboard-04-chunk-2'
              className='bg-neutral-700/40 border-zinc-700/40'
            >
              <CardHeader>
                <CardTitle>Plugins Directory</CardTitle>
                <CardDescription>
                  The directory within your project, in which your plugins are
                  located.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className='flex flex-col gap-4'>
                  <NativeInput
                    label='Enter your project name'
                    placeholder='Project Name'
                    defaultValue='/content/plugins'
                    className='border-neutral-900 border'
                    labelClassName='pl-2 bg-neutral-700/40'
                  />
                  <div className='flex items-center space-x-2'>
                    <Checkbox id='include' defaultChecked />
                    <label
                      htmlFor='include'
                      className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                    >
                      Allow administrators to change the directory.
                    </label>
                  </div>
                </form>
              </CardContent>
              <CardFooter className='border-t border-zinc-700/40 px-6 py-4'>
                <Button>Save</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
