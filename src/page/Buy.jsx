import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import Input from '@mui/material/Input';
import { memo } from 'react';

import { AiOutlineHome,AiFillCheckCircle } from 'react-icons/ai';

import { getDistrict, getProvince, getWard, updateUser } from '../axios/axios';
import Order from '../layout/buy/Order';
import { setUserCurrent } from '../redux/reducer';

const Buy = () => {
    const user = useSelector((state) => state.store.userCurrent);
    const isLogin = useSelector((state) => state.store.isLogin);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isProvince, setIsProvince] = useState([]);
    const [isDistrict, setIsDistrict] = useState([]);
    const [isWard, setIsWard] = useState([]);
    const [priceCart, setPriceCart] = useState(null);
    const [allPrice, setAllPrice] = useState(null);
    const [isBuySuccess, setIsBuySuccess] = useState(false);

    const initialValues = user.information?.name
        ? {
              name: user.information.name,
              phone: user.information.phone,
              province: user.information.province,
              district: user.information.district,
              ward: user.information.ward,
              adress: user.information.adress,
          }
        : {
              name: '',
              phone: '',
              province: '',
              district: '',
              ward: '',
              adress: '',
          };
    useEffect(() => {
        setTimeout(() => setIsBuySuccess(false), 7000);
    }, [isBuySuccess]);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: initialValues,
    });
    
    const onSubmit = async (values) => {
        if (user.products.length > 0) {
            const newUser = {
                ...user,
                products: [],
                information: values,
            };
            if (isLogin) {
                await updateUser(newUser);
            }
            await dispatch(setUserCurrent(newUser));
            await setIsBuySuccess(true);
        }
    };

    useEffect(() => {
        const fetchApi = async () => {
            await getProvince().then((req) => {
                const option = req.map((province) => ({
                    value: province.code,
                    label: province.name,
                }));
                setIsProvince(option);
            });
        };
        fetchApi();
    }, []);

    const handleProvinceChange = (e) => {
        const fetchApi = async () => {
            await getDistrict(e.value).then((req) => {
                const option = req.districts.map((district) => ({
                    value: district.code,
                    label: district.name,
                }));
                setIsDistrict(option);
            });
            await reset((e) => ({
                ...e,
                district: '',
                ward: '',
            }));
        };
        fetchApi();
    };

    const handleDistrictChange = (e) => {
        const fetchApi = async () => {
            await getWard(e.value).then((req) => {
                const option = req.wards.map((ward) => ({
                    value: ward.code,
                    label: ward.name,
                }));
                setIsWard(option);
            });
            await reset((e) => ({
                ...e,
                ward: '',
            }));
        };
        fetchApi();
    };

    const handleBackHome = () => {
        if (isLogin) {
            navigate(`/user/${user.username}`);
            window.scrollTo(0, 0);
        } else {
            navigate('/');
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className="mt-[66px] max-w-[800px] mx-auto lg:mt-[10px]">
            {/* Messgae success */}
            {isBuySuccess && (
                <div className="fixed max-w-[380px] px-3 py-5 top-[10%] translate-x-[4%] animate-fadeInSuccess md:animate-fadeInSuccessPc md:translate-x-[8%] right-[4%] drop-shadow-xl bg-[#fff] border-y-[1px] border-r-[1px] border-l-[10px] border-[#13eb0b] z-[100] rounded-md">
                    <div className="flex items-center">
                        <AiFillCheckCircle className="text-[#13eb0b] text-[40px]" />
                        <div className="pl-2 text-[18px] text-[#4b4b4b]">
                            Bạn đã đặt hàng thành công. Cảm ơn bạn đã ủng hộ cửa hàng.
                        </div>
                    </div>
                </div>
            )}

            <div className="flex items-center lg:bg-[#eeeeee] pl-4 py-2 mb-[10px]">
                <AiOutlineHome className="hover:text-[#030303]" />
                <span className="px-2 text-[#585858] hover:text-[#000000] cursor-pointer" onClick={handleBackHome}>
                    Trang chủ
                </span>
                <span>/</span>
                <span className="pl-2 text-[#585858]">Thanh toán</span>
            </div>
            <div className="p-[15px] bg-[#e7e7e7]">
                <div className="bg-white">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className=" p-[15px]">
                            <p className="font-bold text-[20px] text-center py-3">Thánh toán và giao hàng</p>
                            <div className="md:grid grid-cols-2 gap-y-2 gap-x-[30px]">
                                <div className="pb-2">
                                    <label htmlFor="name" className={`${errors.name ? 'text-primary' : ''}`}>
                                        Họ và tên:
                                    </label>
                                    <Controller
                                        name="name"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                placeholder="Họ và tên của bạn"
                                                id="name"
                                                className="block w-[100%]"
                                            />
                                        )}
                                    />
                                </div>

                                <div className="pb-2">
                                    <label
                                        htmlFor="phone"
                                        className={`${errors.phone ? 'text-primary' : ''}`}
                                    >{`Số điện thoại (*):`}</label>
                                    <Controller
                                        name="phone"
                                        control={control}
                                        rules={{ required: true, pattern: /^0\d{8,9}$/ }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                placeholder="Số điện thoại của bạn"
                                                id="phone"
                                                className="block w-[100%]"
                                            />
                                        )}
                                    />
                                </div>

                                <div className="pb-2">
                                    <label htmlFor="province" className={`${errors.province ? 'text-primary' : ''}`}>
                                        Tỉnh/Thành phố
                                    </label>
                                    <Controller
                                        name="province"
                                        rules={{ required: true }}
                                        control={control}
                                        render={({ field }) => {
                                            return (
                                                <Select
                                                    {...field}
                                                    options={isProvince}
                                                    value={field.value}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleProvinceChange(e);
                                                    }}
                                                    placeholder="Chọn tỉnh/thành phố"
                                                />
                                            );
                                        }}
                                    />
                                </div>

                                <div className="pb-2">
                                    <label htmlFor="district" className={`${errors.district ? 'text-primary' : ''}`}>
                                        Quận/Huyện
                                    </label>
                                    <Controller
                                        name="district"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={isDistrict}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleDistrictChange(e);
                                                }}
                                                placeholder="Chọn quận huyện"
                                            />
                                        )}
                                    />
                                </div>

                                <div className="pb-2">
                                    <label htmlFor="ward" className={`${errors.ward ? 'text-primary' : ''}`}>
                                        Xã/Phường
                                    </label>
                                    <Controller
                                        rules={{ required: true }}
                                        name="ward"
                                        control={control}
                                        render={({ field }) => (
                                            <Select {...field} options={isWard} placeholder="Chọn xã/phường" />
                                        )}
                                    />
                                </div>

                                <div className="pb-2">
                                    <label
                                        htmlFor="adress"
                                        className={`${errors.adress ? 'text-primary' : ''}`}
                                    >{`Địa chỉ (*):`}</label>
                                    <Controller
                                        rules={{ required: true }}
                                        name="adress"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                placeholder="Địa chỉ của bạn"
                                                id="adress"
                                                className="block w-[100%]"
                                            />
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="py-3">
                                <p className="font-bold text-[18px]">Thông tin bổ sung</p>
                                <p className="text-c1 pb-1">Ghi chú đơn hàng (tuỳ chọn)</p>
                                <textarea
                                    placeholder="Ghi chú thêm về đơn hàng."
                                    className="w-[100%] h-[60px] outline-none border-[1px] border-[#6e6d6d] caret-[#ac3d3d]"
                                />
                            </div>
                        </div>
                        <div className="border-[1px] border-primary border-dashed p-[15px]">
                            
                            {/* products oder */}
                            {user.products.length > 0 ? (
                                <Order setPriceCart={setPriceCart} setAllPrice={setAllPrice} />
                            ) : (
                                <p className="text-center py-10 text-lg">
                                    Chưa có sản phẩm nào để đặt. Xin vui lòng quay lại cửa hàng!
                                </p>
                            )}

                            {/* Bảng thanh toán */}
                            <div className="md:mx-[40px] md:my-[30px] my-[15px] p-[15px] bg-[#ffffffe1] rounded-sm border-[2px] border-[#e9e9e9] drop-shadow-[0px_4px_8px_rgba(0,0,0,0.3)]">
                                <div className="mt-3">
                                    <div className="flex justify-between pb-1 text-[17px]">
                                        <p>Tạm tính:</p>
                                        <p>
                                            {user.products.length == 0 ? '0' : priceCart}
                                            <span className="underline"> đ</span>
                                        </p>
                                    </div>
                                    <div className="flex justify-between pb-1">
                                        <p>Giao hàng:</p>
                                        <p className="font-bold">
                                            30.000 <span className="underline">đ</span>
                                        </p>
                                    </div>
                                    <div className="pb-2">
                                        <p className="font-semibold text-lg">Tổng:</p>
                                        <p className="flex justify-end font-bold text-lg">
                                            {user.products.length == 0 ? '0' : allPrice}{' '}
                                            <span className="underline pl-[3px]"> đ</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Button */}
                                <div className="flex md:justify-end mt-3 flex-col md:flex-row">
                                    {user.products.length == 0 ? (
                                        <button
                                            className="md:mr-2 bg-[#414141] text-white py-1 px-3 rounded-sm text-[15px] -order-1 md:-order-2 my-2 md:my-0"
                                            onClick={handleBackHome}
                                        >
                                            QUAY TRỞ LẠI CỬA HÀNG
                                        </button>
                                    ) : (
                                        ''
                                    )}

                                    <button
                                        type="submit"
                                        className={`text-white py-1 px-3 rounded-sm text-[15px] -order-2 md:-order-1 ${
                                            user.products.length == 0 ? 'bg-[#ee8282] cursor-not-allowed' : 'bg-primary'
                                        }`}
                                    >
                                        ĐẶT HÀNG
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default memo(Buy);
