"use client";

import React from "react";
import { ChatModal } from "./ChatModal";
import { useChatModalStore } from "@/stores/chatModalStore";

const ChatModalWrapper = () => {
  const { isOpen, close } = useChatModalStore();

  if (!isOpen) return null;

  return <ChatModal isOpen={isOpen} onClose={close} />;
};

export default ChatModalWrapper;
