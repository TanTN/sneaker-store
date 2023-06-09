import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { validateLogin } from '@/services/validateFormService';

import { AiOutlineLoading } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isLoginFalse, setIsLoginFalse] = useState(false);

    const initialValues = {
        username: '',
        password: '',
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
                const isLogin = await validateLogin(values, dispatch);
                if (isLogin) {
                    await setIsLoginFalse(false);
                    await navigate('/');
                } else {
                    setIsLoginFalse(true);
                }
            }}
        >
            {(formik) => (
                <div className="md:grid md:grid-cols-3">
                    <div className="hidden md:block md:col-span-2 md:h-[100vh]">
                        <img
                            className="h-[100%] object-cover"
                            src="https://shopgiayreplica.com/wp-content/uploads/2023/04/khai-truong-shopnew-hcm.jpg"
                            alt="store"
                        />
                    </div>

                    <div className="w-100% font-semibold">
                        <div className="text-xl text-white bg-[#ecc813] leading-[50px] text-center md:mx-[100px] md:bg-white md:text-[#ecc813] md:text-[35px] md:mt-[30px]">
                            User Login
                        </div>
                        <div className="mx-auto px-[40px] mt-[50px] md:px-[50px] xl:px-[100px] 2xl:px-[140px] ">
                            <Form>
                                <div className="mb-[10px] text-sm">
                                    <label htmlFor="username" className="">
                                        Username
                                    </label>
                                    <Field type="text" name="username" className="input-style" />
                                </div>
                                <div className="mb-[10px] text-sm">
                                    <label htmlFor="password" className="">
                                        Password
                                    </label>
                                    <Field type="password" name="password" className="input-style" />
                                </div>

                                <div className="flex w-[100%] mt-[50px] relative">
                                    {isLoginFalse && (
                                        <div className="absolute top-[-100%] w-[100%] text-primary text-center font-normal text-[14px]">
                                            Tên đăng nhập hoặc mật khẩu không đúng.
                                        </div>
                                    )}
                                    <button
                                        type="submit"
                                        className="mx-auto flex justify-center items-center border-[2px] border-[#ecc813] min-w-[100%] leading-[40px] text-[#ecc813] text-lg rounded-[4px] hover:bg-[#ecc813] hover:text-white"
                                    >
                                        {formik.isSubmitting && (
                                            <div className="pr-2">
                                                <AiOutlineLoading className="animate-fadeInLoadingLoginAndRegister" />
                                            </div>
                                        )}
                                        Sign in
                                    </button>
                                </div>
                                <div className=" flex justify-center md:flex-col md:items-center xl:flex-row xl:justify-center w-[100%] mt-[10px] md:mt-[25px] text-sm">
                                    <span className=" font-medium text-[#696969]">Don't have account?</span>
                                    <span
                                        className="font-semibold pl-2 cursor-pointer"
                                        onClick={() => navigate('/register')}
                                    >
                                        Sign up
                                    </span>
                                </div>
                                <div className="text-center text-sm">
                                    <p className="font-medium text-[#2c2c2c]">or</p>
                                    <Link to="/" className="cursor-pointer ">
                                        Back
                                    </Link>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            )}
        </Formik>
    );
};

export default Login;
