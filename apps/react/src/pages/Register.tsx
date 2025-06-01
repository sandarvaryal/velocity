import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";

interface Credentials {
  email: string;
  username: string;
  password: string;
}

export default function Register() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const mutation = useMutation({
    mutationFn: (credentials: Credentials) => {
      console.log("reached" + credentials.email);
      return axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
        credentials,
        {
          withCredentials: true,
        }
      );
    },
  });

  const submitFunction = (e: React.FormEvent) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (email && username && password) {
      mutation.mutate({ email, username, password });
    } else {
      console.error("missing credentials");
    }
  };

  return (
    <>
      <form onSubmit={submitFunction}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" ref={emailRef} />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" ref={usernameRef} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={passwordRef} />
        </div>

        <button className="cursor-pointer" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
