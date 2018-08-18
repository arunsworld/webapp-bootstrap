import { APIUserService } from '../app/home/user.service';
import { APILoginService } from '../app/login/login.service';

export const environment = {
  production: true,
  userService: APIUserService,
  loginService: APILoginService
};
