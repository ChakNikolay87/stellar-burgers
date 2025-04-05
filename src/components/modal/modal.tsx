import { FC, ReactPortal, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "./modal-overlay/modal-overlay";
import { useSelector } from "react-redux";
import ModalContent from "./modalContent";
import { v4 as uuidv4 } from "uuid";

const modalRoot = document.getElementById("react-modals") as HTMLElement;

interface ModalProps {
  onClose: () => void;
}

const KEYCODE_ESC = "Escape";

const Modal: FC<ModalProps> = ({ onClose }): ReactPortal => {
  const { isOpen, modalType, modalData, modalTitle } = useSelector(
    (store: any) => {
      return store.modal;
    }
  );

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === KEYCODE_ESC) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [onClose]);

  const modal = isOpen ? (
    <div className={styles.modalContainer} key={uuidv4()}>
      <ModalOverlay onClose={onClose} />

      <div className={`${styles.modal} p-10 pb-15`}>
        <span className={styles.modalClose} onClick={onClose}></span>
        <span className={`${styles.modalTitle} text text_type_main-large`}>
          {modalTitle}
        </span>
        <div className={styles.modalContent}>
          <ModalContent modalType={modalType} modalData={modalData} />{" "}
        </div>
      </div>
    </div>
  ) : null;

  return ReactDOM.createPortal(modal, modalRoot);
};

export default Modal;
