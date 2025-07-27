import React from "react";

const TemplateG = ({ bill }) => {
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
    (sum, item) => sum + parseFloat(item.qty || 0) * parseFloat(item.price || 0),
    0
  );

  return (
    <div className="bg-white p-6 rounded border border-gray-300 shadow-lg text-gray-900 font-serif">
      <header className="mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold uppercase tracking-wide">{companyName}</h1>
        <p>{companyAddress}</p>
        <p>Email: {companyEmail}</p>
        {companyGST && <p>GST: {companyGST}</p>}
      </header>

      <section className="mb-4">
        <h2 className="text-lg font-semibold">Billed To:</h2>
        <p>{customerName}</p>
        <p>{customerAddress}</p>
        <p>{customerEmail}</p>
      </section>

      <section className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-black text-white">
              <th className="p-2 border">Item</th>
              <th className="p-2 border">Qty</th>
              <th className="p-2 border">Unit</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx}>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.qty}</td>
                <td className="border p-2">{item.unit}</td>
                <td className="border p-2">₹{item.price}</td>
                <td className="border p-2">
                  ₹{(item.qty * item.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <footer className="mt-4 text-right text-lg font-bold">
        Total: ₹{totalAmount.toFixed(2)}
      </footer>
    </div>
  );
};

export default TemplateG;
