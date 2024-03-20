export function ReplantLogo() {
  return (
    <>
      <img
        className='dark:hidden w-50  max-h-[50px]'
        src='replant_logo_black.png'
        alt='Replant'
      />
      <img
        className='hidden dark:block max-h-[50px]'
        src='replant_logo_white.png'
        alt='Replant'
      />
    </>
  );
}
