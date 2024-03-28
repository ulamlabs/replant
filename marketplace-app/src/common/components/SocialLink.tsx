import { FC } from 'react';

type Props = {
  url: string;
  icon: JSX.Element;
};

export const SocialLink: FC<Props> = ({ url, icon }) => {
  return (
    <a href={url} target='_blank' className='hover:opacity-60'>
      {icon}
    </a>
  );
};
