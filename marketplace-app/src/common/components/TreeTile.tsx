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
      <div
        style={{ backgroundImage: `url(${props.tree.image})` }}
        className='h-56 sm:h-96 bg-cover bg-center self-stretch rounded-lg'
      />
      <div className='py-4'>
        <div className='font-medium text-sm sm:text-lg max-w-full overflow-hidden text-ellipsis text-nowrap'>
          {props.tree.botanical_name}
        </div>
        <span className='text-neutral-400 dark:text-zinc-600 text-xs sm:text-sm font-normal'>
          #{props.tree.nft_id}
        </span>
        <div className='flex justify-between items-center mt-3'>
          <span className=' text-xl sm:text-3xl font-semibold'>
            ${props.tree.planting_cost_usd}
          </span>
        </div>
      </div>
    </div>
  );
}
