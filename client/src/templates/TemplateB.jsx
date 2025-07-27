import React from "react";

const TemplateB = ({ bill }) => {
  const {
    companyName = "",
    companyAddress = "",
    companyEmail = "",
    companyGST = "",
    customerName = "",
    customerAddress = "",
    customerEmail = "",
    items = [],
  } = bill;

  const totalAmount = items.reduce(
    (sum, item) => sum + (parseFloat(item.qty || 0) * parseFloat(item.price || 0)),
    0
  );

  return (
    <div className="w-[300px] p-4 font-mono text-sm border border-gray-300 rounded-md shadow-sm bg-white">
      {/* Header */}
      <div className="text-center mb-2">
        <h2 className="text-lg font-bold">{companyName}</h2>
        <p>{companyAddress}</p>
        <p>Email: {companyEmail}</p>
        {companyGST && <p>GST: {companyGST}</p>}
      </div>

      <div className="border-t border-dashed my-2"></div>

      {/* Customer Info */}
      <div className="mb-2">
        <p><strong>To:</strong> {customerName}</p>
        <p><strong>Email:</strong> {customerEmail}</p>
        {customerAddress && <p><strong>Address:</strong> {customerAddress}</p>}
      </div>

      {/* Item Table */}
      <table className="w-full text-left border-collapse mb-2">
        <thead>
          <tr className="border-t border-b border-gray-400 text-xs">
            <th className="py-1">Item</th>
            <th>Qty</th>
            <th>₹</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx} className="text-xs">
              <td className="py-1">{item.name}</td>
              <td>{item.qty}</td>
              <td>{item.price}</td>
              <td>
                {(parseFloat(item.qty || 0) * parseFloat(item.price || 0)).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="border-t border-dashed my-2"></div>

      {/* Total */}
      <div className="text-right font-semibold text-base">
        Total: ₹{totalAmount.toFixed(2)}
      </div>

      <div className="text-center mt-2 text-xs italic text-gray-600">
        Thank you for your purchase!
      </div>
    </div>
  );
};

export default TemplateB;
