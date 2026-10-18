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
      className="fixed right-[20px] bottom-[20px] py-[10px] rounded-md min-w-xs bg-card-bg z-200 overflow-hidden"
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
