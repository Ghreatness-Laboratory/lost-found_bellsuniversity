import React, { ChangeEvent, FormEvent, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../hooks/useFetch";

interface LoginProps {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Partial<LoginProps>>({});
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [state, setState] = useState<LoginProps>({
    username: "",
    password: "",
  });

  const validate = () => {
    const newErrors: Partial<LoginProps> = {};

    if (!state.username) newErrors.username = "Enter valid username";
    if (!state.password || state.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${BASE_URL}/auth/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed. Please try again.");
      } else {
        alert("Login successful!");
        setState({ username: "", password: "" });
        navigate("/home");
      }
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again."
      );
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
      <div className="bg-white sm:border sm:border-gray-300 sm:rounded-xl sm:shadow-md max-w-lg w-full">
        <div className="p-4 sm:p-7">
          <h1 className="block text-3xl font-bold text-gray-800 text-center">
            Admin Login
          </h1>
          <p className="mt-2 text-sm text-gray-600 text-center">
            Only admins can login.
            <span className="text-gray-600 text-center">
              {" "}
              <Link
                to={"/register"}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Register
              </Link>{" "}
              as an admin
            </span>
          </p>

          <div className="mt-5">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
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

                <div className="my-6">
                  <div className="flex justify-between items-center font-semibold">
                    <label htmlFor="password" className="block text-sm mb-2">
                      Password
                    </label>
                    <Link
                      className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium"
                      to="#"
                    >
                      Forgot password?
                    </Link>
                  </div>
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

                <div className="flex items-center">
                  <div className="flex">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                  <div className="ms-3">
                    <label htmlFor="remember-me" className="text-sm">
                      Remember me
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-base font-bold rounded-lg border border-transparent bg-blue-400 text-white active:bg-blue-500 sm:hover:bg-blue-500 focus:outline-none focus:bg-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
                {error && (
                  <p className="text-sm text-[#F24822] text-center">
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

export default Login;
