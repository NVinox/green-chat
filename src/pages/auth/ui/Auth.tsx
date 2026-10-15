import { Form } from "@/shared/form";
import { Input } from "@/shared/input";

export default function Auth() {
  return (
    <Form className="flex flex-col gap-y-[26px] items-center border border-main-border bg-card-bg max-w-[500px] w-full px-[40px] py-[20px] rounded-lg overflow-hidden">
      <h1 className="title">Авторизация</h1>

      <div className="flex flex-col w-full gap-y-[15px]">
        <Input label="IdInstance" />
        <Input label="ApiTokenInstance" />
      </div>
    </Form>
  );
}
