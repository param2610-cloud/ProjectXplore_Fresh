import React from 'react';

interface ModalProps {
    isOpen: boolean;
    imageSrc: string;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, imageSrc, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
            <div className="relative">
                <img src={imageSrc} alt="Large View" className="max-w-full max-h-screen object-contain" />
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-white text-black rounded-full p-2 w-7 h-7 flex justify-center items-center text-2xl"
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default Modal;
