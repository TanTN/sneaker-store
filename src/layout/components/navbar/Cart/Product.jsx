import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillCloseSquare } from 'react-icons/ai';

import { setProduct, setReloadClickCart } from '@/store/reducerStore';
import { handleDeleteProduct } from '@/utils/deleteProductUtil';
import { useNavigate } from 'react-router';

const Product = ({ userCurrent, setTippyPc }) => {
    const isLogin = useSelector((state) => state.store.isLogin);
    const isMobile = useSelector((state) => state.store.isMobile);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const handleFixProduct = (product) => {
        dispatch(setProduct(product));
        dispatch(setReloadClickCart(Math.random() * 100));
        if (!isMobile) setTippyPc(true);
        navigate('/detailProduct');
        window.scrollTo(0, 0);
    };

    return userCurrent.products?.map((product, index) => (
        <div key={index} className="relative">
            <div
                className="grid grid-cols-3 px-[10px] md:grid-cols-4 md:px-[80px] py-1 border-b-[1px] border-[#bebebe] cursor-pointer hover:border-primary pr-3 text-sm lg:pr-3 lg:pl-0 md:text-lg lg:text-base"
                onClick={() => handleFixProduct(product)}
            >
                <div>
                    <img className="md:w-[90px] md:h-[90px] lg:h-auto lg:w-auto" src={product.img} alt="photo" />
                </div>
                <div className="col-span-2 md:col-span-3 my-auto">
                    <p>{product.name}</p>
                    <div className="flex justify-between pt-2">
                        <p>
                            <span>SIZE: </span>
                            <span>{product.size}</span>
                        </p>
                        <p>
                            <span>{product.numberProducts}</span>
                            <span className="mx-3">x</span>
                            <span>
                                {product.price}
                                <span className="underline">đ</span>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div
                className="absolute top-0 left-[10px] md:left-[70px] md:top-[10px] lg:top-0 lg:left-0 cursor-pointer select-none"
                onClick={() => handleDeleteProduct(product, dispatch, userCurrent, isLogin)}
            >
                <AiFillCloseSquare className="text-[25px] lg:hover:text-primary" />
            </div>
        </div>
    ));
};

export default Product;
