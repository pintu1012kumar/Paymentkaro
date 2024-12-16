import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export const Appbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token
    localStorage.removeItem("token");

    // Redirect to the Sign-In page
    // navigate('/signin');

    // This is used to forcefully refresh
    window.location.href = "/signin";
  };

  return (
    <div className="shadow h-14 flex justify-between items-center">
      <div className="flex items-center ml-4 font-bold">PaymentKaro</div>

      <div className="flex items-center">
        <div className="mr-4">Hello</div>

        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center text-xl mr-2">
          U
        </div>
        {/* Logout Button */}
        <Button label="Logout" onClick={handleLogout} />
      </div>
    </div>
  );
};
