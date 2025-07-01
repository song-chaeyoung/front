"use server";

import { cookies } from "next/headers";
import { AuthMy } from "@/services/auth/getAuthMy";

const apiUrl = process.env.NEXT_API_URL;

export interface AuthMyRequest {
  nickname: string;
  name: string;
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
  phoneNumber: string;
  birthDate: string;
  favoriteGame: string;
}

export const postAuthMy = async (form: AuthMyRequest) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${apiUrl}/api/v1/auth/my`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(form),
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("MyPage UserInfo Api 응답 에러");
    }

    const result: AuthMy = await res.json();
    return { result };
  } catch (err) {
    console.error(err);
  }
};
