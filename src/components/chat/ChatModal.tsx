"use client";

import { useState, useEffect, useRef } from "react";
import Button from "@/components/common/Button";
import CommonInput from "@/components/common/input/CommonInput";
import ProfileImage from "@/components/common/ProfileImage";
import { ModalPortal } from "@/components/common/Portal";
import CustomIcon from "@/Icons/Icon";

interface ChatMessage {
  id: number;
  sender: "me" | "opponent";
  content: string;
  timestamp: string;
}

interface ChatListItem {
  chatId: number;
  auctionId: number;
  bidId: number;
  opponentNickname: string;
  gameTitle: string;
  auctionTitle: string;
  lastMessage: string;
  lastMessageTime: string;
  isNewMessage: boolean;
}

interface ChatDetail {
  chatId: number;
  auctionId: number;
  bidId: number;
  auctionTitle: string;
  opponentNickname: string;
  isSeller: boolean;
  canRequestPayment: boolean;
  messages: ChatMessage[];
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  chatList?: ChatListItem[];
  chatDetail?: ChatDetail;
}

export function ChatModal({
  isOpen,
  onClose,
  chatList = [
    {
      chatId: 1,
      auctionId: 500,
      bidId: 1001,
      opponentNickname: "thehd1",
      gameTitle: "메이플스토리",
      auctionTitle: "뇌전수리검 팔아요",
      lastMessage: "넵, 확인되면 바로 전달 드릴게요 :)",
      lastMessageTime: "2025.06.25 16:37",
      isNewMessage: true,
    },
    {
      chatId: 2,
      auctionId: 501,
      bidId: 1002,
      opponentNickname: "swordboy77",
      gameTitle: "서버나이츠",
      auctionTitle: "바론섭 3성 검 팝니다",
      lastMessage: "거래 언제 가능하신가요?",
      lastMessageTime: "2025.06.24 21:12",
      isNewMessage: false,
    },
  ],
  chatDetail = {
    chatId: 1,
    auctionId: 500,
    bidId: 1001,
    auctionTitle:
      "메이플스토리 뇌전수리검 팔아요 메이플스토리 바론 메이플스토리 뇌전수리검 팔아요 메이플스토리 바론",
    opponentNickname: "thehd1",
    isSeller: false,
    canRequestPayment: true,
    messages: [
      {
        id: 1,
        sender: "me",
        content:
          "안녕하세요! 방금 보고 관심 생겨서 연락드립니다 :) 아이템 전달 가능한 시간 대략적으로 알려주셔도 돼요.",
        timestamp: "2025.06.25 16:32",
      },
      {
        id: 2,
        sender: "opponent",
        content:
          "안녕하세요~ 네, 지금 바로 전달 가능합니다! 게임 접속은 문제없어요. 캐릭명 말씀해주시면 이동할게요!",
        timestamp: "2025.06.25 16:35",
      },
      {
        id: 3,
        sender: "me",
        content:
          "혹시 결제까지 미룰 수 없고 지금 진행 필요할까요? 12성/강화 여부 보니 +6정도라 살짝 고민되네요.",
        timestamp: "2025.06.25 16:36",
      },
      {
        id: 4,
        sender: "opponent",
        content: "넵, 확인되면 바로 전달 드릴게요 :)",
        timestamp: "2025.06.25 16:37",
      },
      {
        id: 5,
        sender: "me",
        content:
          "혹시 결제까지 미룰 수 없고 지금 진행 필요할까요? 12성/강화 여부 보니 +6정도라 살짝 고민되네요.",
        timestamp: "2025.06.25 16:36",
      },
      {
        id: 6,
        sender: "opponent",
        content: "넵, 확인되면 바로 전달 드릴게요 :)",
        timestamp: "2025.06.25 16:37",
      },
    ],
  },
}: ChatModalProps) {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const [selectedChatId, setSelectedChatId] = useState(1);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // const {} = u

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView();
    }, 10);
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatDetail.messages]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [selectedChatId]);

  if (!isOpen) return null;

  return (
    <ModalPortal title="chat-modal">
      <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center ">
        <div className="bg-bgGrayDepth3 rounded-xl w-[80vw] h-[80vh] flex overflow-hidden shadow-[inset_0px_4px_60px_0px_rgba(148,156,247,0.25)] relative ">
          <div className="w-[260px] bg-bgGrayDepth2  flex flex-col">
            <div className="px-1 py-1.5">
              <div className="flex items-center justify-between mb-1.5">
                <h2 className="text-fgGrayDefault text-1.125 font-semibold tracking-[-0.36px]">
                  채팅 목록
                </h2>
                <div className="flex bg-fillGrayDefault rounded-max h-[40px] relative ">
                  <div
                    className={`absolute top-0 bottom-0 bg-fillPrimaryDefault rounded-max transition-all duration-300 ease-in-out w-[calc(50%-2px)] ${
                      activeTab === "buy" ? "left-0" : "left-[calc(50%+2px)]"
                    }`}
                  />

                  <button
                    onClick={() => setActiveTab("buy")}
                    className={`relative z-10 px-1.5 py-0.625 text-0.875 font-semibold transition-colors tracking-[-0.28px] flex-1 ${
                      activeTab === "buy"
                        ? "text-fgPrimaryDefault"
                        : "text-fgGrayDisabled hover:text-fgGrayDefault"
                    }`}
                  >
                    구매
                  </button>
                  <button
                    onClick={() => setActiveTab("sell")}
                    className={`relative z-10 px-[24px] py-0.625 text-0.875 font-semibold transition-colors tracking-[-0.28px] flex-1 ${
                      activeTab === "sell"
                        ? "text-fgPrimaryDefault"
                        : "text-fgGrayDisabled hover:text-fgGrayDefault"
                    }`}
                  >
                    판매
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-0.75">
              {chatList.map((chat, index) => (
                <div key={chat.chatId}>
                  <div
                    className={`p-0.75 rounded-lg cursor-pointer transition-colors ${
                      selectedChatId === chat.chatId
                        ? "bg-bgGrayDepth3"
                        : "hover:bg-fillGrayDefault"
                    }`}
                    onClick={() => setSelectedChatId(chat.chatId)}
                  >
                    <div className="flex items-start gap-0.5">
                      <ProfileImage
                        nickname={chat.opponentNickname.charAt(0)}
                        size="sm"
                      />
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`text-0.875 font-semibold truncate tracking-[-0.28px] leading-[1.4] ${
                            selectedChatId === chat.chatId
                              ? "text-fgGrayDefault"
                              : "text-fgGrayDisabled"
                          }`}
                        >
                          {chat.auctionTitle}
                        </h3>
                        <span className="text-0.75 tracking-[-0.24px] leading-[1.4] text-colorTypeItem">
                          {chat.gameTitle}
                        </span>
                      </div>
                      {chat.isNewMessage && (
                        <div className="bg-fillPrimaryDefault rounded-xl px-0.5 py-0.25 min-w-[24px] h-[21px] flex items-center justify-center">
                          <span className="text-0.75 font-medium text-fgPrimaryDefault tracking-[-0.24px]">
                            N
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  {index < chatList.length - 1 && (
                    <hr className="border-borderDivider my-0.25" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <div className="h-[109px] px-1 py-1.5 border-b border-borderDivider flex items-center">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-0.75">
                  <ProfileImage
                    nickname={chatDetail.opponentNickname.charAt(0)}
                    size="sm"
                  />
                  <div>
                    <h1 className="text-fgGrayDefault text-1.5 font-semibold truncate max-w-[300px] tracking-[-0.48px] leading-[1.4]">
                      {chatDetail.auctionTitle}
                    </h1>
                    <div className="flex items-center gap-0.5 text-1.125 tracking-[-0.36px] leading-[1.4]">
                      <span className="text-colorTypeItem">아이템 구매</span>
                      <span className="text-fgGrayDefault">
                        @{chatDetail.opponentNickname}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-0.75">
                  <Button
                    variant="secondary"
                    title="경매글 확인하기"
                    icon="left"
                    customIcon={
                      <CustomIcon
                        icon="LINK_EXTERNAL"
                        className="w-[24px] h-[24px]"
                      />
                    }
                  />
                  <Button
                    variant="secondary"
                    title="닫기"
                    onClick={onClose}
                    icon="left"
                    customIcon={
                      <CustomIcon
                        icon="X_CIRCLE"
                        className="w-[24px] h-[24px]"
                      />
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 px-1 py-1 overflow-y-auto scrollbar-dropdown">
              <div className="flex flex-col gap-[10px]">
                {chatDetail.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex  ${
                      msg.sender === "me" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex items-end gap-[10px] max-w-[70%] ${
                        msg.sender === "me" ? "flex-row-reverse" : "flex-row"
                      } `}
                    >
                      <ProfileImage
                        nickname={
                          msg.sender === "me"
                            ? ""
                            : chatDetail.opponentNickname.charAt(0)
                        }
                        size="sm"
                      />

                      <div
                        className={`px-1 py-1 rounded-lg max-w-[360px] ${
                          msg.sender === "me"
                            ? "bg-fillPrimaryFocused text-fgPrimaryDefault"
                            : "bg-fillGrayFocused text-fgPrimaryDefault"
                        }`}
                      >
                        <p className="text-0.875 font-semibold leading-relaxed tracking-[-0.28px]">
                          {msg.content}
                        </p>
                      </div>

                      <span className="text-0.75 text-fgGrayDefault tracking-[-0.24px] text-nowrap">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Message Input */}
            <div className="h-24 px-1 py-1.5 border-t border-borderDivider flex items-center">
              <div className="flex items-center gap-0.5 w-full">
                <div className="flex-1">
                  <CommonInput
                    value={message}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setMessage(e.target.value)
                    }
                    placeholder="메시지 보내기"
                  />
                </div>
                <Button
                  variant="secondary"
                  title="결제하기"
                  icon="left"
                  customIcon={
                    <CustomIcon icon="SERVER" className="w-[24px] h-[24px]" />
                  }
                />
                <Button
                  variant="primary"
                  title="전송하기"
                  icon="left"
                  customIcon={
                    <CustomIcon
                      icon="SEND"
                      className="w-[24px] h-[24px]"
                      stroke={message !== "" ? "#EFEFF0" : "#94949C"}
                    />
                  }
                  disabled={message === ""}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
