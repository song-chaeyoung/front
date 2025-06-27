"use client";

import React from "react";

import AuctionSummaryItem from "@/components/auctions/AuctionSummaryItem";
import AuctionContent from "@/components/auctions/detail/AuctionContent";
import { useGetAuctionsId } from "@/hooks/fetcher/auctions/useGetAuctionsId";
import { usePathname, useRouter } from "next/navigation";
import { useGetAuctionIdGames } from "@/hooks/fetcher/auctions/useGetAuctionIdGames";
import { AuctionIdGame } from "@/_types/auctions/AuctionIdGame";
import Button from "@/components/common/Button";

const Page = () => {
  const pathname = usePathname();
  const nowID = pathname.split("/")[3];
  const { data } = useGetAuctionsId(nowID);
  const { data: games } = useGetAuctionIdGames(nowID);
  const router = useRouter();

  if (!data?.result || !games?.result) return null;

  return (
    <div className="py-l-4 max-w-[1080px] w-full tablet:w-full flex flex-col gap-l-7.5 mx-auto laptop:px-[20px]">
      <AuctionContent data={data?.result} auctionId={nowID} />

      <div className="flex flex-col gap-l-1.5">
        <p className="text-fgGrayDefault font-semibold text-1.5 leading-[1.4] tracking-[-0.48px]">
          현재 경매중인{" "}
          <span className="text-fgPrimaryAccent">{data.result.gameName}</span>{" "}
          아이템
        </p>
        {games.result.length > 0 ? (
          <div className="grid grid-cols-3 gap-1.5">
            <>
              {games.result.map((item: AuctionIdGame, idx: number) => (
                <AuctionSummaryItem key={idx} game={item} />
              ))}
            </>
          </div>
        ) : (
          <div className="flex-center flex-col gap-1 w-full h-[337px] rounded-md bg-bgGrayDepth2 flex-center overflow-hidden">
            <p className="text-fgGrayDefault text-1.125 leading-[1.4] tracking-[-0.28px]">
              경매중인 아이템이 없습니다.
            </p>
            <Button
              title="경매 생성하러 가기"
              onClick={() => router.push("/write")}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
