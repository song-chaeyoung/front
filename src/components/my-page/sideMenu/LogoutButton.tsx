'use client'

import React from 'react';
import Icon from "@/Icons/Icon";
import useAuthStore from "@/stores/authStore";

const LogoutButton = () => {
    const { logout } = useAuthStore();
    const onLogout = () => {
        logout();
    }

    return (
        <button
            className={'flex items-center gap-0.5 px-0.75 w-full h-[48px] rounded-sm hover:cursor-pointer hover:font-bold hover:bg-fillGrayHovered'}
            onClick={onLogout}>
            <Icon icon={'POWER'} className={'w-[24px] h-[24px]'}/>
            <span className={'break-keep whitespace-nowrap'}>로그아웃</span>
        </button>
    );
};

export default LogoutButton;