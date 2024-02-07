import clsx from 'clsx';
import { Button, Header, Section } from 'common/components';
import { CameraIcon, ImageIcon } from 'common/icons';
import { useFmtMsg } from 'modules/intl';
import { AssignedSpecies } from 'modules/species';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Capture } from './Capture';
import { SpeciesAutocomplete } from './SpeciesAutocomplete';
import { Summary, SummaryItem } from './components';

export const NewSubmission: React.FC = () => {
  const fmtMsg = useFmtMsg();

  const navigate = useNavigate();

  const [image, setImage] = useState<Blob>();
  const [imageError, setImageError] = useState('');

  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const [species, setSpecies] = useState<AssignedSpecies>();
  const [speciesError, setSpeciesError] = useState('');

  const submit = () => {
    let speciesError = '';
    let imageError = '';

    if (!image) {
      imageError = fmtMsg('fieldRequired');
    }
    if (!species) {
      speciesError = fmtMsg('fieldRequired');
    }

    setImageError(imageError);
    setSpeciesError(speciesError);

    if (imageError || speciesError) {
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
            className={clsx(
              'border py-4 px-5 rounded-full flex justify-center items-center gap-2',
              imageError
                ? 'border-red-400 dark:border-red-400'
                : 'border-black dark:border-white'
            )}
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
          {imageError && (
            <span
              className={'text-left text-xs text-red-400 dark:text-red-400'}
            >
              {imageError}
            </span>
          )}
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
