import { SocialLink } from '.';
import { ReplantLogo } from './ReplantLogo';
import { IconInsta } from './icons/IconInsta';
import { IconLinked } from './icons/IconLinked';
import { IconThreads } from './icons/IconThreads';
import { IconYouTube } from './icons/IconYouTube';

export function Footer() {
  return (
    <footer className='mt-20 border-t-2 border-stone-300 dark:border-stone-900 py-10 flex flex-col md:flex-row md:justify-between md:items-center gap-5 md:gap-0'>
      <div className='flex md:items-center flex-col md:flex-row gap-5 md:gap-0'>
        <a href='https://www.replant.world/' className=' mr-10'>
          <ReplantLogo />
        </a>
        <p className='max-w-52 text-neutral-800 dark:text-gray-200 mr-7 text-sm font-normal'>
          Follow us on social and join the conversation.
        </p>
        <div className='flex items-center justify-between gap-3'>
          <SocialLink
            icon={<IconLinked />}
            url='https://www.linkedin.com/company/replantworld/'
          />
          <SocialLink
            icon={<IconInsta />}
            url='https://www.instagram.com/replant.world/'
          />
          <SocialLink
            icon={<IconThreads />}
            url='https://www.threads.net/@replant.world'
          />
          <SocialLink
            icon={<IconYouTube />}
            url='https://www.youtube.com/@replantworld'
          />
        </div>
      </div>
      <p className='text-neutral-400 dark:text-gray-200 text-base font-normal'>
        Replant World Copyright © {new Date().getFullYear()}
      </p>
    </footer>
  );
}
