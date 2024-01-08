import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import * as MdIcons from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import useNotification from "../customHooks/useNotification";

interface Props {
  heading?: string;
  warningMessage?: string;
}

const Login = (props: Props) => {
  const navigate = useNavigate();
  const { notify } = useNotification();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);

    notify("Login successful", { type: "success" });
    navigate("/");
  };

  return (
    <div>
      <h1 className="text-4xl">{props.heading}</h1>
      <div className="flex flex-col items-center mt-10">
        <div className="flex justify-center gap-2">
          {props.warningMessage && (
            <MdIcons.MdError
              style={{ color: "red", width: "30px", height: "30px" }}
            />
          )}
          <p className="text-xl">
            {props.warningMessage || "Login to your account"}
          </p>
        </div>
        <button
          onClick={signInWithGoogle}
          className="bg-gray-500 text-white p-2 mt-3"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
