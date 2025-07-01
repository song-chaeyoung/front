'use client'

import useDeviceSize from "@/hooks/responsive/useDeviceSize";
import CustomIcon from "@/Icons";
import {useRouter, useSearchParams} from "next/navigation";

interface PaginationProps {
    lastPage: number;
}


const Pagination = ({lastPage}: PaginationProps) => {
    const BUTTON_STYLE = `w-8 h-8 bg-fillGrayDefault rounded-max inline-flex flex-col justify-center items-center`;
    const {isMobile} = useDeviceSize();
    const maxPage = isMobile ? 5 : 10;
    const buttonCount = Math.min(lastPage, maxPage);
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("pageNo")) ?? 0;

    const goToPage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('rowCount', buttonCount.toString());
        params.set('pageNo', page.toString());

        router.push(`?${params}`);
    }

    const goToNextPage = () => {
        if (currentPage >= lastPage -1) {
            return;
        }
        goToPage(currentPage + 1);
    }

    const goToPreviousPage = () => {
        if (currentPage <= 0) {
            return;
        }
        goToPage(currentPage - 1);
    }

    const goToLastPage = () => {
        if (currentPage >= lastPage -1) {
            return;
        }
        goToPage(lastPage -1);
    }

    const goToFirstPage = () => {
        if (currentPage  <= 0) {
            return;
        }

        goToPage(0);
    }

    return (
        <div className={'flex items-center gap-[5px] '}>
            <button className={BUTTON_STYLE} onClick={goToFirstPage}>
                <CustomIcon className={'w-[24px] h-[24px]'} icon={'DOUBLE_LEFT_ARROW'} />
            </button>
            <button className={`${BUTTON_STYLE}`} onClick={goToPreviousPage}>
                <CustomIcon className={'w-[24px] h-[24px]'} icon={'LEFT_ARROW'} />
            </button>
            {Array.from({length: buttonCount}).map((_: unknown, i: number) => {
                let pageNo = i;
                const middle = buttonCount / 2 - 1;
                if (currentPage + buttonCount - 1 >= lastPage) {
                    pageNo = (lastPage - buttonCount) + i
                } else if (currentPage >= buttonCount - 1) {
                    if (i <= middle) {
                        pageNo = currentPage - (buttonCount / 2 - i);
                    } else {
                        pageNo = currentPage + (i - buttonCount / 2);
                    }

                }

                pageNo = Math.round(pageNo)

                return <button className={`${BUTTON_STYLE} ${currentPage === pageNo && 'bg-fillPrimaryDefault'}`}
                               key={`button_${i}_${pageNo}`} onClick={() => {
                    goToPage(pageNo)
                }}>
                    <div className={'justify-start text-fgGrayDefault text-sm font-semibold leading-tigh'}>
                        {pageNo + 1}
                    </div>
                </button>
            })}
            <button className={BUTTON_STYLE} onClick={goToNextPage}>
                <CustomIcon className={'w-[24px] h-[24px]'} icon={'RIGHT_ARROW'} />
            </button>
            <button className={BUTTON_STYLE} onClick={goToLastPage}>
                <CustomIcon className={'w-[24px] h-[24px]'} icon={'DOUBLE_RIGHT_ARROW'} />
            </button>
        </div>
    );
};

export default Pagination;