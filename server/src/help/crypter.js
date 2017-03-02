import argon2 from 'argon2';

export default {
  hash: async password => (
    await argon2.hash(password, await argon2.generateSalt())
  ),
  verify: async (password, hash) => (
    await argon2.verify(hash, password)
  ),
};
