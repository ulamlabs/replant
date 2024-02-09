import { Button, Header, Section } from 'common/components';
import { useFmtMsg } from 'modules/intl';
import { usePlantsMutation } from 'modules/plants';
import { SpeciesAutocomplete } from 'modules/species';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaptureInput, NewPlantSummary } from './components';
import { useNewPlantStore } from './store';

export const NewPlant: React.FC = () => {
  const fmtMsg = useFmtMsg();

  const navigate = useNavigate();

  const store = useNewPlantStore();

  const plantsMutation = usePlantsMutation();

  useEffect(() => {
    store.reset();
  }, []);

  const submit = () => {
    let speciesError: typeof store.speciesError;
    let imageError: typeof store.imageError;

    if (!store.image) {
      imageError = fmtMsg('fieldRequired');
    }
    if (!store.species) {
      speciesError = fmtMsg('fieldRequired');
    }

    store.setImageError(imageError);
    store.setSpeciesError(speciesError);

    if (imageError || speciesError) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageBinaryString = reader.result as string;
      plantsMutation.mutate({
        assigned_species_id: store.species!.id,
        image: window.btoa(imageBinaryString),
        latitude: store.latitude!,
        longitude: store.longitude!,
      });
    };
    reader.readAsBinaryString(store.image!);
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
        <CaptureInput />
        <SpeciesAutocomplete
          value={store.species ?? null}
          error={store.speciesError}
          onChange={(value) => {
            store.setSpecies(value);
          }}
        />
        <NewPlantSummary />
      </div>
    </Section>
  );
};
