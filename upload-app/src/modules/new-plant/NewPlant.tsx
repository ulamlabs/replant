import { Snackbar } from '@mui/base';
import { Alert, Button, Header, Section } from 'common/components';
import { prettifyError } from 'common/utils';
import { useFmtMsg } from 'modules/intl';
import { usePlantsMutation } from 'modules/plants';
import { SpeciesAutocomplete, useSpecies } from 'modules/species';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Capture, NewPlantSummary } from './components';
import { useNewPlantStore } from './store';

export const NewPlant: React.FC = () => {
  const fmtMsg = useFmtMsg();

  const navigate = useNavigate();

  const store = useNewPlantStore();

  const plantsMutation = usePlantsMutation();

  const { data: species } = useSpecies();

  const noPlantSpecies = species && !species.length; // species loaded, but no items

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    store.reset();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const submit = async () => {
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

    await plantsMutation.mutateAsync({
      assigned_species_id: store.species!.id,
      ...store.image!,
    });
    setSnackbarOpen(true);
    store.setImage(undefined);
  };

  return (
    <Section
      actions={
        <Button
          disabled={noPlantSpecies || plantsMutation.isPending}
          isLoading={plantsMutation.isPending}
          text={fmtMsg('submit')}
          onClick={submit}
        />
      }
      className='max-w-xl'
    >
      <div className='space-y-5'>
        <Header
          text={fmtMsg('addTree')}
          onBack={() => {
            navigate('/');
          }}
        />
        {noPlantSpecies && (
          <Alert
            severity='error'
            text={fmtMsg('thereAreNoPlantSpeciesAssignedToYourCommunity')}
          />
        )}
        {plantsMutation.isError && (
          <Alert severity='error' text={prettifyError(plantsMutation.error)} />
        )}
        <Capture />
        <SpeciesAutocomplete
          value={store.species ?? null}
          error={store.speciesError}
          onChange={store.setSpecies}
        />
        <NewPlantSummary />
      </div>
      <Snackbar
        className='bg-green-400 fixed rounded-lg top-5 right-5 px-5 py-2.5 text-base'
        autoHideDuration={5000}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
      >
        {fmtMsg('successYouCanNowAddNextTree')}
      </Snackbar>
    </Section>
  );
};
