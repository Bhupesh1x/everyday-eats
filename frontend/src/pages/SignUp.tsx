import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../components/ui/button";

import RequiredLabel from "../components/auth/RequiredLabel";
import PasswordInput from "../components/auth/PasswordInput";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div className="h-full flex items-center justify-center bg-primary/10">
      <div className="translate h-auto border-0 rounded-lg card-shadow relative flex flex-col w-[90%] md:w-[70%] lg:w-[32%] bg-white outline-none focus:outline-none py-6 px-6">
        <h2 className="text-xl font-bold text-gray-800 leading-7">
          Create your account
        </h2>
        <p className="text-sm text-gray-500 font-normal leading-6">
          To continue to <span className="text-primary">Everyday-Eats</span>
        </p>

        <form onSubmit={handleSubmit} className="my-6 space-y-4">
          <div>
            <label htmlFor="name" className="input-label">
              Name <RequiredLabel />
            </label>
            <input
              id="name"
              required
              type="text"
              className="input"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <p
            className="ml-auto text-right text-sm text-primary w-full cursor-pointer hover:text-primary/90 transition hover:underline"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot password?
          </p>
          <Button
            className="bg-primary hover:bg-primary/80 transition text-white"
            type="submit"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin text-white" />
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </form>
        <p className="text-sm text-gray-500 mt-3">
          Already have an account?{" "}
          <Link to="/sign-in">
            <span className="text-primary cursor-pointer hover:opacity-85">
              Sign in
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
