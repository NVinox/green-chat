import Cookies from "js-cookie";

import type { TAccountCredentials } from "@/entities/account";

import {
  ID_INSTANCE_KEY,
  CREDETIALS_MAX_AGE,
  API_TOKEN_INSTANCE_KEY,
} from "@/shared/constants";

export class AccountService {
  static getCredentials(): TAccountCredentials {
    const idInstance = Cookies.get(ID_INSTANCE_KEY)!;
    const apiToken = Cookies.get(API_TOKEN_INSTANCE_KEY)!;

    return {
      idInstance: +idInstance,
      apiTokenInstance: apiToken,
    };
  }

  static login(credentials: TAccountCredentials): void {
    Cookies.set(ID_INSTANCE_KEY, credentials.idInstance.toString(), {
      expires: CREDETIALS_MAX_AGE,
    });
    Cookies.set(API_TOKEN_INSTANCE_KEY, credentials.apiTokenInstance, {
      expires: CREDETIALS_MAX_AGE,
    });
  }

  static logout(): void {
    Cookies.remove(ID_INSTANCE_KEY);
    Cookies.remove(API_TOKEN_INSTANCE_KEY);
  }
}
