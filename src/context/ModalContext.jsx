"use client";

import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modal, setModal] = useState({ type: null, props: {} });

  const openModal = (type, props = {}) => setModal({ type, props });
  const closeModal = () => setModal({ type: null, props: {} });

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
      {/* Centralized modal renderer */}
      {modal.type === "verifyEmail" && (
        <VerifyEmailModal {...modal.props} onClose={closeModal} />
      )}
      {modal.type === "search" && (
        <SearchModal {...modal.props} onClose={closeModal} />
      )}
      {modal.type === "upload" && (
        <UploadModal {...modal.props} onClose={closeModal} />
      )}
      {modal.type === "addMoreInfo" && (
        <AddMoreInfoModal {...modal.props} onClose={closeModal} />
      )}
      {modal.type === "selectProject" && (
        <SelectProjectModal {...modal.props} onClose={closeModal} />
      )}
      {modal.type === "moveItems" && (
        <MoveItemsModal {...modal.props} onClose={closeModal} />
      )}
      {modal.type === "duplicateItems" && (
        <DuplicateItemsModal {...modal.props} onClose={closeModal} />
      )}
      {modal.type === "deleteItems" && (
        <DeleteItemsModal {...modal.props} onClose={closeModal} />
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}

// Import after declaration to avoid circular imports
import VerifyEmailModal from "@/components/modals/VerifyEmailModal";
import SearchModal from "@/components/modals/SearchModal";
import UploadModal from "@/components/modals/UploadModal";
import AddMoreInfoModal from "@/components/modals/AddMoreInfoModal";
import SelectProjectModal from "@/components/modals/SelectProjectModal";
import MoveItemsModal from "@/components/modals/MoveItemsModal";
import DuplicateItemsModal from "@/components/modals/DuplicateItemsModal";
import DeleteItemsModal from "@/components/modals/DeleteItemsModal";
