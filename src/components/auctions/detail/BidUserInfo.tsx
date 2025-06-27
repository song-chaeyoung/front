import CustomIcon from "@/Icons/Icon";
import { AuctionSellerType } from "@/_types/auctions/AuctionItem";
import Button from "@/components/common/Button";
import ProfileImage from "@/components/common/ProfileImage";
import React from "react";

interface BidUserInfoProps {
  seller: AuctionSellerType;
}

const BidUserInfo = ({ seller }: BidUserInfoProps) => {
  return (
    <div className="bg-bgGrayDepth3 p-l-1.25 rounded-md flex flex-col gap-l-1 text-fgGrayDefault leading-[1.4] tracking-[-0.28px] text-0.875">
      <div className="flex items-center">
        <div className="flex gap-l-1 items-center">
          <ProfileImage nickname="tnehddl" size="sm" />
          <div className="flex flex-col gap-l-0.25 ">
            <p className="font-semibold">{seller.nickname}</p>
            <p>경매진행 {seller.sellerRating}회</p>
          </div>
        </div>
      </div>
      <Button
        title="채팅하기"
        variant="secondary"
        icon="left"
        customIcon={
          <CustomIcon icon="MESSAGE-TEXT" className="w-[24px] h-[24px]" />
        }
      />
    </div>
  );
};

export default BidUserInfo;
