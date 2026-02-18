import { MdArrowBack } from "react-icons/md";
import { PiGoogleChromeLogoLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import useNotification from "../customHooks/useNotification";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebase";

const Login = () => {
  const navigate = useNavigate();
  const { notify } = useNotification();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);

    if (result) {
      notify("Login successful", { type: "success" });
      navigate("/");
    }
  };

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <div className="absolute w-screen h-screen left-0">
      <div className="flex gap-4 items-center mr-2">
        {/* image */}
        <div className="basis-1/2 ">
          <img
            src="/login1.jpg"
            alt="chef cooking in kitchen"
            className="h-screen  object-cover w-full"
          />
        </div>
        {/* login interface */}
        <div className="basis-1/2 mx-auto max-w-96 flex flex-col gap-10">
          <div className="logo flex items-center gap-2">
            <div className="bg-[#FF5B27] px-1 py-1 rounded-md">
              <img src="/Vector.png" alt="torque icon" className="w-3 h-3" />
            </div>
            <p className="font-bold text-xl text-black">Curlinara</p>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-3xl font-bold text-black">Welcome Back</p>
            <p className="text-sm text-[#949494]">
              Sign in to your account to continue sharing and discovering
              recipes.
            </p>
            <div className="flex gap-2 flex-col">
              <button
                className="flex items-center w-full justify-center py-2 gap-2 border border-[#e8e8e8] rounded-lg hover:bg-[#e8e8e8] hover:border-[#CECECE]"
                onClick={signInWithGoogle}
              >
                <PiGoogleChromeLogoLight color="black" size={18} />
                <p className="text-sm text-black">Sign in with Google</p>
              </button>
              <button
                className="flex items-center w-full justify-center py-2 gap-2 border border-[#e8e8e8] rounded-lg hover:bg-[#e8e8e8] hover:border-[#CECECE]"
                onClick={navigateToHome}
              >
                <MdArrowBack color="black" size={18} />
                <p className="text-sm text-black">
                  Continue without Signing In
                </p>
              </button>
            </div>
            <p className="text-sm text-[#949494]">
              By clicking contine, you agree to our{" "}
              <span className="underline text-bold text-black">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="underline text-bold text-black">
                Privacy Policy
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
