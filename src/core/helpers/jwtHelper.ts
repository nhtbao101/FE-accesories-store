import * as jwt from 'jsonwebtoken';
import { AuthHelperInterface } from './authHelper';
import { AuthStorageService } from '../service/authStorage.service';

export default class JwtHelper
  extends AuthStorageService
  implements AuthHelperInterface
{
  defaultHeader = () => ({
    // TODO: make default jwt header
  });

  getAuthHeader = () => ({
    Authorization: `Bearer ${this.getToken()}`
  });

  /**
   * Token conditions: custom checking access token
   * @method isValidToken
   * @return {boolean}    `true` : valid token for calling API
   *                      `false`: need to refresh access_token
   */
  isValidToken(): boolean {
    /**
     * Adding conditions here
     */
    // TODO

    // Default return
    return !!this._verifyJWTToken().isTokenValid;
  }

  isAuthenticated() {
    const { isTokenValid } = this._verifyJWTToken();
    return !!isTokenValid;
  }

  isCurrentUser(uid: string) {
    return false;
    // const userInfo = this.getUserInfo();
    // return userInfo ? uid === userInfo.uid : false;
  }

  userRole() {
    return undefined;
    // const userInfo = this.getUserInfo();
    // return userInfo ? userInfo.role : undefined;
  }

  getUserInfo() {
    const { isTokenValid, token } = this._verifyJWTToken();
    if (isTokenValid) {
      return jwt.decode(token, { complete: true }).payload;
    } else {
      return null;
    }
  }

  private _verifyJWTToken() {
    const token: string | boolean = this.getToken();
    const isTokenValid = jwt.decode(token);
    if (!isTokenValid) {
      this.removeToken();
    }
    return { isTokenValid, token };
  }
}
