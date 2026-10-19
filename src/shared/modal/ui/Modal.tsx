import { createPortal } from "react-dom";

import { useModalStore } from "@/shared/modal";

export default function Modal() {
  const { getShow, closeModal, getContent } = useModalStore();

  if (!getShow()) {
    return null;
  }

  return createPortal(
    <div
      className="fixed flex items-center justify-center z-100 top-0 left-0 h-screen w-screen bg-overlay-bg backdrop-blur-[4px]"
      onClick={closeModal}
    >
      <div className="w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        {getContent()}
      </div>
    </div>,
    document.body,
  );
}
