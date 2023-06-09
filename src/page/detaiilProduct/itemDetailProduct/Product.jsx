import React from 'react';
import { FcOk } from 'react-icons/fc';
import { useSelector } from 'react-redux';

import HowToSelect from './HowToSelect';
import { useNavigate } from 'react-router';
import Button from '@/components/button';

const Product = ({
    handleClearSize,
    handleMinusNumber,
    handleIncreaseNumber,
    handleAddProduct,
    handleBuy,
    handelSelectSize,
    isChecked,
    sizes,
    sizeActive,
    numberProduct,
}) => {
    const productView = useSelector((state) => state.store.viewProduct);

    return (
        <>
            <div className="px-[15px] lg:px-0">
                <div className="lg:grid lg:grid-cols-11">
                    <div className="col-span-5">
                        <img src={productView.img} alt="img" />
                    </div>
                    <div className=" col-span-6">
                        <div className="text-[27px] font-medium pb-4">{productView.name}</div>
                        <div className="flex items-end">
                            <span className="flex items-center text-[28px] font-bold text-primary">
                                {productView.price}
                                <span className="underline text-[20px] font-medium leading-[28px] pl-2">đ</span>
                            </span>
                            <span className="line-through pb-[6px] pl-4 text-[17px] text-c2 font-semibold">
                                {productView.priceDropped}
                                <span className="underline">đ</span>
                            </span>
                        </div>
                        <div className="flex py-3 md:items-center">
                            <div className="relative md:leading-0 leading-[33px]">
                                <p className="font-semibold pb-2">SIZE:</p>
                                {isChecked && (
                                    <p
                                        className="text-c1 cursor-pointer absolute left-0 top-[35px] md:top-[26px]"
                                        onClick={handleClearSize}
                                    >
                                        Xóa
                                    </p>
                                )}
                            </div>
                            <div className="flex pl-6 flex-wrap">
                                {sizes.map((data, index) => (
                                    <div key={index} className="pl-2 pb-2">
                                        <div
                                            className={`flex cursor-pointer w-[40px] border-[1px] border-[#ccc] ${
                                                sizeActive === index ? 'border-[1px] border-primary' : ''
                                            }`}
                                        >
                                            <label
                                                htmlFor={data.size}
                                                className="text-[18px] m-y-auto select-none w-[100%] leading-[30px] text-center text-c1 cursor-pointer md:hover:bg-[#e7e7e7d8]"
                                            >
                                                {data.size}
                                            </label>
                                            <input
                                                hidden
                                                type="checkbox"
                                                id={data.size}
                                                value={data.size}
                                                name={data.size}
                                                onChange={(e) => handelSelectSize(e, index)}
                                                checked={data.isChecked}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="text-[18px] mt-2">
                            <p className="">
                                <span>Số lượng:</span>
                                <span
                                    className="select-none ml-3 px-3 border-[1px] border-[#ccc] cursor-pointer lg:hover:bg-[#e7e7e7]"
                                    onClick={handleMinusNumber}
                                >
                                    -
                                </span>
                                <span className="mx-3">{numberProduct}</span>
                                <span
                                    className="select-none px-3 border-[1px] border-[#ccc] cursor-pointer lg:hover:bg-[#e7e7e7]"
                                    onClick={handleIncreaseNumber}
                                >
                                    +
                                </span>
                            </p>
                        </div>
                        <div className="flex pt-4 pb-2">
                            <Button
                                className={`text-white ${
                                    isChecked ? 'bg-primary hover-primary' : 'bg-[#ee8282] cursor-not-allowed'
                                }`}
                                onClick={handleAddProduct}
                            >
                                THÊM VÀO GIỎ HÀNG
                            </Button>

                            <Button className="bg-[#414141] ml-1 text-white lg:hover-cyan" onClick={handleBuy}>
                                MUA NGAY
                            </Button>
                        </div>

                        <div className="border-[1px] border-dashed border-primary p-[15px] mt-3">
                            <p className="text-[18px] font-bold">
                                Sôi Động Khuyến Mãi Dịp Tết 2023 <span className="text-primary">Siêu Sale 35%</span>
                            </p>
                            <ul>
                                <li className="py-[5px] leading-6">
                                    <FcOk className="inline-block text-[20px]" />
                                    <span className="pl-2 text-[18px]">
                                        Cam kết chất lượng như hình ảnh, video đăng tải trên Web
                                    </span>
                                </li>
                                <li className="py-[5px] leading-6">
                                    <FcOk className="inline-block text-[20px]" />
                                    <span className="pl-2 text-[18px]">Double Box kèm chống sốc khi giao hàng</span>
                                </li>
                                <li className="py-[5px] leading-6">
                                    <FcOk className="inline-block text-[20px]" />
                                    <span className="pl-2 text-[18px]">
                                        Giao hàng nhanh 60 phút trong nội thành Hà Nội và tp Hcm
                                    </span>
                                </li>
                                <li className="py-[5px] leading-6">
                                    <FcOk className="inline-block text-[20px]" />
                                    <span className="pl-2 text-[18px]">
                                        Nhận hàng và kiểm tra trước khi thanh toán.
                                    </span>
                                </li>
                                <li className="py-[5px] leading-6">
                                    <FcOk className="inline-block text-[20px]" />
                                    <span className="pl-2 text-[18px]">Hỗ Trợ đổi trả size linh hoạt</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <HowToSelect />
            </div>
        </>
    );
};

export default Product;
