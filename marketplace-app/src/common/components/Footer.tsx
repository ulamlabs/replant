import { ReplantLogo } from './ReplantLogo';
import { IconInsta } from './icons/IconInsta';
import { IconLinked } from './icons/IconLinked';
import { IconThreads } from './icons/IconThreads';
import { IconYouTube } from './icons/IconYouTube';

export function Footer() {
  return (
    <footer className='mt-20 border-t-2 border-stone-300 dark:border-stone-900 py-10 flex justify-between items-center'>
      <div className='flex items-center'>
        <a href='https://www.replant.world/' className=' mr-10'>
          <ReplantLogo />
        </a>
        <p className='max-w-[207px] text-neutral-800 dark:text-gray-200 mr-7 text-sm font-normal'>
          Follow us on social and join the conversation.
        </p>
        <div className='flex items-center justify-between gap-3'>
          <IconLinked />
          <IconInsta />
          <IconThreads />
          <IconYouTube />
        </div>
      </div>
      <p className='text-neutral-400 dark:text-gray-200 text-base font-normal'>
        Replant World Copyright © {new Date().getFullYear()}
      </p>
    </footer>
  );
}
