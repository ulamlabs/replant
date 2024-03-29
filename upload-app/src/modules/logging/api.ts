import { post } from 'modules/api';
import { HistoryEvent } from './types';

export const userHistoryUrl = '/user-history';

export type UserHistoryPayload = { history: HistoryEvent[] };

export type UserHistoryResponse = {};

export type UserHistoryError = {};

export const postUserHistory = (payload: UserHistoryPayload) =>
  post<UserHistoryResponse, UserHistoryPayload>(userHistoryUrl, payload);
