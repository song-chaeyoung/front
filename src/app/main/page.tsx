import React, {Suspense} from "react";
import HighestBidder from "@/components/main/HighestBidder";
import RecentAuction from "@/components/main/RecentAuction";
import MainTab from "@/components/main/MainTab";


const MainPage = () => {
    return (
        <div className={''}>
            <HighestBidder/>
            <div className={'flex flex-col gap-1.25'}>
                <div className={'text-fgGrayDefault text-2 font-semibold'}>최근 등록된 경매글</div>
                <Suspense>
                    <MainTab/>
                </Suspense>
                <RecentAuction/>
            </div>
        </div>
    );
};

export default MainPage;