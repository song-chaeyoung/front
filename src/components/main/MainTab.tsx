'use client'
import React from 'react';
import {useRouter, useSearchParams} from "next/navigation";
import Tab from "@/components/common/tab/Tab";

const AUCTIONS_FILTER = [
    {
        label: '전체 경매',
        value: 'all',
    }, {
        label: '아이템',
        value: 'item',
    },
    {
        label: '계정',
        value: 'account'
    }
];

const MainTab = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const status = searchParams.get('type') ?? 'all';

    const updateQueryString = (
        targetStatus: string = status) => {

        const params = new URLSearchParams(searchParams.toString());
        params.set('type', targetStatus);

        router.push(`?${params}`);
    }

    return (
        <div>
            <Tab tabs={AUCTIONS_FILTER} activeTab={status} onTabChange={(value) => updateQueryString(value)}/>
        </div>
    );
};

export default MainTab;