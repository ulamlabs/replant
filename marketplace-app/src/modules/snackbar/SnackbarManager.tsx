import { useCallback, useEffect, useState } from 'react';
import { Snackbar } from './Snackbar';
import { Message, MessageWithId } from './types';
import { SNACKBAR_EVENT } from './utils';

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

  const handleOpenSnackbar = useCallback(
    (event: Event) => {
      addMessage((event as CustomEvent<Message>).detail);
    },
    [addMessage]
  );

  useEffect(() => {
    document.addEventListener(SNACKBAR_EVENT, handleOpenSnackbar);
    return () => {
      document.removeEventListener(SNACKBAR_EVENT, handleOpenSnackbar);
    };
  }, [handleOpenSnackbar]);

  return (
    <div className='fixed flex flex-col gap-2 z-50 bottom-0 left-0 p-4 items-end'>
      {messages.map(({ id, message, severity, title }) => (
        <Snackbar
          key={id}
          severity={severity}
          onClose={() => removeMessage(id)}
          hideAfter={7000}
          message={message}
          title={title}
        />
      ))}
    </div>
  );
};
