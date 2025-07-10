import React, {Suspense} from "react";
import MainTab from "@/components/main/MainTab";
import RecentAuction from "@/components/main/RecentAuction";
import SearchFilters from "@/components/main/search/SearchFilters";

const SearchPage = () => {
    return (
        <div>
            <div className={'flex flex-col gap-1.25'}>
                <div className={'text-fgGrayDefault text-2 font-semibold'}>경매검색결과</div>
                <Suspense>
                    <MainTab/>
                    <SearchFilters/>
                </Suspense>
                <RecentAuction/>
            </div>
        </div>
    );
};

export default SearchPage;