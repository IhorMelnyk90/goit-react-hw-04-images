import { useState, useEffect} from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { animateScroll as scroll } from 'react-scroll';

import Loader from 'components/Loader';
import Api from 'components/fetchImages';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';
import Button from 'components/Button';

import { AppDiv, ModalImg } from './App.styled';

export default function App() {
    const [name, setName] = useState('');
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [status, setStatus] = useState('idle');
    const [largeImage, setLargeImage] = useState('');
    const [total, setTotal] = useState(0);
  

    useEffect(() => {
        const fetchImages = async (name, page) => {
            setStatus('pending');
            try {
                const gallery = await Api(name, page);
                const results = gallery.hits;
                const totalResults = gallery.totalHits;
                if (results.length === 0) {
                    setStatus('idle');
                    return toast.error(`${name} not found`);
                }
                if (page === 1) {
                    setImages([...results]);
                    setTotal(totalResults);
                    setStatus('resolved');
                } else {
                    setImages(prev => [...prev, ...results]);
                    setStatus('resolved');
                }
            } catch (error) {
                setError(error);
                setStatus('rejected');
            } 
        };
        if (!name) {
            setImages([]);            
            return;
        }
        fetchImages(name, page);                        
        }, [name, page]);
  
  

    const onSubmit = name => {
        setName(name);
        setImages([]);
        setPage(1);
        setTotal(0);
    };

    const onClickButton = () => {
        setPage(prevPage => prevPage + 1);
    };

//     const scrollToBottom = () => {
//         scroll.scrollToBottom();
//     };

    const closeModal = () => {
        setShowModal(false);
    };

    const onClickImage = event => {
        setShowModal(true);
        setLargeImage(event);
    };    

    return (
        <AppDiv>
            <Searchbar onSubmit={onSubmit} />
            {status === 'resolved' && (
                <ImageGallery images={images} onClick={onClickImage} />
            )}
            {status === 'pending' && <Loader />}
            {showModal && (
                <Modal onClose={closeModal}>
                    <ModalImg src={largeImage} alt={''} />
                </Modal>
            )}
            {images.length > 0 && images.length < total && (
                <Button onClick={onClickButton} />
            )}
            <ToastContainer autoClose={3000} />

            {error && (
                <p>Щось пішло не так :( спробуйте будь ласка пізніше...</p>
            )}
        </AppDiv>
    );
}

// export default class App extends Component {
// state = {
//     name: '',
//     images: [],
//     error: null,
//     page: 1,
//     showModal: false,
//     status: 'idle',
//     total: 0,
//     largeImage: '',
// };

// componentDidUpdate = (_, prevState) => {
//     const { name, page } = this.state;

//     if (prevState.name !== name) {
//         this.setState({
//             images: [],
//             status: 'pending',
//             page: 1,
//         });
//         this.fetchImages();
//     }
//     if (page !== prevState.page && page !== 1) {
//         this.setState({
//             status: 'pending',
//         });
//         this.fetchImages();
//     }
// };

// onSubmit = name => {
//     this.setState({
//         name,
//         images: [],
//         page: 1,
//     });
// };

// async fetchImages() {
//     const { name, page } = this.state;
//     try {
//         const gallery = await Api(name, page);

//         if (gallery.hits.length === 0) {
//             this.setState({
//                 status: 'idle',
//             });
//             return toast.error(`${name} not found`);
//         }
//         this.setState(prevState => ({
//             images: [...prevState.images, ...gallery.hits],
//             status: 'resolved',
//             total: gallery.totalHits,
//         }));
//     } catch (error) {
//         this.setState({
//             error: error,
//             status: 'rejected',
//         });
//     }
// }

// onClickButton = () => {
//     this.setState(({ page }) => {
//         return {
//             page: page + 1,
//         };
//     });
// };

// toggleModal = () => {
//     this.setState(({ showModal }) => ({
//         showModal: !showModal,
//     }));
// };

// onClickImage = event => {
//     this.toggleModal();
//     this.setState({ largeImage: event });
// };

// render() {
//     const { onSubmit, onClickImage, onClickButton } = this;
//     const { error, images, status, total, largeImage, showModal } =
//         this.state;
//     return (
//         <AppDiv>
//             <Searchbar onSubmit={onSubmit} />
//             {status === 'resolved' && (
//                 <ImageGallery images={images} onClick={onClickImage} />
//             )}
//             {status === 'pending' && <Loader/>}
//             {showModal && (
//                 <Modal onClose={this.toggleModal}>
//                     <ModalImg src={largeImage} alt={''} />
//                 </Modal>
//             )}
//             {images.length > 0 && images.length < total && (
//                 <Button onClick={onClickButton} />
//             )}
//             <ToastContainer autoClose={3000} />

//             {error && (
//                 <p>Щось пішло не так :( спробуйте будь ласка пізніше...</p>
//             )}
//         </AppDiv>
//     );
// }
// }
