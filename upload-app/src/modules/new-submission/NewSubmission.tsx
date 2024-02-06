import { Button, Header, Section } from 'common/components';
import { CameraIcon, ImageIcon } from 'common/icons';
import { useFmtMsg } from 'modules/intl';
import { useNavigate } from 'react-router-dom';
import { Summary, SummaryItem } from './components';
import { SpeciesAutocomplete } from './SpeciesAutocomplete';
import { useState } from 'react';
import { Species } from './api';

export const NewSubmission: React.FC = () => {
  const fmtMsg = useFmtMsg();

  const navigate = useNavigate();

  const [species, setSpecies] = useState<Species>();
  const [speciesError, setSpeciesError] = useState('');

  const submit = () => {
    let speciesError = '';

    if (!species) {
      speciesError = fmtMsg('fieldRequired');
    }

    setSpeciesError(speciesError);

    if (speciesError) {
      return;
    }

    // else submit
  };

  return (
    <Section
      actions={<Button size='big' text={fmtMsg('submit')} onClick={submit} />}
      className='max-w-xl'
    >
      <form className='space-y-5'>
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
        <SpeciesAutocomplete
          value={species}
          error={speciesError}
          onChange={(value) => {
            setSpecies(value);
          }}
        />
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
            <span>{species?.botanical_name ?? '-'}</span>
          </SummaryItem>
          <SummaryItem>
            <span>{fmtMsg('commonName')}</span>
            <span>{species?.common_name ?? '-'}</span>
          </SummaryItem>
          <SummaryItem>
            <span>{fmtMsg('location')}</span>
            <span>-</span>
          </SummaryItem>
        </Summary>
      </form>
    </Section>
  );
};
