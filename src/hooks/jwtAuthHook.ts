import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import httpErrors from '../utils/httpErrors';

export default (request: Request, response: Response, next: NextFunction): NextFunction | Response | void => {

  const allowList = ['/health', '/auth', '/docs/', '/clients'];
  const isValidUrl = request.url.match(allowList.join('|'));

  if (isValidUrl && allowList.includes(isValidUrl[0])) return next();

  const { headers } = request;
  const { authorization: authHeader } = headers;

  if (!authHeader) {
    return response.status(401).json({ message: httpErrors.unauthorized('Token').toString() });
  }

  const [prefix, token] = authHeader.split(' ');

  if (!/^Bearer$/i.test(prefix)) {
    return response.status(401).json({ message: httpErrors.unauthorized('Token').toString() });
  }

  try {
    const jwtSalt = process.env.JWT_SALT || '';
    const decoded = jwt.verify(token, jwtSalt);
    const { user }: any = decoded;
    const userData = user as User;
    request.userType = userData.type;
    request.userId = userData.id;
    request.userStatus = userData.status;
    return next();
  } catch (error) {
    return response.status(401).json({ message: httpErrors.unauthorized('Token').toString() });
  }
};
