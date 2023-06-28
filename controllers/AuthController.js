import { v4 as uuidv4 } from 'uuid';
import RedisClient from '../utils/redis';
import DBClient from '../utils/db';

const { createHash } = require('crypto');

class AuthController {
  static getConnect(request, response) {
    (async () => {
      // use authorization header to get the token, remove 'base', and split by ' '
      const unSplit = Buffer.from(request.headers.authorization.split(' ')[1], 'base64').toString('ascii');
      const [email, password] = unSplit.split(':');
      // If not found, return an error Unauthorized with a status code 401
      if (!email || !password) return response.status(401).send({ error: 'Unauthorized' });
      // utilize createHash to hash the password

