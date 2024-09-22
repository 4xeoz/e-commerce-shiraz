import React from 'react'
import { getAllOrders } from '../_actions/admin';

const page = () => {
  return (
   <div>
    <h1>orders page</h1>
    <OrderCard />
   </div>
  )
}

export default page



const OrderCard = async () => {
  const order = await getAllOrders();


  return (
    <div className="order-card">
      <h2>Order Details</h2>
      {order.map((o) => (
        <div>
          {o.userEmail}
          {o.products.map((p)=> (
            <div>
              <h3>{p.product.name}</h3>
              <p>{p.quantity}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};