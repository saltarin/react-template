import axios from '@app/src/config/axios';

export class UserService {
  static async get(user, pwd) {
    try {
      const { data } = await axios.get(process.env.API_USER, {
        params: {
          user,
          pwd
        }
      });
      if (data.error) {
        throw new Error();
      }
      return {
        data
      };
    } catch (e) {
      throw new Error(e.message);
    }
  }
}