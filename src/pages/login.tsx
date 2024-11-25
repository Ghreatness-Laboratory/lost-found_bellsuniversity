import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";

interface LoginProps {
  username: string;
  password: string;
}

function Login() {
  const [state, setState] = useState<LoginProps>({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<LoginProps>>({});

  const validate = () => {
    const newErrors: Partial<LoginProps> = {};

    if (!state.username) newErrors.username = "Enter valid username";
    if (!state.password || state.password.length < 6) newErrors.password = "Password must be at least 8 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignIn = () => {

  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      handleSignIn();
    }
  };

  return (
    <div className="grid place-items-center md:pb-10 min-h-[74vh] lg:min-h-[80vh]">
      <div className="bg-white sm:border sm:border-gray-300 sm:rounded-xl sm:shadow-md max-w-md w-full">
        <div className="p-4 sm:p-7">
          <h1 className="block text-3xl font-bold text-gray-800 text-center">Admin Login</h1>
          <p className="mt-2 text-sm text-gray-600 text-center">
            Only admins can login
          </p>

          <div className="mt-5">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      onChange={handleChange}
                      placeholder="Enter username"
                      className="py-3 px-4 block w-full border border-gray-400 rounded-lg text-sm focus:border-blue-400 focus:ring-blue-400 disabled:opacity-50 disabled:pointer-events-none"
                    />
                    {errors.username && <p className="absolute text-xs text-[#F24822] mt-1">{errors.username}</p>}
                  </div>
                </div>

                <div className="my-6">
                  <div className="flex justify-between items-center">
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
                      type="password"
                      id="password"
                      name="password"
                      value={state.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                      className="py-3 px-4 block w-full border border-gray-400 rounded-lg text-sm focus:border-blue-400 focus:ring-blue-400 disabled:opacity-50 disabled:pointer-events-none"
                    />
                    {errors.password && <p className="absolute text-xs text-[#F24822] mt-1">{errors.password}</p>}
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
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-bawse font-bold rounded-lg border border-transparent bg-blue-400 text-white active:bg-blue-500 sm:hover:bg-blue-500 focus:outline-none focus:bg-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Login;
