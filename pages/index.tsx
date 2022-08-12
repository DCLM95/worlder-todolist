import type { NextPage } from "next";
import Head from "next/head";
import Form from "../components/Form";
import { useState } from "react";
import Router, { useRouter } from "next/router";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";

const Home: NextPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [signInWithEmailAndPassword, signInUser, signInLoading, signInError] =
    useSignInWithEmailAndPassword(auth);
  const [registeredUser, registeredUserLoading, registeredUserError] =
    useAuthState(auth);

  function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleEmailChange = (e: any) => {
    if (!isValidEmail(e.target.value)) {
      setError("Email is invalid");
    } else {
      setError("");
    }
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(email, password);
  };

  const handleRegister = () => {
    router.push("/signup");
  };

  if (registeredUser && !registeredUserLoading) {
    router.push("/dashboard");
  }

  return (
    <div>
      <Head>
        <title>Worlder Todolist!</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-black h-screen flex flex-col items-center">
        <Form
          type="LOGIN"
          actionOne="Log in"
          actionTwo="Register Now!"
          condition="Not a member yet?"
          emailValue={email}
          passwordValue={password}
          handleEmailChange={handleEmailChange}
          handlePasswordChange={handlePasswordChange}
          handleActionOne={handleLogin}
          handleActionTwo={handleRegister}
          error={error && <h2 style={{ color: "red" }}>{error}</h2>}
          firebaseError={
            signInError && (
              <p className="items-center text-white">
                Error: Invalid Email or Password
              </p>
            )
          }
        />
      </div>
    </div>
  );
};

export default Home;
