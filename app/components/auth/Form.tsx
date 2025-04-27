import type { AuthError } from "@supabase/supabase-js";
import { useRef, useState, type FC } from "react";
import { Link, useNavigate } from "react-router";
import { signIn, signUp } from "~/api/auth/api";
import FormField from "../UI/FormField";
import Input from "../UI/Input";
import Button from "../UI/Button";

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
        <FormField>
          <label htmlFor="email">Email</label>
          <Input ref={emailRef} id="email" type="email" name="email" required />
        </FormField>

        <FormField>
          <label htmlFor="password">Password</label>
          <Input
            ref={passwordRef}
            id="password"
            type="password"
            name="password"
            required
          />
        </FormField>

        <Button disabled={loading} type="submit">
          {loading ? "Loading..." : authType}
        </Button>
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
