import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  NextOrObserver,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";

import { firebaseAuth } from "./firebase";

type ProviderName = "Google" | "Github";

type SuccessState = {
  state: "success";
  user: User;
};

type FailState = {
  state: "fail";
  reason: string;
};

export type ResultState = SuccessState | FailState;

class Auth {
  async providerLogin(providerName: ProviderName): Promise<ResultState> {
    try {
      const ProviderClass = this.getProvider(providerName);
      const provider = new ProviderClass();
      const result = await signInWithPopup(firebaseAuth, provider);
      return {
        state: "success",
        user: result.user,
      };
    } catch (error: any | unknown) {
      return { state: "fail", reason: error.code };
    }
  }

  async loginWithEmailandPassword(
    email: string,
    password: string
  ): Promise<ResultState> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      return {
        state: "success",
        user: userCredential.user,
      };
    } catch (error: any | unknown) {
      console.log(error.code);
      return { state: "fail", reason: error.code };
    }
  }

  async logout() {
    await signOut(firebaseAuth);
  }

  private getProvider(providerName: ProviderName) {
    switch (providerName) {
      case "Google":
        return GoogleAuthProvider;
      case "Github":
        return GithubAuthProvider;
      default:
        throw new Error(`unknown providerName : ${providerName}`);
    }
  }

  handleStateChange(callback: NextOrObserver<User>) {
    onAuthStateChanged(firebaseAuth, callback);
  }
}

export default Auth;
