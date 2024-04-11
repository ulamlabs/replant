export type Severity = 'error' | 'success' | 'warning' | 'info';

export type Message = {
  title?: string;
  message: string;
  severity: Severity;
};

export type MessageWithId = Message & { id: number };
