import React, { ChangeEvent, FormEvent, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

interface LoginProps {
  username: string;
  password: string;
  email: string;
  phone_number: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Partial<LoginProps>>({});
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [state, setState] = useState<LoginProps>({
    username: "",
    password: "",
    email: "",
    phone_number: "",
  });

  const validate = () => {
    const newErrors: Partial<LoginProps> = {};

    if (!state.username) newErrors.username = "Enter valid username";
    if (!state.email) newErrors.email = "Enter valid email address";
    if (!state.phone_number)
      newErrors.phone_number = "Enter valid phone number";
    if (!state.password || state.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "phone_number") {
      // Only update if the input is numbers or empty
      const numbersOnly = value.replace(/[^0-9]/g, "");
      setState((prevState) => ({
        ...prevState,
        [name]: numbersOnly,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSignIn = () => {
    setLoading(true);
    try {
      const { error } = useFetch("/accounts/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: state,
      });

      if (error) {
        setError(error.message || "An error occurred");
      } else {
        navigate("/home");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      handleSignIn();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      data-testid="login-page"
      className="grid place-items-center md:pb-10 min-h-[74vh] lg:min-h-[80vh]"
    >
      <div className="bg-white sm:border sm:border-gray-300 sm:rounded-xl sm:shadow-md max-w-lg md:max-w-2xl w-full">
        <div className="px-4 py-10 sm:p-7">
          <h1 className="block text-3xl font-bold text-gray-800 text-center">
            Admin Registration
          </h1>
          <p className="mt-2 text-sm text-gray-600 text-center">
            Go back to{" "}
            <span className="text-gray-600 text-center">
              <Link
                to={"/login"}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Login
              </Link>
            </span>
          </p>

          <div className="mt-5">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-5 gap-y-4">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm mb-2 font-semibold"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={state.username}
                      onChange={handleChange}
                      placeholder="Enter username"
                      className="py-3 px-4 block w-full border border-gray-400 rounded-lg text-sm focus:border-blue-400 focus:ring-blue-400 disabled:opacity-50 disabled:pointer-events-none autofill:shadow-[inset_0_0_0px_1000px_white] autofill:text-black"
                    />
                    {errors.username && (
                      <p className="absolute text-xs text-[#F24822] mt-1">
                        {errors.username}
                      </p>
                    )}
                  </div>
                </div>

                <div className="max-lg:mt-2">
                  <label
                    htmlFor="email"
                    className="block text-sm mb-2 font-semibold"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={state.email}
                      onChange={handleChange}
                      placeholder="Enter email address"
                      className="py-3 px-4 block w-full border border-gray-400 rounded-lg text-sm focus:border-blue-400 focus:ring-blue-400 disabled:opacity-50 disabled:pointer-events-none autofill:shadow-[inset_0_0_0px_1000px_white] autofill:text-black"
                    />
                    {errors.email && (
                      <p className="absolute text-xs text-[#F24822] mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-2">
                  <label
                    htmlFor="phone_number"
                    className="block text-sm mb-2 font-semibold"
                  >
                    Phone Number
                  </label>
                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2">
                        <p className="text-sm">+234 </p>
                      </div>
                      <input
                        id="phone_number"
                        name="phone_number"
                        type="tel"
                        pattern="[0-9]{10}"
                        maxLength={10}
                        value={state.phone_number}
                        onChange={handleChange}
                        placeholder="Enter 10-digit phone number"
                        onPaste={(e) => {
                          // Prevent pasting non-numeric characters
                          const pastedText = e.clipboardData.getData("text");
                          if (!/^\d+$/.test(pastedText)) {
                            e.preventDefault();
                          }
                        }}
                        className="py-3 pr-4 pl-[4.5rem] block w-full border border-gray-400 rounded-lg text-sm focus:border-blue-400 focus:ring-blue-400 disabled:opacity-50 disabled:pointer-events-none autofill:shadow-[inset_0_0_0px_1000px_white] autofill:text-black"
                      />
                    </div>
                    {errors.phone_number && (
                      <p className="absolute text-xs text-[#F24822] mt-1">
                        {errors.phone_number}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-2 pb-6">
                  <label
                    htmlFor="password"
                    className="block text-sm mb-2 font-semibold"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={state.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                      className="py-3 px-4 block w-full border border-gray-400 rounded-lg text-sm focus:border-blue-400 focus:ring-blue-400 disabled:opacity-50 disabled:pointer-events-none pr-10"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="h-5 w-5 text-gray-400" />
                      ) : (
                        <FaEye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    {errors.password && (
                      <p className="absolute text-xs text-[#F24822] mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center lg:col-span-2">
                  <div className="flex">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      required
                      className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                  <div className="ms-3">
                    <label htmlFor="remember-me" className="text-sm">
                      I agree to the terms and conditions
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 lg:col-span-2 inline-flex justify-center items-center gap-x-2 text-base font-bold rounded-lg border border-transparent bg-blue-400 text-white active:bg-blue-500 sm:hover:bg-blue-500 focus:outline-none focus:bg-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
                </button>
                {error && (
                  <p className="text-sm text-[#F24822] text-center lg:col-span-2">
                    Error: {error}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
