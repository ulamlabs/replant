import { useCallback, useEffect, useState } from 'react';
import { Snackbar } from './Snackbar';
import { Message, MessageWithId, Severity } from './types';

const SNACKBAR_EVENT = 'ReplantWorld:openSnackbar';

export const openSnackbar = (message: string, severity: Severity) => {
  document.dispatchEvent(
    new CustomEvent<Message>(SNACKBAR_EVENT, { detail: { message, severity } })
  );
};

let id = 0;

export const SnackbarManager: React.FC = () => {
  const [messages, setMessages] = useState<MessageWithId[]>([]);

  const addMessage = useCallback((message: Message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: id++,
        ...message,
      },
    ]);
  }, []);

  const removeMessage = useCallback((id: number) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== id)
    );
  }, []);

  const handleOpenSnackbar = useCallback((event: any) => {
    addMessage((event as CustomEvent<Message>).detail);
  }, []);

  useEffect(() => {
    document.addEventListener(SNACKBAR_EVENT, handleOpenSnackbar);
    return () => {
      document.removeEventListener(SNACKBAR_EVENT, handleOpenSnackbar);
    };
  }, []);

  return (
    <div className='fixed flex flex-col gap-2 z-50 top-0 right-0 p-4 items-end'>
      {messages.map(({ id, message, severity }) => (
        <Snackbar
          key={id}
          severity={severity}
          onClose={() => removeMessage(id)}
        >
          {message}
        </Snackbar>
      ))}
    </div>
  );
};

(window as any).openSnackbar = openSnackbar;
