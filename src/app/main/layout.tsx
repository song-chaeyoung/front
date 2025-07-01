import SearchBox from "@/components/main/SearchBox";
import {ReactNode} from "react";


const MainLayout = ({children}: {children: ReactNode}) => {
    return (
        <div className={'h-full max-w-[1280px] m-auto px-[80px] gap-l-1.25 pb-[80px]'}>
            <div className="flex flex-col flex-center  w-full max-w-[1200px] m-auto ">
                <SearchBox/>
            </div>
            {children}
        </div>
    );
};

export default MainLayout;