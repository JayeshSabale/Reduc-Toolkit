import React, { useEffect, useState } from 'react'
import '../css/cartStyle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToCart,
  emptyCartItem,
  removeSingleItems,
  removeToCart,
} from './redux/features/cartSlice'

import toast from 'react-hot-toast'

function CartDetails() {
  const { carts } = useSelector((state) => state.allCart)
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantity, setTotalQuantity] = useState(0)
  const dispatch = useDispatch()

  const handleIncrement = (item) => {
    dispatch(addToCart(item))
  }

  const handleDecrement = (id) => {
    dispatch(removeToCart({ id }))
    toast.success('Item remove from your cart')
  }

  const handleSingleDecrement = (item) => {
    dispatch(removeSingleItems(item))
  }

  const emptyCart = () => {
    dispatch(emptyCartItem())
    toast.success('Your cart is empty')
  }

  const calculateTotalPrice = () => {
    let totalPrice = 0
    carts.map((item) => {
      totalPrice += item.price * item.qnty
    })
    setTotalPrice(totalPrice)
  }

  const calculateTotalQuantity = () => {
    let totalQuantity = 0
    carts.map((item) => {
      totalQuantity += item.qnty
    })
    setTotalQuantity(totalQuantity)
  }

  useEffect(() => {
    calculateTotalPrice()
  }, [carts])

  useEffect(() => {
    calculateTotalQuantity()
  }, [carts])

  return (
    <div className="row justify-content-center m-0">
      <div className="col-md-8 mt-5 mb-5 cardsdetails">
        <div className="card">
          <div className="card-header bg-dark p-3">
            <div className="card-header-flex">
              <h5 className="text-white m-0">
                Cart Calculation {carts.length > 0 ? `(${carts.length})` : ''}
              </h5>
              {carts.length > 0 && (
                <button
                  className="btn btn-danger mt-0 btn-sm"
                  onClick={emptyCart}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                  <span> Empty Cart</span>
                </button>
              )}
            </div>
          </div>
          <div className="card-body p-0">
            {carts.length === 0 ? (
              <table className="table cart-table mb-0">
                <tbody>
                  <tr>
                    <td colSpan={6}>
                      <div className="cart-empty">
                        <FontAwesomeIcon
                          icon={faCartShopping}
                          className="p1 fa-stack fa-2x has-badge"
                          style={{ color: 'gray' }}
                        />
                        <p>Your Cart is Empty</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <table className="table cart-table mb-0 table-responsive-sm">
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th className="text-right">
                      <span id="amount" className="amount">
                        Total Amount
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {carts.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <button
                          className="prdct-delete"
                          onClick={
                            item.qnty <= 1
                              ? () => handleDecrement(item.id)
                              : () => handleSingleDecrement(item)
                          }
                        >
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                      </td>
                      <td>
                        <div className="product-img">
                          <img src={item.imgdata} alt="" />
                        </div>
                      </td>
                      <td>
                        <div className="product-img">
                          <p>{item.dish}</p>
                        </div>
                      </td>
                      <td>{item.price}</td>
                      <td>
                        <div className="prdct-qty-container">
                          <button
                            className="prdct-qty-btn"
                            type="button"
                            onClick={() => handleSingleDecrement(item)}
                          >
                            <i className="fa fa-minus"></i>
                          </button>
                          <input
                            type="text"
                            className="qty-input-box"
                            value={item.qnty}
                            disabled
                          />
                          <button
                            className="prdct-qty-btn"
                            type="button"
                            onClick={() => handleIncrement(item)}
                          >
                            <i className="fa fa-plus"></i>
                          </button>
                        </div>
                      </td>
                      <td className="text-right">{item.qnty * item.price}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th>&nbsp;</th>
                    <th colSpan={3}>&nbsp;</th>
                    <th>
                      Items in cart <span className="ml-2 mr-2">:</span>
                      <span className="text-danger">{totalQuantity}</span>
                    </th>
                    <th className="text-right">
                      Total price
                      <span className="ml-2 mr-2">:</span>
                      <span className="text-danger">{totalPrice}</span>
                    </th>
                  </tr>
                </tfoot>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartDetails
