import React from "react";

const TemplateF = ({ bill }) => {
  const {
    companyName = "",
    companyAddress = "",
    customerName = "",
    items = [],
  } = bill;

  const totalAmount = items.reduce(
    (sum, item) => sum + (parseFloat(item.qty || 0) * parseFloat(item.price || 0)),
    0
  );

  return (
    <div className="bg-white p-4 text-xs font-mono w-full border border-gray-300 rounded shadow-md max-w-sm mx-auto">
      <div className="text-center border-b border-dashed mb-2 pb-2">
        <h2 className="font-bold text-sm">{companyName}</h2>
        <p>{companyAddress}</p>
        <p>Customer: {customerName}</p>
      </div>

      <table className="w-full text-left mb-2">
        <thead>
          <tr>
            <th className="border-b pb-1">Item</th>
            <th className="border-b pb-1 text-right">Qty</th>
            <th className="border-b pb-1 text-right">₹</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
              <td>{item.name}</td>
              <td className="text-right">{item.qty}</td>
              <td className="text-right">
                {(item.qty * item.price).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="border-t border-dashed pt-2 text-right font-bold">
        Total: ₹{totalAmount.toFixed(2)}
      </div>

      <p className="text-center mt-2 text-gray-500">Thank you! Visit Again.</p>
    </div>
  );
};

export default TemplateF;
