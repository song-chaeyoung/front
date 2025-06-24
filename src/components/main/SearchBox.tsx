'use client'

import CustomIcon from "@/Icons";
import Button from '../common/Button';
import {useRouter, useSearchParams} from "next/navigation";
import {FormEvent, useEffect, useState} from "react";
import SearchChip from "@/components/main/SearchChip";

const SearchBox = () => {
    const [inputValue, setInputValue] = useState("");
    const searchParams = useSearchParams();
    const [searchKeywords, setSearchKeywords] = useState<string[]>([]);
    const [isFocused, setFocused] = useState(false);
    const router = useRouter();


    const onSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmed = inputValue.trim();
        if (!trimmed || searchKeywords.includes(trimmed)) {
            setInputValue('');
            return
        };

        router.push(`/main/search?q=${encodeURIComponent([...searchKeywords, inputValue].join(','))}`);
        setInputValue('')
    }

    useEffect(() => {
        setSearchKeywords((searchParams.get('q') ?? '')?.split(',').filter(it => it))
    }, [searchParams]);

    const onRemove = (keyword: string) => {
        const q = searchKeywords.filter(it => it !== keyword);
        router.push(`/main/search?q=${encodeURIComponent(q.join(','))}`);
    }


    return (
        <div
            className={'flex flex-col w-full max-w-[640px] pt-[64px] pb-[128px] m-auto self-stretch items-start gap-l-1.25'}>
            <h3 className={'text-fgGrayDefault text-2 font-semibold'}>
                경매 검색
            </h3>
            <form onSubmit={onSearch} className={'flex items-start gap-[10px] self-stretch h-l-4'}>
                <div
                    className={`w-full transition-all overflow-x-hidden h-[64px] px-[12px] pr-[40px] text-1.125 text-fgGrayDefault placeholder-fgGrayPlaceholder duration-100 flex items-center gap-0.5 bg-fillGrayDefault rounded-md shadow-button-primary-shadow ${isFocused && 'border border-fgPrimaryAccent'}`}>
                    <CustomIcon className={'w-[18px] h-[18px]'} stroke={'#EFEFF0'} icon={'SEARCH'}/>
                    <div className={'w-full flex overflow-x-scroll gap-0.25'}>
                        {searchKeywords.map(keyword =>
                            <div key={keyword} className={''}>
                                <SearchChip label={keyword} onRemove={() => onRemove(keyword)}/>
                            </div>)}
                        <input className={'min-w-[100px] flex-1 bg-transparent flex items-center'}
                               value={inputValue}
                               onFocus={() => setFocused(true)}
                               onBlur={() => setFocused(false)}
                               onChange={(e) => setInputValue(e.target.value)}
                               placeholder={searchKeywords.length > 0 ? '' : '게임 이름을 입력하세요.'}
                               type="text"/>
                    </div>
                </div>
                <Button className={'h-full p-1.25 gap-0.25 flex justify-center shadow-button-primary-shadow'}
                        type="submit"
                        title={'검색하기'}/>
            </form>
        </div>
    );
};

export default SearchBox;