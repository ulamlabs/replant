export function MailboxImage() {
  return (
    <>
      <img
        className='hidden dark:block '
        src='mailbox_black.svg'
        alt='Mailbox'
      />
      <img className='dark:hidden ' src='mailbox_white.svg' alt='Mailbox' />
    </>
  );
}
