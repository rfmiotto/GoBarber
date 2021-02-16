export default {
  jwt: {
    secret: process.env.APP_SECRET || 'some-value-for-test',
    expiresIn: '1d',
  },
};
