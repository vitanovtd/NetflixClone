// Libs
import { useEffect, useRef, useState } from 'react';

// Utils
import { debounce } from 'lodash';

// Local imports
import IconButton from '../../shared/IconButton/IconButton';
import './searchBox.css';

let animate = false;
const SearchBox = ({ placeholder, submitSearch }) => {
    const [search, setSearch] = useState("");
    const [isInputShown, setIsInputShown] = useState(false);
    const inputRef = useRef(null);

    // Toggle Search Input visibility
    const showHideInput = (force = false) => {
        // appears if hidden
        if ((search.length !== 0 && !force) && isInputShown) {
            return;
        }
        // hides only if field empty or enter key is pressed
        setIsInputShown(!isInputShown);
    };

    // Clear input text
    const clearInput = () => {
        setSearch("");
    };

    // Keyboard accessibility for Input
    const keyDownHandler = (e) => {
        if (e.key === "Escape") {
            clearInput();
        }
        if (e.key === "Enter") {
            e.preventDefault()
            showHideInput(true);

        }
    };

    useEffect(() => {
        // call parent submit to change page after input
        const debouncedSearch = debounce((search) => submitSearch(search), 200);
        if (typeof submitSearch !== 'undefined' && search.length !== 0) {
            debouncedSearch(search)
        }
        // Cancel submit if component unmounts
        return () => {
            debouncedSearch.cancel();
        }   
    }, [search]);

    // Animate the input transition on render
    useEffect(() => {
        if (isInputShown) {
            inputRef.current.classList.add('visible');
        }
        if (!isInputShown && inputRef.current !== null) {
            inputRef.current.classList.remove('visible');
        }
    }, [isInputShown])

    return (
        <div className='SearchBox'>
            {
                !isInputShown &&
                <div className='SearchBox__btn-wrapper'>
                    <IconButton
                        icon='bi bi-search'
                        onClick={() => showHideInput()} />
                </div>
            }
            {isInputShown &&
                <form className='SearhBox__input-form'>
                    <i className="bi bi-search SearchBox__input-icon-magnifier"></i>
                    <input
                        ref={inputRef}
                        autoFocus
                        value={search}
                        onChange={(e) => { setSearch(e.currentTarget.value) }}
                        onKeyDown={keyDownHandler}
                        onBlur={() => showHideInput()}
                        className='SearchBox__input'
                        type="text"
                        placeholder={placeholder} />
                    <div
                        style={{ display: (search.length !== 0) ? 'block' : 'none' }}
                        className='SearchBox__input__btn-wrapper'>
                        <IconButton
                            onMouseDown={(e) => { e.preventDefault(); clearInput() }}
                            icon='bi bi-x'
                            size='0.8rem'
                            onClick={clearInput} />
                    </div>
                </form>
            }
        </div>
    )
}

export default SearchBox;