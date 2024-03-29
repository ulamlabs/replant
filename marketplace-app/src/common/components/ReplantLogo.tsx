export function ReplantLogo() {
  return (
    <>
      <img
        className='dark:hidden h-8 md:min-w-9 md:h-12'
        src='replant_logo_black.png'
        alt='Replant'
      />
      <img
        className='hidden dark:block h-8 md:min-w-9 md:h-12'
        src='replant_logo_white.png'
        alt='Replant'
      />
    </>
  );
}
