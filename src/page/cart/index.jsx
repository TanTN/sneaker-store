import React, { useEffect } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import Products from './product';
import WrapperBill from '@/components/popper/WrapperBill';
import Bill from './bill';
import { Link } from 'react-router-dom';
import Product from '@/layout/components/navbar/Cart/Product';

const Cart = () => {
    const userCurrent = useSelector((state) => state.store.userCurrent);
    const isMobile = useSelector((state) => state.store.isMobile);
    const allNumberProduct = userCurrent.products.reduce((init, product) => {
        return init + product.numberProducts;
    }, 0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="mx-auto max-w-[1140px] mt-[94px] xl:mt-0">
            <div className="flex items-center bg-[#eeeeee] pl-4 py-2 mb-[10px]">
                <AiOutlineHome className="hover:text-[#030303]" />
                <Link to="/" className="pl-2 text-[#585858] hover:text-[#000000] cursor-pointer text-sm md:text-base">
                    Trang chủ
                </Link>
                <span>&nbsp; / &nbsp;</span>
                <span> Giỏ hàng</span>
            </div>
            {allNumberProduct == 0 ? (
                <div className="my-[40px] mx-[10px] md:my-[80px]">
                    <div className="flex justify-center">
                        <img
                            src="https://theme.hstatic.net/1000285106/1000912959/14/cart_empty_background.png?v=120"
                            alt="noProduct"
                            className="w-[350px] h-[350px]"
                        />
                    </div>
                    <p className="text-center text-[26px] text-[#575757] my-3">“Hổng” có gì trong giỏ hết</p>
                    <p className="text-center text-[17px]">Về trang cửa hàng để chọn mua sản phẩm bạn nhé!!</p>
                    <div className="flex mx-auto justify-center my-4">
                        <Link to="/">
                            <button
                                variant="outlined"
                                className="px-[20px] py-[10px] text-[17px] hover: transition hover:bg-gray-800 hover:text-white border-[1px] border-[#303030]  rounded-[6px]"
                            >
                                Mua sắm ngay
                            </button>
                        </Link>
                    </div>
                </div>
            ) : (
                <>
                    {isMobile ? (
                        // with mobile
                        <Product userCurrent={userCurrent} />
                    ) : (
                        // with PC
                        <Products userCurrent={userCurrent} />
                    )}

                    <div className="flex justify-end">
                        <WrapperBill className={'w-[500px] lg:mx-0'}>
                            <Bill userCurrent={userCurrent} />
                        </WrapperBill>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
