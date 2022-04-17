import { NextFunction, Request, Response } from 'express';
import { ROUTE_PERMISSION } from '../utils/routePermissions';

export default (request: Request, response: Response, next: NextFunction): NextFunction | Response | void => {
  const { userType } = request;
  if(userType === "ADMINISTRATOR") return next();

  const routeName = `${request.method}${request.baseUrl}${request.route.path}`;

  const hasPermission = ROUTE_PERMISSION[routeName].includes(userType);
  if(!hasPermission) return response.status(403).json({ message: `User of type ${userType} does not have permission on this route` })

  return next();
}
