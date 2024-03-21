export function ReplantLogo() {
  return (
    <>
      <img
        className='dark:hidden min-w-[38.55px] h-[50px]'
        src='replant_logo_black.png'
        alt='Replant'
      />
      <img
        className='hidden dark:block min-w-[38.55px] h-[50px]'
        src='replant_logo_white.png'
        alt='Replant'
      />
    </>
  );
}
