"use client";

import React, { ReactNode, useEffect } from "react";
import useAuthStore from "@/stores/authStore";
import { usePathname } from "next/navigation";
import { getAuthMy } from "@/services/auth/getAuthMy";

const AuthProvider = ({
  initialAuth,
  children,
}: {
  initialAuth: boolean;
  children: ReactNode;
}) => {
  const { setIsAuthenticated } = useAuthStore();
  const pathname = usePathname();

  useEffect(() => {
    setIsAuthenticated(initialAuth);
    /* eslint-disable */
  }, [initialAuth]);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const result = await getAuthMy();

        if (result.error || result.status === 401) {
          setIsAuthenticated(false);
        } else if (result.result) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, [pathname, setIsAuthenticated]);

  return <>{children}</>;
};

export default AuthProvider;
