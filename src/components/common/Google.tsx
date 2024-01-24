import React, { useState, useContext, useEffect } from "react";

import { useGoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { Button } from "@/components/ui/button";

//import { GlobalContext } from '../context/GlobalContext';
import { useTranslation } from "@/app/i18n/client";
import { useParams } from "next/navigation";
import Image from "next/image";

//import axios from '../utils/axios';

function Google() {
  const params = useParams();
  const lng: string = params?.lng as string;
  const { t } = useTranslation(lng, "login");

  ///const { setAuth } = useContext(GlobalContext);

  const [error, setError] = useState({
    status: false,
    message: "",
  });

  // useEffect(() => {
  //   function start() {
  //     gapi.client.init({
  //       clientId: publicRuntimeConfig.REACT_APP_GOOGLE_CLIENT_ID,
  //       scope: 'https://www.googleapis.com/auth/calendar',
  //     });
  //   }
  //   gapi.load('client:auth2', start);
  // }, []);
  const handleLogin = async (googleData: any) => {
    console.log(googleData);
    setError({
      status: false,
      message: "",
    });

    try {
      // const result = await axios.post(`/users/externalLogin`, {
      //   token: googleData.code,
      //   method: "google",
      // });
      //if (result.data.status === "success") {
      // await localStorage.setItem("campus-jwt", result.data.token);
      // setAuth({ ...result.data.data.user, token: result.data.token });
      // } else {
      // setError({
      //   status: true,
      //   message: result.data.message,
      // });
      //}
    } catch (err: any) {
      console.log(err?.response?.data?.message);

      setError({
        status: true,
        message: err.response?.data?.message || "Something went wrong",
      });
    }
  };
  const onFailure = (err: any) => {
    console.log("failed", err);
    setError({
      status: true,
      message: err.message || "Something went wrong",
    });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => handleLogin(codeResponse),
    onError: (err) => onFailure(err),
    flow: "auth-code",
  });

  return (
    <>
      {/* <GoogleLogin
        autoLoad={false}
        style={{ display: 'flex', flex: 1, justifyContent: 'center' }}
        clientId={publicRuntimeConfig.REACT_APP_GOOGLE_CLIENT_ID}
        render={(renderProps) => (
          <Button fullWidth className={classes.button} onClick={() => renderProps.onClick()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="19"
              fill="none"
              viewBox="0 0 18 19"
              style={{ marginRight: '10px' }}
            >
              <path
                fill="#4285F4"
                fillRule="evenodd"
                d="M18 9.392c0-.65-.058-1.277-.167-1.878h-8.65v3.552h4.943a4.223 4.223 0 01-1.832 2.772v2.304h2.968C16.998 14.544 18 12.19 18 9.392z"
                clipRule="evenodd"
              ></path>
              <path
                fill="#34A853"
                fillRule="evenodd"
                d="M9.184 18.367c2.479 0 4.558-.822 6.077-2.225l-2.967-2.304c-.823.551-1.875.877-3.11.877-2.392 0-4.417-1.616-5.139-3.787H.977v2.38a9.18 9.18 0 008.207 5.059z"
                clipRule="evenodd"
              ></path>
              <path
                fill="#FBBC05"
                fillRule="evenodd"
                d="M4.045 10.929a5.522 5.522 0 01-.288-1.745c0-.606.104-1.194.288-1.745v-2.38H.977A9.181 9.181 0 000 9.185c0 1.482.355 2.884.977 4.124l3.068-2.38z"
                clipRule="evenodd"
              ></path>
              <path
                fill="#EA4335"
                fillRule="evenodd"
                d="M9.184 3.653c1.348 0 2.559.463 3.51 1.373l2.634-2.634C13.738.91 11.66 0 9.184 0A9.18 9.18 0 00.977 5.06l3.068 2.379c.722-2.171 2.747-3.786 5.139-3.786z"
                clipRule="evenodd"
              ></path>
            </svg>{' '}
            {t('common.externalLogin.google')}
          </Button>
        )}
        buttonText={t('common.externalLogin.google')}
        onSuccess={handleLogin}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        redirectUri="http://localhost:3000"
        scope="https://www.googleapis.com/auth/calendar"
      /> */}
      <Button
        variant='default'
        className='font-light px-8 flex gap-2'
        onClick={() => login()}
      >
        {true && (
          <Image
            src='/loader.gif'
            width={15}
            height={15}
            className='object-cover'
            alt='loading'
          />
        )}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='18'
          height='19'
          fill='none'
          viewBox='0 0 18 19'
          style={{ marginRight: "10px" }}
        >
          <path
            fill='#4285F4'
            fillRule='evenodd'
            d='M18 9.392c0-.65-.058-1.277-.167-1.878h-8.65v3.552h4.943a4.223 4.223 0 01-1.832 2.772v2.304h2.968C16.998 14.544 18 12.19 18 9.392z'
            clipRule='evenodd'
          ></path>
          <path
            fill='#34A853'
            fillRule='evenodd'
            d='M9.184 18.367c2.479 0 4.558-.822 6.077-2.225l-2.967-2.304c-.823.551-1.875.877-3.11.877-2.392 0-4.417-1.616-5.139-3.787H.977v2.38a9.18 9.18 0 008.207 5.059z'
            clipRule='evenodd'
          ></path>
          <path
            fill='#FBBC05'
            fillRule='evenodd'
            d='M4.045 10.929a5.522 5.522 0 01-.288-1.745c0-.606.104-1.194.288-1.745v-2.38H.977A9.181 9.181 0 000 9.185c0 1.482.355 2.884.977 4.124l3.068-2.38z'
            clipRule='evenodd'
          ></path>
          <path
            fill='#EA4335'
            fillRule='evenodd'
            d='M9.184 3.653c1.348 0 2.559.463 3.51 1.373l2.634-2.634C13.738.91 11.66 0 9.184 0A9.18 9.18 0 00.977 5.06l3.068 2.379c.722-2.171 2.747-3.786 5.139-3.786z'
            clipRule='evenodd'
          ></path>
        </svg>
        {t("signInGoogle")}
      </Button>

      {/* {error.status && (
        <Grid item style={{ marginTop: '1em' }}>
          <Typography variant="subtitle2" style={{ display: 'flex', alignItems: 'center' }}>
            {' '}
            <ErrorOutlineIcon style={{ fill: 'red', marginRight: '4px' }} /> {error.message}
          </Typography>
        </Grid>
      )} */}
    </>
  );
}
export default function GoogleLoginComponent() {
  return (
    <GoogleOAuthProvider
      //clientId={publicRuntimeConfig.REACT_APP_GOOGLE_CLIENT_ID}
      clientId='425560696157-nmvjfegittpg46e0ml0akp91qjmhos28.apps.googleusercontent.com'
    >
      <Google />
    </GoogleOAuthProvider>
  );
}
