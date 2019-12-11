import { UserServiceResponse } from '@app/src/model/UserServiceResponse';
import { UserViewModel } from '@app/src/model/UserViewModel';
import { simpleDateFormatter } from '@app/src/util/date';

export const viewAdapter = (response: UserServiceResponse): UserViewModel => {
  return {
    name: response.name,
    lives: response.lives,
    lastSession: simpleDateFormatter(response.lastSession)
  };
}