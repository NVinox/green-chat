import { Button } from "@/shared/button";
import { Form } from "@/shared/form";
import { Input } from "@/shared/input";

export default function Auth() {
  return (
    <Form className="flex flex-col gap-y-[26px] items-stretch border border-main-border bg-card-bg max-w-[500px] w-full px-[40px] py-[20px] rounded-lg overflow-hidden">
      <h1 className="title text-center">Авторизация</h1>

      <div className="flex flex-col gap-y-[15px]">
        <Input label="IdInstance" />
        <Input label="ApiTokenInstance" />
      </div>

      <Button type="button">Войти</Button>
    </Form>
  );
}
