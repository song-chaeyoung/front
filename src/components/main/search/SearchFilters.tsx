'use client'

import Dropdown, {DropdownType} from "@/components/common/Dropdown";
import {useRouter, useSearchParams} from "next/navigation";

const FILTER: DropdownType[] = []
const PRICE_FILTER: DropdownType[] = []
const SORT_FILTER: DropdownType[] = [
    {
        label: '최신순',
        value: 'date_asc'
    },
    {
        label: '조회수순',
        value: 'view_desc'
    },
    {
        label: '마감 임박순',
        value: 'deadline_asc'
    },
    {
        label: '가격 낮은순',
        value: 'price_asc'
    },
    {
        label: '가격 높은순',
        value: 'price_desc'
    },
]

const SearchFilters = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const filter = searchParams.get('filter') ?? null;
    const price = searchParams.get('price') ?? null;
    const sort = searchParams.get('sort') ?? null;

    const updateQueryString = (key: string, value?: string | null) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key)
        }
        router.push(`?${params}`);
    }

    return (
        <div className={'h-[48px] relative'}>
            <div
                className={'grid grid-cols-[repeat(auto-fill,_minmax(175px,_1fr))] gap-[12px] absolute w-full h-auto items-start'}>
                <Dropdown listData={FILTER} placeholder={'필터'}
                          select={FILTER.find(item => item.value === filter) ?? null}
                          setSelect={(data) => updateQueryString('filter', data?.value ?? null)}/>
                <Dropdown listData={PRICE_FILTER} placeholder={'가격대'}
                          select={PRICE_FILTER.find(item => item.value === price) ?? null}
                          setSelect={(data) => updateQueryString('price', data?.value ?? null)}/>
                <Dropdown listData={SORT_FILTER} placeholder={'정렬'}
                          select={SORT_FILTER.find(item => item.value === sort) ?? null}
                          setSelect={(data) => updateQueryString('sort', data?.value ?? null)}/>
            </div>
        </div>
    );
};

export default SearchFilters;