import { Tree } from 'types';

type TreeDetailsProps = {
  tree: Tree;
  onClick?: () => void;
};

export function TreeTile(props: TreeDetailsProps) {
  return (
    <div
      className='flex flex-col bg-stone-50 dark:bg-neutral-850 rounded-3xl overflow-hidden cursor-pointer w-full transition-colors hover:bg-teal-100 dark:hover:bg-neutral-750'
      onClick={props.onClick}
    >
      <div
        style={{ backgroundImage: `url(${props.tree.image})` }}
        className='h-64 bg-cover bg-center'
      />
      <div className='p-5'>
        <div className='font-bold text-lg'>{props.tree.botanical_name}</div>
        <div className='text-neutral-400 dark:text-zinc-600 text-base'>
          {props.tree.common_name}
        </div>
        <div className='flex justify-between items-center mt-3'>
          <span className='text-[29px] font-bold'>
            ${props.tree.planting_cost_usd}
          </span>
          <span className='text-neutral-400 dark:text-zinc-600 text-sm font-normal'>
            #{props.tree.nft_id}
          </span>
        </div>
      </div>
    </div>
  );
}
