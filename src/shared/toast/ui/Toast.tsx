"use client";

import { createPortal } from "react-dom";
import clsx from "clsx";

import { Title } from "@/shared/title";
import { IconCancel, IconDone } from "@/shared/icons";
import { useToastStore } from "@/shared/toast";

export default function Toast() {
  const { getShow, getError, getSuccess, getMessage, close } = useToastStore();

  if (!getShow()) {
    return null;
  }

  return createPortal(
    <div
      className="fixed left-1/2 -translate-x-1/2 bottom-[20px] py-[10px] w-full bg-card-bg"
      onClick={close}
    >
      <div
        className={clsx(
          "flex items-center justify-center gap-x-[8px] cursor-pointer",
          {
            ["text-error-text"]: getError(),
            ["text-success-text"]: getSuccess(),
          },
        )}
      >
        {getError() && <IconCancel />}
        {getSuccess() && <IconDone />}

        <Title className="text-normal" variant="h3">
          {getMessage()}
        </Title>
      </div>
    </div>,
    document.body,
  );
}
