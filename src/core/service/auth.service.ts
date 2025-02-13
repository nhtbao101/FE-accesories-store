import AuthHelper from '../helpers/authHelper';
import { ApiService } from './api.service';
import { ENDPOINT } from '@/config/endpoint';
import { LoginData } from '../interface/auth';

export class AuthService extends AuthHelper {
  http = new ApiService();

  constructor() {
    super();
  }

  async AdminSignUp(body: any) {
    /* this is the default signIn,
      If you want to override it, please write the same function in specific type of auth.
    */
    return this.http.post([ENDPOINT.auth.adminSignUp], body);
  }

  async UserSignUp(body: any) {
    /* this is the default signIn,
      If you want to override it, please write the same function in specific type of auth.
    */
    return this.http.post([ENDPOINT.auth.userSignUp], body);
  }

  async AdminSignIn(body: LoginData) {
    return await this.http
      .post([ENDPOINT.auth.adminSignIn], body)
      .then((res) => {
        return res;
      });
  }

  async UserSignIn(body: any) {
    /* this is the default signIn,
      If you want to override it, please write the same function in specific type of auth.
    */
    return this.http.post([ENDPOINT.auth.userSignIn], body);
  }

  signOut() {
    this.removeToken();
  }
}
