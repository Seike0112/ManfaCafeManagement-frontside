import React, { useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, TextField } from '@material-ui/core';

import { useLogin } from '../../hooks/';

export const LoginPage = () => {
  const { control, handleSubmit } = useForm();
  const { setLogin } = useLogin();

  const onSubmit = async (data) => {
    setLogin(data, "owner")
    console.log("ログインボタン押下後（ログインデータ）", data);
    window.location.href = "/";
  };


  return (
    <>
      <div>Loginページだぞ</div>
      <Controller
        as={<TextField />}
        control={control}
        label="メールアドレス"
        name="own_email"
      // rules={validations.email}
      />
      <Controller
        as={<TextField />}
        control={control}
        label="パスワード"
        name="password"
      // rules={validations.email}
      />
      <Button
        // variant="contained"
        color="primary"
        disableElevation
        // className={classes.form}
        onClick={handleSubmit(onSubmit)}
      >
        ログイン
      </Button>
    </>
  )
}