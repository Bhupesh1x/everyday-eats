import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../layouts/Layout";

import { Button } from "../components/ui/button";

import { useVerifyEmail } from "../features/auth/api/useVerifyEmail";

function VerifyEmail() {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const navigate = useNavigate();

  const mutation = useVerifyEmail();

  useEffect(() => {
    if (params?.userId && params?.token) {
      mutation.mutate(
        { token: params?.token, userId: params?.userId },
        {
          onSuccess: () => {
            setIsVerified(true);
            setIsLoading(false);
          },
          onError: () => {
            setIsVerified(false);
            setIsLoading(false);
          },
        }
      );
    }
  }, []);

  return (
    <Layout showLinks={false}>
      <div className=" h-full w-full flex items-center justify-center">
        {mutation.isLoading || isLoading ? (
          <div className="flex items-center flex-col">
            <Loader2 className="h-20 w-20 animate-spin text-muted-foreground" />
            <p className="text-center text-xl text-slate-500">
              Verifying your email
            </p>
          </div>
        ) : isVerified ? (
          <div className="flex flex-col items-center gap-6">
            <img
              src="/success-img.png"
              alt=""
              className="h-[100px] w-[100px] object-cover"
            />
            <p className="text-center text-xl text-slate-500">
              Email Verified Successfully
            </p>

            <Button className="min-w-32" onClick={() => navigate("/sign-in")}>
              Login
            </Button>
          </div>
        ) : (
          <>
            <p className="text-4xl font-semibold">404 Not Found</p>
          </>
        )}
      </div>
    </Layout>
  );
}

export default VerifyEmail;
