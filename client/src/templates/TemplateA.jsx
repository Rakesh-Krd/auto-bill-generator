import React from "react";

const TemplateA = ({ bill }) => {
  const total = bill.items?.reduce((acc, item) => acc + item.quantity * item.price, 0) || 0;

  return (
    <div className="text-sm">
      <h3 className="text-blue-700 font-bold text-lg mb-1">Company: {bill.company?.name}</h3>
      <p>{bill.company?.address}</p>
      {bill.company?.gst && <p>GST: {bill.company?.gst}</p>}

      <hr className="my-3" />

      <h4 className="font-semibold">Bill To:</h4>
      <p>{bill.customer?.name}</p>
      <p>{bill.customer?.address}</p>
      <p>Contact: {bill.customer?.contact}</p>

      <hr className="my-3" />

      <table className="w-full text-left border">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-1">Item</th>
            <th className="p-1">Qty</th>
            <th className="p-1">Price</th>
            <th className="p-1">Total</th>
          </tr>
        </thead>
        <tbody>
          {bill.items?.map((item, i) => (
            <tr key={i}>
              <td className="p-1">{item.name}</td>
              <td className="p-1">{item.quantity}</td>
              <td className="p-1">₹{item.price}</td>
              <td className="p-1">₹{item.quantity * item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="text-right font-bold mt-2">Total: ₹{total}</h3>
    </div>
  );
};

export default TemplateA;
