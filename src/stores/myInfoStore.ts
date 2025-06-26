import {AuthMy} from "@/services/auth/getAuthMy";
import {create} from "zustand";

interface MyInfo {
    myInfo: AuthMy | null;
    setMyInfo: (myInfo: AuthMy) => void;
}

const useMyInfoStore = create<MyInfo>((set) => ({
        myInfo: null,
        setMyInfo: (myInfo: AuthMy) => set({myInfo})
    }
));

export default useMyInfoStore;