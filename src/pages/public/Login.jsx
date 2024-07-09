import React, { useState } from "react";
import { TEInput, TERipple } from "tw-elements-react";
import uppclLogo from "./../../assets/logo.jpeg";
import axios from "axios";
import { apiUrl } from "../../constant";
import Loader from "../../component/Loader";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [credential, setCredential] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredential((prev) => ({ ...prev, [name]: value }));
  };
  const authenticate = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      username: credential.username,
      password: credential.password,
    };
    axios
      .post(`${apiUrl}login`, data)
      .then((response) => {
        console.log("Response:", response);
        const data = response?.data?.user;
        data.role = response?.data?.role;
        localStorage.setItem("userData", JSON.stringify(data));
        localStorage.setItem("token", response.data.token);
        navigate("/", { replace: true });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });
  };

  return (
    <section className="h-full bg-neutral-200">
      {loading && <Loader />}
      <div className="h-full p-10">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800">
          <div className="w-1/2">
            <div className="block rounded-lg bg-white shadow-lg">
              <div className="g-0 lg:flex lg:flex-wrap">
                <div className="px-4 md:px-0 lg:w-full">
                  <div className="md:mx-6 md:p-12">
                    <div className="text-center">
                      <img
                        className="mx-auto w-60"
                        src={uppclLogo}
                        alt="logo"
                      />
                      <h4 className="mb-12 mt-1 pb-1 text-lg font-semibold">
                        Verified Bill
                      </h4>
                    </div>

                    <form onSubmit={authenticate}>
                      <p className="mb-4">Please login to your account</p>
                      {/* <!--Username input--> */}
                      <TEInput
                        type="text"
                        label="Username"
                        className="mb-4"
                        name="username"
                        onChange={handleChange}
                      ></TEInput>
                      <TEInput
                        type="password"
                        label="Password"
                        className="mb-4"
                        name="password"
                        onChange={handleChange}
                      ></TEInput>
                      <div className="mb-12 pb-1 pt-1 text-center">
                        <TERipple rippleColor="light" className="w-full">
                          <button
                            type="submit"
                            className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                          >
                            Log in
                          </button>
                        </TERipple>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Login;
