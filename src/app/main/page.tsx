import React from "react";
import HighestBidder from "@/components/main/HighestBidder";
import RecentAuction from "@/components/main/RecentAuction";


const MainPage = () => {
    return (
        <div className={''}>
            <HighestBidder/>
            <RecentAuction/>
        </div>
    );
};

export default MainPage;