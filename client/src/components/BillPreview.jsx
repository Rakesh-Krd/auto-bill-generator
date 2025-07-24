import React from "react";

const BillPreview = ({ bill, template }) => {
  

  const {
    companyName = "",
    companyAddress = "",
    companyGST = "",
    customerName = "",
    customerAddress = "",
    customerEmail="",
    items = [],
  } = bill;

  const totalAmount = items.reduce(
    (sum, item) => sum + (parseFloat(item.qty || 0) * parseFloat(item.price || 0)),
    0
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full">
      <h2 className="text-lg font-bold text-blue-600 mb-4">Bill Preview - {template}</h2>

      {/* Company Details */}
      <div className="mb-4">
        <h3 className="font-semibold text-blue-500">Company Details:</h3>
        <p><strong>Name:</strong> {companyName}</p>
        <p><strong>Address:</strong> {companyAddress}</p>
        {companyGST && <p><strong>GST:</strong> {companyGST}</p>}
      </div>

      {/* Customer Details */}
      <div className="mb-4">
        <h3 className="font-semibold text-blue-500">Customer Details:</h3>
        <p><strong>Name:</strong> {customerName}</p>
        <p><strong>Address:</strong> {customerAddress}</p>
        <p><strong>Email:</strong> {customerEmail}</p>
      </div>

      {/* Item Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-blue-100">
              <th className="border px-4 py-2">Item</th>
              <th className="border px-4 py-2">Qty</th>
              <th className="border px-4 py-2">Unit</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx}>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.qty}</td>
                <td className="border px-4 py-2">{item.unit}</td>
                <td className="border px-4 py-2">₹{item.price}</td>
                <td className="border px-4 py-2">
                  ₹{parseFloat(item.qty || 0) * parseFloat(item.price || 0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total */}
      <div className="text-right mt-4 font-bold text-lg text-blue-700">
        Total: ₹{totalAmount.toFixed(2)}
      </div>
    </div>
  );
};

export default BillPreview;
