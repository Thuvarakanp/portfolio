import LoginForm from "./LoginForm";

export const metadata = { title: "Admin · Sign in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; error?: string; callbackUrl?: string }>;
}) {
  const params = await searchParams;
  const errorLabel =
    params.error === "CredentialsSignin"
      ? "Wrong username or password."
      : params.error === "AccessDenied"
      ? "Not authorised."
      : params.error
      ? `Auth error: ${params.error}`
      : null;

  return (
    <div className="admin-wrap" style={{ paddingTop: 140, maxWidth: 460 }}>
      <h1>Sign in</h1>
      <p className="lede-sm">Enter the admin password from your .env file.</p>
      {errorLabel && <div className="flash err">{errorLabel}</div>}
      <LoginForm from={params.from ?? params.callbackUrl ?? "/admin"} />
    </div>
  );
}
