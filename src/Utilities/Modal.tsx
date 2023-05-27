import { useState } from "react";
import Modal from "styled-react-modal";

const StyledModal = Modal.styled`
  width: 30rem;
  height: 30rem;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  flex-direction: column;
`;

//@ts-ignore
export default function MyModal({
  isOpen,
  toggleModal,
  children,
  submitButtonText,
  onSubmit,
}:MyModalProps) {
  return (
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      {children}
      <div>
        <button
          onClick={() => {
            toggleModal();
            onSubmit();
          }}
        >
          {submitButtonText}
        </button>
        <button onClick={toggleModal}>Close</button>
      </div>
    </StyledModal>
  );
}


interface MyModalProps{
  isOpen:any;
  toggleModal:any;
  children:any;
  submitButtonText:string;
  onSubmit:any;
}