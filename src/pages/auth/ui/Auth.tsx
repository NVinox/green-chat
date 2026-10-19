import { useNavigate } from "react-router-dom";
import { useTransition, type ChangeEvent } from "react";

import {
  AccountService,
  useAccountStore,
  type TAccountCredentials,
} from "@/entities/account";

import { Button } from "@/shared/button";
import { Form } from "@/shared/form";
import { Input } from "@/shared/input";
import { Title } from "@/shared/title";
import { HOME_ROUTE } from "@/shared/constants";

export default function Auth() {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const {
    setApiTokenInstance,
    setIdInstanse,
    setAccountErrors,
    getIdInstanse,
    getApiTokenInstance,
    getSettings,
    getAccountErrors,
    clear,
  } = useAccountStore();

  function login(): void {
    const accountCredentials: TAccountCredentials = {
      idInstance: getIdInstanse(),
      apiTokenInstance: getApiTokenInstance(),
    };

    startTransition(async () => {
      const data = await getSettings(accountCredentials);

      if (data) {
        AccountService.login(accountCredentials);
        navigate(HOME_ROUTE);
        clear();
      }
    });
  }

  function changeIdInstance(e: ChangeEvent<HTMLInputElement>) {
    const errors = getAccountErrors();

    if (errors.idInstance) {
      errors.idInstance = undefined;
      setAccountErrors(errors);
    }

    e.target.value = e.target.value.replace(/\D/g, "");

    setIdInstanse(+e.target.value);
  }

  function changeApiTokenInstance(e: ChangeEvent<HTMLInputElement>) {
    const errors = getAccountErrors();

    if (errors.apiTokenInstance) {
      errors.apiTokenInstance = undefined;
      setAccountErrors(errors);
    }

    setApiTokenInstance(e.target.value);
  }

  return (
    <Form className="flex flex-col gap-y-[26px] items-stretch border border-main-border bg-card-bg max-w-[500px] w-full px-[40px] py-[20px] rounded-lg overflow-hidden">
      <Title className="title text-center">Авторизация</Title>

      <div className="flex flex-col gap-y-[15px]">
        <Input
          label="IdInstance"
          type="text"
          onChange={changeIdInstance}
          error={getAccountErrors().idInstance}
          disabled={isPending}
          value={getIdInstanse() ? getIdInstanse() : ""}
          required
        />
        <Input
          label="ApiTokenInstance"
          type="password"
          onChange={changeApiTokenInstance}
          error={getAccountErrors().apiTokenInstance}
          disabled={isPending}
          value={getApiTokenInstance()}
          required
        />
      </div>

      <Button type="button" isLoading={isPending} onClick={login}>
        Войти
      </Button>
    </Form>
  );
}
