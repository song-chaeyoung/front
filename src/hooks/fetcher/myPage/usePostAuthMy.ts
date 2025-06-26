import {useMutation} from "@tanstack/react-query";
import {AuthMyRequest, postAuthMy} from "@/services/myPage/postAuthMy";
import {showToast} from "@/components/common/Toast";
import useMyInfoStore from "@/stores/myInfoStore";

export const usePostAuthMy = () => {
    const {setMyInfo} = useMyInfoStore();
    return useMutation({
        mutationFn: (formData: AuthMyRequest) => postAuthMy(formData),
        onSuccess: (res) => {
            setMyInfo(res!.result);
            showToast(
                "success", "회원정보 수정 성공", ""
            );
        },
        onError: () =>
            showToast("warning", "회원정보 수정 실패", "")
    })
}