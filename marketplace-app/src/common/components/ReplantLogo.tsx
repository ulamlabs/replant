export function ReplantLogo() {
  return (
    <>
      <img
        className='dark:hidden h-[31px] md:min-w-[38.55px] md:h-[50px]'
        src='replant_logo_black.png'
        alt='Replant'
      />
      <img
        className='hidden h-[31px] dark:block md:min-w-[38.55px] md:h-[50px]'
        src='replant_logo_white.png'
        alt='Replant'
      />
    </>
  );
}
