import type { FC } from "react";
import { Link } from "react-router";

type Props = {
  authType: "Login" | "Register";
};

const Form: FC<Props> = ({ authType }) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-center">{authType}</h2>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <label htmlFor="email">Email</label>
          <input
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
            className="border-black border-[1px] px-1 outline-0 rounded-xs"
            id="password"
            type="password"
            name="password"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white rounded-md py-2 w-full"
        >
          {authType}
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
