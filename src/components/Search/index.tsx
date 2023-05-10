import s from './index.module.scss';
import { FiX, FiSearch, FiChevronLeft } from 'react-icons/fi';
import InputText from 'components/UI/InputText';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import useOnClickOutside from 'hooks/useOnClickOutside';
import Button from 'components/UI/Button';

interface SearchProps {
    classname?: string;
}

const Search: React.FunctionComponent<SearchProps> = ({ classname }) => {
    const [value, setValue] = useState<string>('');
    const [visible, setVisible] = useState<boolean>(false);
    const [search, setSearch] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    let page = useNavigate();

    const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const submitForm = (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
        e.preventDefault();
        setSearch(value);
    };

    const handleClearInput = () => {
        setValue('');
        setVisible(false);
    };

    const openSearch = () => {
        setVisible(true);
        inputRef.current?.focus();
    };

    useOnClickOutside(formRef, () => setVisible(false));

    useEffect(() => {
        setValue('');
    }, [page]);

    return (
        <div className={classNames(s.Search, classname)}>
            <form onSubmit={submitForm} ref={formRef} className={classNames(s.form, visible && s.visible)}>
                <InputText
                    ref={inputRef}
                    className={s.search}
                    variant='brown'
                    value={value}
                    onChange={onChangeHandle}
                    placeholder="Поиск"
                    type="search"
                />
                <Button type="button" classname={s.hideSearch} onClick={() => setVisible(false)}>
                    <FiChevronLeft />
                </Button>
                <Button type="button" classname={classNames(s.closeButton, value && s.active)} onClick={handleClearInput}>
                    <FiX />
                </Button>
                <Button type="button" classname={s.searchButton}>
                    <FiSearch />
                </Button>
            </form>
            <Button classname={s.showSearch} onClick={openSearch}>
                <FiSearch />
            </Button>
        </div>
    );
};

export default Search;
