"use client";

import { cn } from "@/_utils/clsx";
import CustomIcon from "@/Icons";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../common/input/TextInput";
import LoginButton from "./LoginButton";
import { usePostLogin } from "@/hooks/fetcher/login/usePostLogin";

interface LoginFormData {
  email: string;
  password: string;
}

const LABEL_STYLES =
  "text-1.125 leading-[1.4em] tracking-[-0.02em] text-fgGrayDefault";
const INPUT_STYLES =
  "w-full h-[48px] px-0.75 rounded-md bg-fillGrayDefault focus:border focus:border-borderPrimary text-1";
const BUTTON_ICON_STYLES = "w-[24px] h-[24px]";
const CLEAR_BUTTON_STYLES =
  "absolute right-0 top-1/2 transform -translate-y-1/2";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    reset,
  } = useForm<LoginFormData>({
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);
  const emailValue = watch("email");
  const passwordValue = watch("password");
  const [loginError, setLoginError] = useState(false);
  const { mutate: login } = usePostLogin();

  const onSubmit = async (data: LoginFormData) => {
    if (!isValid) return;

    login(data, {
      onSuccess: () => {
        setLoginError(false);
      },
      onError: () => {
        setLoginError(true);
        reset({ email: "", password: "" });
      },
    });
  };

  const clearField = (field: keyof LoginFormData) => {
    setValue(field, "", { shouldValidate: true });
  };

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPassword = (password: string) =>
    /^[\x21-\x7E]{8,}$/.test(password);

  const isLoginEnabled = (email: string, password: string) =>
    !!email && !!password && isValidEmail(email) && isValidPassword(password);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[20px]"
    >
      {/* 이메일 입력 필드 */}
      <div className="flex flex-col gap-[8px]">
        <label htmlFor="email" className={LABEL_STYLES}>
          이메일
        </label>
        <TextInput<LoginFormData>
          id="email"
          name="email"
          type="email"
          placeholder="이메일을 입력해주세요."
          register={register}
          errors={errors}
          className={cn(
            INPUT_STYLES,
            errors.email ? "border-systemFailed" : "border-borderDefault",
            // emailValue && "",
            loginError && "border-[1px] border-systemFailed"
          )}
          required={true}
          autoFocus={true}
          validationRules={{
            // required: "이메일을 입력해주세요.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "",
              // message: "유효한 이메일 형식을 입력해주세요.",
            },
          }}
          rightElement={
            emailValue && (
              <button
                type="button"
                onClick={() => clearField("email")}
                className={CLEAR_BUTTON_STYLES}
              >
                <CustomIcon icon="CLOSE_SVG" className={BUTTON_ICON_STYLES} />
              </button>
            )
          }
        />
      </div>

      {/* 비밀번호 입력 필드 */}
      <div className="flex flex-col gap-[8px]">
        <label htmlFor="password" className={LABEL_STYLES}>
          비밀번호
        </label>
        <TextInput<LoginFormData>
          id="password"
          name="password"
          type={showPassword ? "name" : "password"}
          placeholder="비밀번호를 입력해주세요."
          register={register}
          errors={errors}
          className={cn(
            INPUT_STYLES,
            errors.password ? "border-systemFailed" : "border-borderDefault",
            // passwordValue && "pr-0",
            loginError && "border border-systemFailed"
          )}
          required={true}
          validationRules={{
            // required: "비밀번호를 입력해주세요.",
            minLength: {
              value: 8,
              message: "",
              // message: "비밀번호는 최소 8자 이상이어야 합니다.",
            },
            pattern: {
              value:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#^?&])[A-Za-z\d@$!%*#^?&]{8,}$/,
              message: "",
              // message: "영문, 숫자, 특수문자를 포함하여 8자 이상 입력해주세요.",
            },
          }}
          rightElement={
            passwordValue && (
              <div className={`${CLEAR_BUTTON_STYLES} flex-center gap-0.5`}>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="flex-center"
                >
                  <CustomIcon
                    icon={showPassword ? "CLOSE_EYE_SVG" : "EYE_SVG"}
                    className={BUTTON_ICON_STYLES}
                  />
                </button>
                <button
                  type="button"
                  onClick={() => clearField("password")}
                  className="flex-center"
                >
                  <CustomIcon icon="CLOSE_SVG" className={BUTTON_ICON_STYLES} />
                </button>
              </div>
            )
          }
        />
      </div>

      {/* 로그인 버튼 */}
      <LoginButton
        isType="submit"
        isDisabled={!isLoginEnabled(emailValue, passwordValue)}
        isClassName={cn(
          isLoginEnabled(emailValue, passwordValue)
            ? "bg-fillPrimaryDefault text-white"
            : "bg-fillPrimaryDisabled text-fgPrimaryDisabled cursor-not-allowed"
        )}
        isText="로그인"
      />
    </form>
  );
};

export default LoginForm;
