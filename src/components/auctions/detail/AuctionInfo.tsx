import { AuctionItem } from "@/_types/auctions/AuctionItem";
import React from "react";
import { TimerStatus } from "./AuctionContent";
import CustomIcon from "@/Icons/Icon";
import Timer from "@/components/common/Timer";
import dayjs from "dayjs";
import BidUserInfo from "./BidUserInfo";
import { AuctionUpdate } from "@/hooks/fetcher/auctions/useGetSubscribeAuctionId";
import BidControl from "./BidControl";
import useDeviceSize from "@/hooks/responsive/useDeviceSize";

interface AuctionInfoProps {
  data: AuctionItem;
  status: TimerStatus;
  start: dayjs.Dayjs;
  end: dayjs.Dayjs;
  auctionId: string;
  auction: AuctionUpdate | null;
}

const AuctionInfo = ({
  data,
  status,
  start,
  end,
  auctionId,
  auction,
}: AuctionInfoProps) => {
  const { isTablet } = useDeviceSize();

  const currentPrice = auction?.currentPrice || data.currentPrice;

  console.log(data);

  return (
    <>
      <p className="text-fgGrayDefault text-1.5 font-semibold leading-[1.4] tracking-[-0.48px]">
        {data?.title}
      </p>
      <div className="flex flex-col gap-0.25">
        <Timer startTime={start} endTime={end} status={status} />
        {!isTablet && (
          <p className="text-2.5 font-bold tracking-[-0.8px]">
            {currentPrice.toLocaleString()}원{" "}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-l-1">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-0.25">
            <CustomIcon icon="EYE_SVG" className="w-[24px] h-[24px]" />
            <p className="text-0.875 text-fgFrayPlaceHolder leading-[1.4] tracking-[-0.28px]">
              {data?.views}
            </p>
          </div>
        </div>
        <div className="flex items-center text-0.875 leading-[1.4] tracking-[-0.28px]">
          <p className="w-[56px] text-fgGrayPressed">종류</p>
          <p className="text-fgGrayDefault">
            {data.auctionType === "ITEM" ? "게임아이템" : "게임계정"}
          </p>
        </div>
        <div className="flex items-center text-0.875 leading-[1.4] tracking-[-0.28px]">
          <p className="w-[56px] text-fgGrayPressed">게임</p>
          <p className="text-fgGrayDefault">
            {data.gameName} {data.serverName && ` > ${data.serverName}`}{" "}
            {data.serverNumName && ` > ${data.serverNumName}`}
          </p>
        </div>
        <div className="flex items-center text-0.875 leading-[1.4] tracking-[-0.28px]">
          <p className="w-[56px] text-fgGrayPressed">종류</p>
          <p className="text-fgGrayDefault">{data.auctionCode}</p>
        </div>
      </div>
      {!isTablet && (
        <>
          {status === "progress" && (
            <BidControl
              data={data}
              currentPrice={currentPrice}
              auctionId={auctionId}
            />
          )}
          <BidUserInfo seller={data.seller} />
        </>
      )}
      {isTablet && (
        <div className="fixed bottom-0 w-full z-20 left-0 bg-bgGrayDepth2 pt-[12px] pb-2 px-[40px] border-t border-borderDivider flex flex-col gap-1.5">
          <p className="text-1.75 font-bold tracking-[-0.8px]">
            {currentPrice.toLocaleString()}원{" "}
          </p>
          <BidControl
            data={data}
            currentPrice={currentPrice}
            auctionId={auctionId}
          />
        </div>
      )}
    </>
  );
};

export default AuctionInfo;
