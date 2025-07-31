import { usePuterStore } from "~/lib/puter";
import type { Route } from "../+types/root";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Rezoom AI | Authentication" },
    { name: "description", content: "Log In to your account." },
  ];
}

function Auth() {
  const { isLoading, auth } = usePuterStore()
  const location = useLocation()
  const next = location.search.split('next=')[1]
  const navigate = useNavigate()

  useEffect(() => {
    if(auth.isAuthenticated) navigate(next);
  }, [auth.isAuthenticated, next])

  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex justify-center items-center">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-6 bg-white rounded-2xl p-8">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1>Welcome</h1>
            <h2 className="text-xl">Log In to Continue Your Job Journey</h2>
          </div>

          <div>
            {isLoading ? (
              <button className="auth-button animate-pulse">
                Signing you in...
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <button className="auth-button"onClick={auth.signOut}>
                    <p>Log Out</p>
                  </button>
                ) : (
                  <button className="auth-button"onClick={auth.signIn}>
                    <p>Log In</p>
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}

export default Auth
