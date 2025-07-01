'use client'
import React from "react";
import Tab from "@/components/common/tab/Tab";
import {useRouter, useSearchParams} from "next/navigation";
import {AuctionIdGame} from "@/_types/auctions/AuctionIdGame";
import AuctionSummaryItem from "@/components/auctions/AuctionSummaryItem";
import Pagination from "@/components/common/Pagination";

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

const test: AuctionIdGame = {
    nickname: 'nickname',
    title: 'title',
    currentPrice: 1000000,
    endTime: '2025-01-01',
    gameName: '메이플스토리',
    gameServers: ['스카니아']
}

const RecentAuction = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const status = searchParams.get('filter') ?? 'all';

    const updateQueryString = (
        targetStatus: string = status) => {

        const params = new URLSearchParams(searchParams.toString());
        params.set('filter', targetStatus);

        router.push(`?${params}`);
    }
    return (
       <div className={'flex flex-col gap-1.25'}>
           <div className={'flex flex-col gap-[12px]'}>
               <div className={'text-fgGrayDefault text-2 font-semibold'}>최근 등록된 경매글</div>
               <Tab tabs={AUCTIONS_FILTER} activeTab={status} onTabChange={(value) => updateQueryString(value)}/>
               <div className={'w-full grid grid-cols-4 gap-[20px] self-stretch'}>
                   <AuctionSummaryItem game={test}/>
                   <AuctionSummaryItem game={test}/>
                   <AuctionSummaryItem game={test}/>
                   <AuctionSummaryItem game={test}/>
               </div>

           </div>
           <div className={'flex justify-center'}>
               <Pagination lastPage={1}/>
           </div>
       </div>
    );
};

export default RecentAuction;