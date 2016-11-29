import _ from 'lodash';
import jwt from 'jsonwebtoken';
import get from 'lodash/get';

// generate secret key
// https://www.grc.com/passwords.htm
const SECRET = 'DF1F1EACB1A324A7146772E130BF886FC309220A76706C960C1FAD09CE8B85E1';

const options = {
  expiresIn: '7d',
  issuer: 'victim',
};

export default {
  sign: (member, audience = 'client') => {
    const isAdmin = new Date(get(member, 'is_admin', member.isAdmin));
    const rule = _.isString(member.rule) ? JSON.parse(member.rule) : member.rule;
    const maxStudio = _.get(rule, 'maxStudio', 5);
    return jwt.sign({
      id: member.id,
      isAdmin: isAdmin.getTime() > Date.now() || false,
      enabledStudio: get(member, 'enabled_studio', member.enabledStudio),
      rule: { maxStudio },
    }, SECRET, { ...options, audience });
  },
  compile: (payload, audience = 'client') => (
    jwt.sign(payload, SECRET, { ...options, audience })
  ),
  verify: (token, audience = 'client') => (
    jwt.verify(token, SECRET, { ...options, audience })
  ),
};
