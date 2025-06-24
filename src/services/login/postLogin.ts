"use server";

import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

const apiUrl = process.env.NEXT_API_URL;

export interface PostLoginData {
  email: string;
  password: string;
}

export const postLogin = async (formData: PostLoginData) => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(errorData || "로그인 응답 에러");
    }

    const responseCookies = new ResponseCookies(res.headers);
    const accessToken = responseCookies.get("Authorization");

    const cookieStore = await cookies();

    if (accessToken) {
      console.log("성공!");
      cookieStore.set("accessToken", accessToken.value, {
        httpOnly: accessToken.httpOnly,
        sameSite: accessToken.sameSite,
        path: accessToken.path,
        // secure: accessToken.secure,
        secure: true,
        maxAge: accessToken.maxAge,
      });
    }

    const result = await res.text();
    return { result, accessToken };
  } catch (err) {
    console.log("Error details:", err);
    throw err instanceof Error ? err : new Error("로그인 실패");
  }
};
