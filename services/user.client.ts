import { auth } from "@/lib/firebase";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  type AuthProvider,
} from "firebase/auth";
import { signIn as serverSignIn } from "./user.server";

export async function signIn(platform: "google" | "github") {
  let provider: AuthProvider;
  switch (platform) {
    case "google": {
      provider = new GoogleAuthProvider();
      break;
    }
    case "github": {
      const ghProvider = new GithubAuthProvider();
      ghProvider.addScope("read:user");
      ghProvider.addScope("user:email");
      provider = ghProvider;
      break;
    }
  }

  const { user } = await signInWithPopup(auth, provider);

  return await serverSignIn({
    email: user.email!,
    name: user.displayName!,
    user_id: user.uid,
    img: user.photoURL,
  });
}
