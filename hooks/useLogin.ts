import { getErrorMessage } from "@/lib/utils";
import { signIn } from "@/services/user.client";
import { useCallback, useState } from "react";

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (...args: Parameters<typeof signIn>) => {
    setIsLoading(true);
    setError(null);

    try {
      const error = await signIn(...args);
      if (error) throw new Error(error);
      setIsSuccess(true);
    } catch (err) {
      reportError(err);
      setError(getErrorMessage(err));
    }

    setIsLoading(false);
  }, []);

  return {
    login,
    isLoading,
    error,
    isSuccess,
  };
}
