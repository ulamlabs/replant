import { Tree } from 'types';

type TreeDetailsProps = {
  tree: Tree;
  onClick?: () => void;
};

export function TreeTile(props: TreeDetailsProps) {
  return (
    <div
      className='flex flex-col overflow-hidden cursor-pointer w-full'
      onClick={props.onClick}
    >
      <img
        src={props.tree.image}
        className='w-full bg-cover bg-center rounded-lg aspect-[3/4]'
        alt={props.tree.botanical_name}
      />
      <div className='py-4'>
        <div className='font-medium text-sm md:text-lg max-w-full overflow-hidden text-ellipsis text-nowrap'>
          {props.tree.botanical_name}
        </div>
        <span className='text-neutral-400 dark:text-zinc-600 text-xs md:text-sm font-normal'>
          #{props.tree.nft_id}
        </span>
        <div className='flex justify-between items-center mt-3'>
          <span className=' text-xl md:text-3xl font-semibold'>
            ${props.tree.planting_cost_usd}
          </span>
        </div>
      </div>
    </div>
  );
}
