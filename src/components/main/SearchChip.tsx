import CustomIcon from "@/Icons";
import React from "react";

interface SearchChipProps {
    label: string;
    onRemove: () => void;
}

const SearchChip = ({label, onRemove}: SearchChipProps) => {
    return (
        <div className={'flex h-[48px] p-1.5 justify-center items-center gap-0.25 rounded-max bg-bgGrayDepth3 text-0.875 font-semibold text-fgGrayDefault'}>
            <div>{label}</div>
            <button type={'button'} onClick={() => {onRemove()}}>
                <CustomIcon
                    icon="X-CIRCLE-CONTAINED"
                    className="w-[15px] h-[15px]"
                />
            </button>
        </div>
    );
};

export default SearchChip;