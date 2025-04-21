import type { AuthError } from "@supabase/supabase-js";
import { useRef, useState, type FC } from "react";
import { Link, useNavigate } from "react-router";
import { signIn, signUp } from "~/api/auth/api";

type Props = {
  authType: "Login" | "Register";
};

const Form: FC<Props> = ({ authType }) => {
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setError(null);

    const emailInput = emailRef.current?.value;
    const passwordInput = passwordRef.current?.value;

    if (!emailInput || !passwordInput) {
      return;
    }

    if (authType === "Login") {
      const { data, error } = await signIn(emailInput, passwordInput);
      if (error) {
        setError(error?.message || "Something went wrong");
      } else {
        navigate("/");
      }
    } else {
      const { data, error } = await signUp(emailInput, passwordInput);
      if (error) {
        setError(error?.message || "Something went wrong");
      } else {
        navigate("/");
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-center">{authType}</h2>
      {error && <span className="text-red-500">{error}</span>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <label htmlFor="email">Email</label>
          <input
            ref={emailRef}
            className="border-black border-[1px] px-1 outline-0 rounded-xs"
            id="email"
            type="email"
            name="email"
            required
          />
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="password">Password</label>
          <input
            ref={passwordRef}
            className="border-black border-[1px] px-1 outline-0 rounded-xs"
            id="password"
            type="password"
            name="password"
            required
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white rounded-md py-2 w-full"
        >
          {loading ? "Loading..." : authType}
        </button>
      </form>

      {authType === "Register" ? (
        <p>
          Already have an account?{" "}
          <span className="text-blue-500">
            <Link to={"/signin"}>Login</Link>
          </span>
        </p>
      ) : (
        <p>
          Don't have an account?{" "}
          <span className="text-blue-500">
            <Link to={"/signup"}>Register</Link>
          </span>
        </p>
      )}
    </div>
  );
};

export default Form;
