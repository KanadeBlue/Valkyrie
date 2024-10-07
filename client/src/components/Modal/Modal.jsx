// * DEPENDENCIES * //
import ReactDom from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

// * COMPONENTS * //
import Button from '../../components/Button';
import { AiOutlineClose } from 'react-icons/ai';

// * STYLES * //
const Modal = ({ children, title, action, handleSubmit, isModalOpen, close }) => {
    const handleClose = (e) => {
        if (e.target.classList[0] !== 'Overlay') return;
        close();
    };

    return ReactDom.createPortal(
        <>
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-55 flex items-center justify-center"
                        onClick={handleClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="w-450px min-h-100px rounded-lg bg-maastricht-blue z-10 flex flex-col justify-between items-center shadow-lg"
                            initial={{ opacity: 0, scale: 0.75 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.75 }}
                        >
                            <div className="relative w-full h-60px p-4 rounded-t-lg border-b border-ebony flex justify-center items-center">
                                {title}
                                <AiOutlineClose onClick={close} className="cursor-pointer absolute top-4 right-4" />
                            </div>

                            <div className="p-4 w-full">{children}</div>

                            <div className="w-full h-20px bg-ebony flex items-center justify-end p-4">
                                <Button onClick={handleSubmit} width={'90px'} height={'45px'}>{action}</Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>,
        document.getElementById('modalPortal')
    );
}

export default Modal;
