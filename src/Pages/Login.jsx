import React, { useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const validUsername = "ayyan";
    const validPassword = "2005";

    if (username === validUsername && password === validPassword) {
      alert(`Welcome ${username}`);
      navigate("/tables"); // redirect to tables page
    } else {
      alert("Invalid username or password ❌");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 bg-gray-100 p-6 md:p-10 rounded-2xl shadow-2xl w-full max-w-6xl">
        <div className="w-full h-[200px] sm:h-[250px] md:w-[700px] md:h-[350px] rounded-xl overflow-hidden shadow-lg">
          <video
            src="video (1).mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-[500px] bg-white border border-gray-300 shadow-xl p-6 sm:p-8 md:p-10 rounded-2xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-gray-800">
            Sign UP
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6">
            <Input
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              color="blue"
              className="bg-gray-50 border border-gray-500 border-t-2 border-t-gray-900 rounded-lg"
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                color="blue"
                className="bg-gray-50 border border-gray-500 border-t-2 border-t-gray-900 rounded-lg pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>

            <Button
              type="submit"
              color="blue"
              className="mt-2 sm:mt-4 py-2 sm:py-3 text-base sm:text-lg rounded-lg"
            >
              Submit
            </Button>
               <Button
      color="blue"
      size="sm" // smaller button size
      className="mt-2 py-1 px-3 text-sm rounded-md" // smaller padding and font
      onClick={() => navigate("/practice")} // route to Practice page
    >
      Go to Practice
    </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
