import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
// import { ImWindows } from 'react-icons/im';
import PropTypes from 'prop-types';
import { Overlay, ModalDiv } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, children }) {
    useEffect(() => {
        document.addEventListener('keydown', handleBackdropClick);
        return () => {
            document.removeEventListener('keydown', handleBackdropClick);
        };
    });

    const handleBackdropClick = event => {
        if (event.code === 'Escape' || event.target === event.currentTarget) {
            onClose();
        }
    };

    return createPortal(
        <Overlay onClick={handleBackdropClick}>
            <ModalDiv>{children}</ModalDiv>
        </Overlay>,
        modalRoot
    );
}



Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.object.isRequired,
};

// class Modal extends Component {
// componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
// }

// componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
// }

// handleKeyDown = event => {
//     if (event.code === 'Escape') {
//         this.props.onClose();

//     }
// };

// handleBackdropClick = event => {
//     if (event.currentTarget === event.target) {
//         this.props.onClose();
//     }

// render() {
//     return createPortal(
//         <Overlay onClick={this.handleBackdropClick}>
//             <ModalDiv>{this.props.children}</ModalDiv>
//         </Overlay>,
//         modalRoot
//     );
// }
// }

// export default Modal;
