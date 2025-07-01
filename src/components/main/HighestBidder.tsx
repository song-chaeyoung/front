'use client'
import {AuctionIdGame} from "@/_types/auctions/AuctionIdGame";
import AuctionSummaryItem from "@/components/auctions/AuctionSummaryItem";
import React, {useState} from "react";
import CustomIcon from "@/Icons";

const test: AuctionIdGame = {
    nickname: 'nickname',
    title: 'title',
    currentPrice: 1000000,
    endTime: '2025-01-01',
    gameName: '메이플스토리',
    gameServers: ['스카니아']
}
const BUTTON_STYLE = `w-8 h-8 bg-fillGrayDefault rounded-max inline-flex flex-col justify-center items-center`;

const HighestBidder = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const movePage = (dir: 1 | -1) => {
        const targetPage = currentPage + dir;
        if(targetPage > 4 || targetPage <= 0) {return}
        setCurrentPage(targetPage);
    }

    return (
        <div className={'flex flex-col gap-[12px]'}>
            <div className={'text-fgGrayDefault text-2 font-semibold'}>🔥 최고낙찰가 TOP 10</div>
            <div className={'w-full grid grid-cols-4 gap-[20px] self-stretch'}>
                <AuctionSummaryItem game={test}/>
                <AuctionSummaryItem game={test}/>
                <AuctionSummaryItem game={test}/>
                <AuctionSummaryItem game={test}/>
            </div>
            <div className={'flex justify-end items-center gap-[12px]'}>
                <div className={'flex tracking-[-0.32px] text-fgGrayPlaceholder text-1 font-semibold'}>
                    <div className={'text-fgGrayDefault'}>{currentPage}</div>
                    {'/'}4
                </div>
                <button className={BUTTON_STYLE} onClick={() => movePage(-1)}>
                    <CustomIcon className={'w-[24px] h-[24px]'} icon={'LEFT_ARROW'} />
                </button>
                <button className={`${BUTTON_STYLE}`} onClick={() => movePage(1)}>
                    <CustomIcon className={'w-[24px] h-[24px]'} icon={'RIGHT_ARROW'} />
                </button>
            </div>
        </div>
    );
};

export default HighestBidder;