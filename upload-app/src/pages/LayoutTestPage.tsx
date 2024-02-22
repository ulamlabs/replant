import { Layout } from 'modules/layout';

export const LayoutTestPage: React.FC = () => {
  return (
    <Layout navigation>
      <div className='w-full h-[2000px] bg-red-200'></div>
    </Layout>
  );
};