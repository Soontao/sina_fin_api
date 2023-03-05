import axios from "axios";

export const client = axios.create({
  validateStatus: (status) => {
    if (status === 456) {
      throw new TypeError(`sina rate limit`);
    }
    return true;
  }
});

export default client;