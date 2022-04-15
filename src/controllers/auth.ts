import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import AuthService from '../services/auth';
import HttpStatusCode from '../typings/enums/HttpStatusCodeEnum';

class AuthController {

  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    const user = await this.authService.autentication(username, password);
    if (!user) return res.status(422).send(HttpStatusCode.UNPROCESSABLE_ENTITY);

    const jwtSalt = process.env.JWT_SALT || 'erp12345';

    return res
      .header('Authorization', `Bearer ${jwt.sign({ user }, jwtSalt, { expiresIn: '1d' })}`)
      .json({ data: user })
      .status(200)
  }

}

export default AuthController;
