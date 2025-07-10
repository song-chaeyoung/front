'use client'
import React from "react";
import {AuctionIdGame} from "@/_types/auctions/AuctionIdGame";
import AuctionSummaryItem from "@/components/auctions/AuctionSummaryItem";
import Pagination from "@/components/common/Pagination";


const test: AuctionIdGame = {
    nickname: 'nickname',
    title: 'title',
    currentPrice: 1000000,
    endTime: '2025-01-01',
    gameName: '메이플스토리',
    gameServers: ['스카니아']
}

const RecentAuction = () => {

    return (
        <div className={'flex flex-col gap-1.25'}>
            <div className={'flex flex-col gap-[12px]'}>
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