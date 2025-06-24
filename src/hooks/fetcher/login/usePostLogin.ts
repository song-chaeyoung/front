import { showToast } from "@/components/common/Toast";
import { postLogin, PostLoginData } from "@/services/login/postLogin";
import useAuthStore from "@/stores/authStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const usePostLogin = () => {
  const router = useRouter();
  const { setIsAuthenticated } = useAuthStore();

  return useMutation({
    mutationFn: (formData: PostLoginData) => postLogin(formData),
    onSuccess: () => {
      setIsAuthenticated(true);
      router.push("/");
      showToast(
        "success",
        "로그인 성공",
        "환영합니다! 정상적으로 로그인되었어요."
      );
    },
    onError: () => {
      showToast(
        "warning",
        "로그인 정보를 확인해주세요.",
        "이메일 또는 비밀번호가 올바르지 않습니다."
      );
    },
  });
};
