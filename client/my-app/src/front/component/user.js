

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { CartContext } from "../context/context"


import Cart from "./cart";

export default function User() {

    const { carts, handleAdd, handleCart } = useContext(CartContext)


    return (
        <>
           <h1>salut le monde</h1>
        </>
    )
}