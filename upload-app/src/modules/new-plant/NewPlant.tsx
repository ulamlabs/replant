import { Button, Header, Section } from 'common/components';
import { useFmtMsg } from 'modules/intl';
import { SpeciesAutocomplete } from 'modules/species';
import { useNavigate } from 'react-router-dom';
import { CaputureInput, NewPlantSummary } from './components';
import { useNewPlantStore } from './store';

export const NewPlant: React.FC = () => {
  const fmtMsg = useFmtMsg();

  const navigate = useNavigate();

  const store = useNewPlantStore();

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
        <CaputureInput />
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