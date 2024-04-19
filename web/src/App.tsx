import { FaGoogle } from "react-icons/fa";
import { AuthContextProvider } from "./contexts/AuthContext";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { api } from "./services/api";

function App() {
  return (
    <GoogleOAuthProvider clientId="854730911868-31nrd8uu3jm0n2a365fguumugu60oeek.apps.googleusercontent.com">
      <AuthContextProvider>
        <AppContent />
      </AuthContextProvider>
    </GoogleOAuthProvider>
  );
}

function AppContent() {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const response = await api.post("/users", {
        access_token: tokenResponse.access_token,
      });
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      console.log(response.data);
      // const userInfoResponse = await api.get("/me");
      // localStorage.setItem(
      //   "user-cubetimer",
      //   JSON.stringify(userInfoResponse.data.user)
      // );
      // localStorage.setItem("token-cubetimer", response.data.token);
    },
  });

  return (
    <div className="w-screen h-screen bg-gray-800 flex items-center justify-center">
      <button
        onClick={() => login()}
        className="mt-10 max-w-[300px] py-3 w-full duration-300 rounded p-2 bg-red-500 hover:bg-red-400 flex items-center justify-center gap-2 text-sm"
      >
        <FaGoogle />
        Sign in with Google
      </button>
    </div>
  );
}

export default App;
