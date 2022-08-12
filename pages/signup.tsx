import type { NextPage } from "next";
import Head from "next/head";
import Form from "../components/Form";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";

const Home: NextPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [
    createUserWithEmailAndPassword,
    registerUser,
    registerLoadding,
    registerError,
  ] = useCreateUserWithEmailAndPassword(auth);
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

  const handleRegister = () => {
    createUserWithEmailAndPassword(email, password);
  };

  const handleLogin = () => {
    router.push("/");
  };

  if (!registeredUserLoading && registeredUser) {
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
          type="REGISTER"
          actionOne="Register"
          actionTwo="Login here!"
          condition="Already a member?"
          emailValue={email}
          passwordValue={password}
          handleEmailChange={handleEmailChange}
          handlePasswordChange={handlePasswordChange}
          handleActionOne={handleRegister}
          handleActionTwo={handleLogin}
          error={error && <h2 style={{ color: "red" }}>{error}</h2>}
          firebaseError={
            registerError && (
              <p className="items-center text-white">
                Error: Invalid Email or Password, Password must be at LEAST 6
                characters long.
              </p>
            )
          }
        />
      </div>
    </div>
  );
};

export default Home;
