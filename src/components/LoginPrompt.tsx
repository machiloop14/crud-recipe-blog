import React from "react";
import { BsExclamationTriangleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

interface ILoginPrompt {
  message: string;
}

const LoginPrompt = ({ message }: ILoginPrompt) => {
  const navigate = useNavigate();

  return (
    <div className=" flex flex-1 flex-col justify-center rounded-xl bg-white p-4 gap-2 items-center max-w-96 mx-auto">
      <div className="bg-[#fff5f6] px-3 py-3 rounded-full">
        <BsExclamationTriangleFill size={20} color="#ff3f56" />
      </div>

      <p className="font-semibold text-black text-lg">Log In Required</p>
      <p className="text-sm text-center text-[#49555e] ">{message}</p>

      <div className="flex  w-full justify-center gap-1 mt-1">
        <button
          // onClick={onConfirm}
          className=" basis-1/2 py-2.5 rounded-full text-xs font-semibold bg-[#ff3f56] text-white"
          onClick={() => navigate("/login")}
        >
          Continue to Sign In
        </button>
      </div>
    </div>
  );
};

export default LoginPrompt;
