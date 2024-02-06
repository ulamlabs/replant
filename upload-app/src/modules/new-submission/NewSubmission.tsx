import { Button, Header, Section } from 'common/components';
import { CameraIcon, ImageIcon, LoupeIcon } from 'common/icons';
import { useFmtMsg } from 'modules/intl';
import { useNavigate } from 'react-router-dom';
import { Summary, SummaryItem } from './components';

export const NewSubmission: React.FC = () => {
  const fmtMsg = useFmtMsg();

  const navigate = useNavigate();

  return (
    <Section
      actions={<Button size='big' text={fmtMsg('submit')} onClick={() => {}} />}
    >
      <div className='space-y-5'>
        <Header
          text={fmtMsg('addTree')}
          onBack={() => {
            navigate('/');
          }}
        />
        <div>
          <span className='text-xs'>{fmtMsg('photo')}</span>
          <div className='border border-black dark:border-white py-4 px-5 rounded-full flex justify-center items-center gap-2'>
            <CameraIcon
              svgClassName='size-6'
              pathClassName='fill-black dark:fill-white'
            />
            <span className='font-bold'>
              {Math.random() >= 0.5
                ? fmtMsg('changePhoto')
                : fmtMsg('capturePhoto')}
            </span>
          </div>
        </div>
        <div>
          <span className='text-xs'>{fmtMsg('species')}</span>
          <div className='border border-black dark:border-white py-2.5 px-5 rounded-full flex gap-2 justify-between items-center'>
            {fmtMsg('search')}
            <LoupeIcon pathClassName='fill-black dark:fill-white' />
          </div>
        </div>
        <Summary>
          <SummaryItem>
            <span>{fmtMsg('photo')}</span>
            <div className='rounded border border-black dark:border-white h-16 w-12 flex items-center justify-center'>
              <ImageIcon
                svgClassName='size-4.5'
                pathClassName='fill-black dark:fill-white'
              />
            </div>
          </SummaryItem>
          <SummaryItem>
            <span>{fmtMsg('botanicalName')}</span>
            <span>-</span>
          </SummaryItem>
          <SummaryItem>
            <span>{fmtMsg('commonName')}</span>
            <span>-</span>
          </SummaryItem>
          <SummaryItem>
            <span>{fmtMsg('location')}</span>
            <span>-</span>
          </SummaryItem>
        </Summary>
      </div>
    </Section>
  );
};
