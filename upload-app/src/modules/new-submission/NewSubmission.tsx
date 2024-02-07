import { Button, Header, Section } from 'common/components';
import { CameraIcon, ImageIcon } from 'common/icons';
import { useFmtMsg } from 'modules/intl';
import { useNavigate } from 'react-router-dom';
import { Summary, SummaryItem } from './components';
import { SpeciesAutocomplete } from './SpeciesAutocomplete';
import { useState } from 'react';
import { AssignedSpecies } from './api';
import { Capture } from './Capture';

export const NewSubmission: React.FC = () => {
  const fmtMsg = useFmtMsg();

  const navigate = useNavigate();

  const [image, setImage] = useState<Blob>();

  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const [species, setSpecies] = useState<AssignedSpecies>();
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
      <div className='space-y-5'>
        <Header
          text={fmtMsg('addTree')}
          onBack={() => {
            navigate('/');
          }}
        />
        <div>
          <span className='text-xs'>{fmtMsg('photo')}</span>
          <div
            className='border border-black dark:border-white py-4 px-5 rounded-full flex justify-center items-center gap-2'
            onClick={() => {
              setIsCameraOpen(true);
            }}
          >
            <CameraIcon
              svgClassName='size-6'
              pathClassName='fill-black dark:fill-white'
            />
            <span className='font-bold'>
              {image ? fmtMsg('changePhoto') : fmtMsg('capturePhoto')}
            </span>
          </div>
          {isCameraOpen && (
            <Capture
              onCancel={() => {
                setIsCameraOpen(false);
              }}
              onCapture={(image) => {
                setImage(image);
                setIsCameraOpen(false);
              }}
            />
          )}
        </div>
        <SpeciesAutocomplete
          value={species ?? null}
          error={speciesError}
          onChange={(value) => {
            setSpecies(value);
          }}
        />
        <Summary>
          <SummaryItem>
            <span>{fmtMsg('photo')}</span>
            <div className='rounded border border-black dark:border-white h-16 w-12 flex items-center justify-center box-content'>
              {image ? (
                <img
                  className='h-16 w-12 rounded'
                  src={URL.createObjectURL(image)}
                />
              ) : (
                <ImageIcon
                  svgClassName='size-4.5'
                  pathClassName='fill-black dark:fill-white'
                />
              )}
            </div>
          </SummaryItem>
          <SummaryItem>
            <span>{fmtMsg('botanicalName')}</span>
            <span>{species?.species.botanical_name ?? '-'}</span>
          </SummaryItem>
          <SummaryItem>
            <span>{fmtMsg('commonName')}</span>
            <span>{species?.species.common_name ?? '-'}</span>
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
