import { Alert, Avatar, Grid, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import TagIcon from "@mui/icons-material/Tag";
import React, { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import "../firebase";
//1어디서 import하는건지 확인하기 : firebase메소드
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import md5 from "md5";
//2어디서 import하는건지 확인하기 : firebase메소드
import { getDatabase, ref, set } from "firebase/database";

const IsPasswordValid = (password, confirmPassword) => {
  if (password.length < 6 || confirmPassword.length < 6) {
    return false;
  } else if (password !== confirmPassword) {
    return false;
  } else {
    return true;
  }
};

const Join = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  //FormData API
  //이 처럼 보통은 HTML5의 <form> 태그이용해 input 값을 서버에 전송하지만, 자바스크립트에서 FormData() 클래스를 이용해 똑같이 스크립트로도 전송을 할수 있다.
  //FormData란 HTML 단이 아닌 자바스크립트 단에서 폼 데이터를 다루는 객체라고 보면 된다. 그리고 HTML에서의 Submit 제출 동작은 Ajax를 통해 서버에 제출한다고 보면 된다.
  //HTML이 아닌 자바스크립트 단 에서 form 전송 동작이 필요한 경우가 있는데, 이미지 같은 멀티미디어 파일을 페이지 전환 없이 폼 데이터를 비동기로 제출 하고 싶을 때나,
  //자바스크립트로 좀더 타이트하게 폼 데이터를 관리하고 싶을때 formData 객체를 이용한다고 보면 된다.
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");
    const confirmPassword = data.get("confirmPassword");

    if (!name || !email || !password || !confirmPassword) {
      setError("모든 항목을 입력해주세요");
      return;
    }
    if (!IsPasswordValid(password, confirmPassword)) {
      setError("비밀번호를 확인하세요.");
      return;
    }

    postUserData(name, email, password);
  };

  const postUserData = async (name, email, password) => {
    setLoading(true);
    try {
      //1.firebase에서 계정이 생성되고 로그인 한 상태로 변경된다. promis객체를 리턴하기때문에 await를 받도록 한다.
      const { user } = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password
      );
      //2.avatarapi를 사용해서 아이콘 이미지를 바꿔줄 수 있도록 한다. 해쉬값을 넣어주어야 하는데 md5라는 해쉬만들어주는 것을 import후 email을 해시값으로 만들어준다.
      await updateProfile(user, {
        displayName: name,
        photoURL: `https://www.gravatar.com/avatar/${md5(email)}?d=retro`,
      });
      // 리얼타임 데이터베이스에 저장
      await set(ref(getDatabase(), "users/" + user.id), {
        name: user.displayName,
        avatar: user.photoURL,
      });
      //5. TODO: store에 user 정보를 redux로 구현하려고 함
    } catch (e) {
      //3.firebase에서 에러를 뿌려주는 메서드 message
      setError(e.message);
      //4.로딩 풀어주기
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!error) return;
    setTimeout(() => {
      setError("");
    }, 3000);
  }, [error]);
  return (
    <Container component={"main"} maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <TagIcon />
        </Avatar>
        <Typography component={"h1"} variant="h5">
          회원가입
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                required
                fullWidth
                label="닉네임"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                required
                fullWidth
                label="이메일"
                // autoComplete="off"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                required
                fullWidth
                label="비밀번호"
                autoFocus
                // type="password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="confirmPassword"
                required
                fullWidth
                label="비밀번호확인"
                autoFocus
                // type="password"
              />
            </Grid>
          </Grid>
          {error ? (
            <Alert sx={{ mt: 3 }} severity="error">
              {error}
            </Alert>
          ) : null}
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
            loading={loading}
          >
            회원가입
          </LoadingButton>
          <Grid container justifyContent={"flex-end"}>
            <Grid item>
              <Link
                to={"/login"}
                style={{ textDecoration: "none", color: "blue" }}
              >
                이미 계정이 있나요? 로그인으로 이동
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Join;
