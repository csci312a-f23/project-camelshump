import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginWidget() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="login">
        <p>
          Signed in as {session.user.email}{" "}
          <button type="button" onClick={signOut}>
            Sign out
          </button>{" "}
        </p>
      </div>
    );
  }
  return (
    <div className="login">
      <button type="button" onClick={() => signIn("google")}>
        Sign in
      </button>
    </div>
  );
}
