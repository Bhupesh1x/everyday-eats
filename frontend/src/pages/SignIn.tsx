import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useSignIn } from "../features/auth/api/useSignIn";

import { Button } from "../components/ui/button";

import RequiredLabel from "../components/auth/RequiredLabel";
import PasswordInput from "../components/auth/PasswordInput";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const mutation = useSignIn();

  async function onSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    mutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          setEmail("");
          setPassword("");
          navigate("/");
        },
      }
    );
  }

  return (
    <div className="h-full flex items-center justify-center bg-primary/10">
      <div className="translate h-auto border-0 rounded-lg card-shadow relative flex flex-col w-[90%] md:w-[70%] lg:w-[40%] bg-white outline-none focus:outline-none py-6 px-6">
        <h2 className="text-xl font-bold text-gray-800 leading-7">Sign in</h2>
        <p className="text-sm text-gray-500 font-normal leading-6">
          To continue to <span className="text-primary">Everyday-Eats</span>
        </p>

        <form onSubmit={onSubmit} className="my-6 space-y-4">
          <div>
            <label htmlFor="email" className="input-label">
              Email address <RequiredLabel />
            </label>
            <input
              id="email"
              required
              type="email"
              className="input"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <PasswordInput
            value={password}
            onChange={(value) => setPassword(value)}
          />

          {/* {!!showMessage && (
            <p className="my-4 bg-primary/20 p-2 rounded-md font-normal text-primary/90">
              Thanks for creating your account. Verify your email by clicking on
              the link sent to your email so you can get up and running quickly.
            </p>
          )} */}

          <Button
            className="bg-primary hover:bg-primary/80 transition text-white"
            type="submit"
          >
            {mutation.isLoading ? (
              <>
                <Loader2 className="animate-spin text-white" />
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </form>
        <p className="text-sm text-gray-500 mt-5">
          New to Everyday-Eats?{" "}
          <Link to="/sign-up">
            <span className="text-primary cursor-pointer hover:opacity-85">
              Sign up now
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
