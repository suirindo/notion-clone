import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Link } from 'react-router-dom';
import authApi from '../api/authApi';

const Register = () => {
  const [usernameErrtext, setUsernameErrText] = useState('');
  const [passwordErrtext, setPasswordErrText] = useState('');
  const [confirmErrtext, setConfirmErrText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameErrText('');
    setPasswordErrText('');
    setConfirmErrText('');

    // 入力欄の文字列を取得
    const data = new FormData(e.target);
    const username = data.get('username').trim();
    const password = data.get('password').trim();
    const confirmPassword = data.get('confirmPassword').trim();
    console.log(username);
    console.log(password);
    console.log(confirmPassword);

    let error = false;

    if (username === '') {
      error = true;
      setUsernameErrText('名前を入力してください');
    }
    if (password === '') {
      error = true;
      setPasswordErrText('パスワードを入力してください');
    }
    if (confirmPassword === '') {
      error = true;
      setConfirmErrText('確認用パスワードを入力してください');
    }
    if (password !== confirmPassword) {
      error = true;
      setConfirmErrText('パスワードと確認用パスワードが異なります');
    }

    if (error) return;

    // 新規登録APIを叩く。try catch文が基本
    try {
      const res = await authApi.register({
        username,
        password,
        confirmPassword,
      });
      localStorage.setItem('token', res.token);
      console.log('新規登録に成功しました');
    } catch (err) {
      console.log(err);
      const errors = err.data.errors;
      console.log(errors);
      errors.forEach((err) => {
        if (err.param === 'username') {
          setUsernameErrText(err.msg);
        }
        if (err.param === 'password') {
          setPasswordErrText(err.msg);
        }
        if (err.param === 'confirmPassword') {
          setConfirmErrText(err.msg);
        }
      });
    }
  };
  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          id="username"
          label="お名前"
          margin="normal"
          name="username"
          required
          helperText={usernameErrtext}
          error={usernameErrtext !== ''}
        />
        <TextField
          fullWidth
          id="password"
          label="パスワード"
          margin="normal"
          name="password"
          type="password"
          required
          helperText={passwordErrtext}
          error={passwordErrtext !== ''}
        />
        <TextField
          fullWidth
          id="confirmPassword"
          label="確認用パスワード"
          margin="normal"
          name="confirmPassword"
          type="password"
          required
          helperText={confirmErrtext}
          error={confirmErrtext !== ''}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          loading={false}
          color="primary"
          variant="outlined"
        >
          アカウント作成
        </LoadingButton>
      </Box>
      <Button component={Link} to="/login">
        すでにアカウントを持っていますか？ログイン
      </Button>
    </>
  );
};

export default Register;
