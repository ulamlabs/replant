import { Planter } from 'types';
import { UsersList } from '.';

// to delete after testing
const testData: Planter[] = [
  {
    id: 1,
    name: 'wojtek maslowski',
    trees: 2137,
    percentage: 55,
    img: 'https://uploads-ssl.webflow.com/63086d41671f3bfcf18a5762/652fb89d535953efb3b84cde_image%201421%20(1).png',
    company: 'test',
  },
  {
    id: 2,
    name: 'wojtek maslowski',
    trees: 2137,
    percentage: 55,
    img: 'https://uploads-ssl.webflow.com/63086d41671f3bfcf18a5762/652fb89d535953efb3b84cde_image%201421%20(1).png',
    company: 'test',
  },
  {
    id: 3,
    name: 'wojtek maslowski',
    trees: 2137,
    percentage: 55,
    img: 'https://uploads-ssl.webflow.com/63086d41671f3bfcf18a5762/652fb89d535953efb3b84cde_image%201421%20(1).png',
    company: 'test',
  },
  {
    id: 4,
    name: 'wojtek maslowski',
    trees: 2137,
    percentage: 55,
    img: 'https://uploads-ssl.webflow.com/63086d41671f3bfcf18a5762/652fb89d535953efb3b84cde_image%201421%20(1).png',
    company: 'test',
  },
  {
    id: 5,
    name: 'wojtek maslowski',
    trees: 2137,
    percentage: 55,
    img: 'https://uploads-ssl.webflow.com/63086d41671f3bfcf18a5762/652fb89d535953efb3b84cde_image%201421%20(1).png',
    company: 'test',
  },
];

export const TopUsersSection = () => {
  return (
    <section className='mb-20 flex flex-col justify-between gap-7 xl:flex-row'>
      <UsersList data={testData} type='sponsors' />
      <UsersList data={testData} type='planters' />
    </section>
  );
};
