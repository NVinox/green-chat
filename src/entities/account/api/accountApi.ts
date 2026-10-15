import { apiInstance } from "@/shared/api";
import type {
  TAccountCredentials,
  TAccountSettingsResponse,
} from "@/entities/account";
import type { AxiosResponse } from "axios";

export class AccountAPI {
  static async getSettings(
    accountCredentials: TAccountCredentials,
  ): Promise<AxiosResponse<TAccountSettingsResponse>> {
    return await apiInstance.get<TAccountSettingsResponse>(
      `/waInstance${accountCredentials.idInstance}/getSettings/${accountCredentials.apiTokenInstance}`,
    );
  }
}
