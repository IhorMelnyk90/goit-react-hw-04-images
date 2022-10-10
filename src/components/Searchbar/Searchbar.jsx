import {useState} from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
    SearchbarHeader,
    SearchForm,
    SearchFormButton,
    SearchFormButtonLabel,
    SearchFormInput,
} from './Searchbar.styled';
import { ImSearch } from 'react-icons/im';
// import { createGlobalStyle } from 'styled-components';



export default function Searchbar({onSubmit}) {
    const [name, setName] = useState('');

    const onChangeBar = (e) => {
        const {value} = e.currentTarget;
        setName(value.toLowerCase().trim());
    }

    const onSubmitBar = (e) => {
        e.preventDefault();
        if(name.trim() === ''){
            return toast.error('Please enter more infomation');
        }
        onSubmit(name);
        setName('');
    }




    return (
        <SearchbarHeader>
            <SearchForm onSubmit={onSubmitBar}>
                <SearchFormButton type="submit">
                    <ImSearch />
                    <SearchFormButtonLabel>Search</SearchFormButtonLabel>
                </SearchFormButton>

                <SearchFormInput
                    onChange={onChangeBar}
                    value={name}
                    type="text"
                    autocomplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </SearchForm>
        </SearchbarHeader>
    );
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

// class Searchbar extends Component {
//     state = {
//         name: '',
//     };

//     onChange = event => {
//         this.setState({
//           name: event.currentTarget.value.toLowerCase().trim(),
//         });
//       };

//     onSubmit = event => {
//         event.preventDefault();
//         const { onSubmit } = this.props;
//         const { name } = this.state;
//         if (name.trim() === '') {
//             return toast.error('Please enter more infomation');
//         }
//         onSubmit(name);
//         this.setState({
//             name: '',
//         });
//     };

//     render() {
//         const { onChange, onSubmit } = this;
//         const { name } = this.state;
//         return (
// <SearchbarHeader>
//     <SearchForm onSubmit={onSubmit}>
//         <SearchFormButton type="submit">
//             <ImSearch />
//             <SearchFormButtonLabel>Search</SearchFormButtonLabel>
//         </SearchFormButton>

//         <SearchFormInput
//             onChange={onChange}
//             value={name}
//             type="text"
//             autocomplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//         />
//     </SearchForm>
// </SearchbarHeader>
//         );
//     }
// }

// Searchbar.propTypes = {
//     onSubmit: PropTypes.func.isRequired,
// };

// export default Searchbar;
