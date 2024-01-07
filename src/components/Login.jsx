import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, loginStart } from "../redux/reducers/user";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password should be at least 8 characters long";
    }

    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    // Clear the error for email when user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, email: undefined }));
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    // Clear the error for password when user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, password: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    if (validateForm()) {
      try {
        dispatch(loginStart());
        const response = await fetch(`http://localhost:5500/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);

        const user = Array.from(data).find((u) => {
          return u.email === email;
        });
        console.log(user);

      if(!user) {
        throw new Error('enter correct credentials');
      }
        let { password, ...rest } = user;
        dispatch(loginSuccess(rest));
        setEmail("");
        setPassword("");
        setErrors({});
        localStorage.setItem("user", user?.id);
        toast.success("login Successful!", { duration: 2000 });
        
        navigate("/");
      } catch (error) {
        toast.error(error.message, { duration: 1500 });
        console.log(error);
      }
    }
  };

  return (
    <div className="mt-4 bg-gray-50 flex flex-col justify-center py-8 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={handleChangeEmail}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="text-red-500 text-sm mt-2">
                {errors.email && errors.email}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={handleChangePassword}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
              <div className="text-red-500 text-sm mt-2">
                {errors.password && errors.password}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative mt-4 w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#2D6F6D] hover:bg-[#389c98]"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
