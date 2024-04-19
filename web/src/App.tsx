import { FaGoogle } from "react-icons/fa";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { api } from "./services/api";
import { useAuth } from "./hooks/useAuth";

function App() {
  return (
    <GoogleOAuthProvider clientId="854730911868-31nrd8uu3jm0n2a365fguumugu60oeek.apps.googleusercontent.com">
      <AppContent />
    </GoogleOAuthProvider>
  );
}

function AppContent() {
  const { userInfos, changeUser } = useAuth();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const response = await api.post("/users", {
        access_token: tokenResponse.access_token,
      });
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      console.log(response.data.token);
      const userInfoResponse = await api.get("/me");
      let user = {
        name: userInfoResponse.data.nome,
        avatar: userInfoResponse.data.avatar,
        token: response.data.token,
      };
      changeUser(user);
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
      <button
        onClick={() => {
          console.log(userInfos);
        }}
      >
        aaaaaaaaa
      </button>
    </div>
  );
}

export default App;
