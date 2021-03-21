export type LoginInput = {
  email: string;
  password: string;
};

export interface RegisterInput extends LoginInput {
  name: string
}

export type AllMsgType = {
  count: number;
  messages: MessageResponse[];
};

export type CommonResponse<T> = {
  status: 'SUCCESS' | 'FAILED';
  data: T;
};

export type UserResponse = {
  id: number;
  email: string;
  name: string;
};

export type MessageResponse = {
  id: number;
  content: string;
  url: string;
  expiresAt: number;
  expired: boolean;
  type: 'MESSAGE' | 'LINK';
};

export type MessageInput = {
  content: string;
  type: string;
  expiresAt: number;
};
