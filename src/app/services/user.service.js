import httpsService from './http.service';
const userEndPoint = 'user/';

const userService = {
    get: async () => {
      const { data } = await httpsService.get(userEndPoint);
      return data;
    },
    create: async (payload) => {
        const { data } = await httpsService.put(userEndPoint + payload._id, payload);
        return data;
    }
};
export default userService;
