import { AxiosRequestConfig } from 'axios';
import JwtHelper from './jwtHelper';

export interface AuthHelperInterface {
  defaultHeader: () => {};
  getAuthHeader: () => {};
  isValidToken: () => boolean;
  isAuthenticated: () => boolean;
  isCurrentUser(uid: string): boolean;
  userRole: () => string | number;
  getUserInfo: () => {};
}

const strategies: any = {
  JWT: JwtHelper,
  __default__: JwtHelper
};

class DynamicAuth {
  [x: string]: any;

  constructor(type: string) {
    const currentAuth = strategies[type];
    Object.setPrototypeOf(DynamicAuth.prototype, new currentAuth());
  }
}

// tslint:disable-next-line: max-classes-per-file
export default class AuthHelper extends DynamicAuth {
  constructor(type = 'JWT') {
    super(type);
  }

  defaultHeader() {
    if (super.defaultHeader) {
      return super.defaultHeader();
    }
    // default code here
  }

  getAuthHeader() {
    if (super.getAuthHeader) {
      return super.getAuthHeader();
    }
    // default code here
  }

  getUserInfo() {
    return super.getUserInfo() || null;
  }

  /**
   * Token conditions: custom checking access token
   * @method isValidToken
   * @return {boolean}    `true` : valid token for calling API
   *                      `false`: need to refresh access_token
   */
  isValidToken(): any {
    /**
     * Adding conditions here
     */
    // TODO

    if (super.isValidToken) {
      return super.isValidToken();
    }
    // default code here
  }

  isAuthenticated(): boolean {
    return super.isAuthenticated();
  }

  setAuthHeader(
    request: any
  ): Promise<AxiosRequestConfig> | AxiosRequestConfig {
    // Get and check access token
    if (this.isAuthenticated()) {
      // Check `access token` condition
      if (!this.isValidToken()) {
        return this.handleRefreshToken(request);
      }
      const authHeader = this.getAuthHeader();
      Object.assign(request.headers, authHeader);
      return request;
    }
    return request;
  }

  // /**
  //  * Handle refresh token with current API request
  //  * @method handleRefreshToken
  //  * @param   [request] - current API request that have expired access_token or get 401 Unauthorized
  //  * @returns Promise<AxiosRequestConfig>
  //  */
  handleRefreshToken(request: AxiosRequestConfig): any { // Promise<AxiosRequestConfig>
    // TODO: handle refresh token
    return null;
  }
}
