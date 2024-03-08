export type Severity = 'error' | 'success';

export type Message = {
  message: string;
  severity: Severity;
};

export type MessageWithId = Message & { id: number };
