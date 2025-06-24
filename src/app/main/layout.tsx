import SearchBox from "@/components/main/SearchBox";
import {ReactNode} from "react";


const MainLayout = ({children}: {children: ReactNode}) => {
    return (
        <div className={'h-full w-screen'}>
            <div className="flex flex-col flex-center  w-full max-w-[1200px] m-auto ">
                <SearchBox/>
            </div>
            {children}
        </div>
    );
};

export default MainLayout;