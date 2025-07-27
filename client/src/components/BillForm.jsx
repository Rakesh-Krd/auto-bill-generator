import React, { useState, useEffect } from "react";
import {Trash2} from "lucide-react";
const BillForm = ({ onBillChange ,company}) => {
  //const [companyData, setCompanyData] = useState(null);
  //  const company = getSafeLocalJson("company");




  const [bill, setBill] = useState({
    companyName: "",
    companyAddress: "",
    companyGST: "",
    companyEmail:"",
    customerName: "",
    customerAddress: "",
    customerEmail: "",
    items: [{ name: "", qty: "", unit: "pcs", price: "" }],
  });

useEffect(() => {
  if (!company) return;

  const updated = {
    companyName: company.companyName || "",
    companyAddress: company.companyAddress || "",
    companyGST: company.companyGST || "",
    companyEmail: company.email || "",
    customerName: "",
    customerAddress: "",
    customerEmail: "",
    items: [{ name: "", qty: "", unit: "pcs", price: "" }],
  };

  setBill(updated);
  onBillChange(updated); // ✅ This was missing after autofill
}, [company]);



  const units = ["pcs", "kg", "litre", "sqft", "box", "dozen", "meter", "gram"];

  const handleChange = (field, value) => {
    const updated = { ...bill, [field]: value };
    setBill(updated);
    onBillChange(updated);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...bill.items];
    newItems[index][field] = value;
    const updated = { ...bill, items: newItems };
    setBill(updated);
    onBillChange(updated);
  };

  const addItem = () => {
    const newItems = [...bill.items, { name: "", qty: "", unit: "pcs", price: "" }];
    const updated = { ...bill, items: newItems };
    setBill(updated);
    onBillChange(updated);
  };

  const removeItem = (index) => {
    const newItems = bill.items.filter((_, i) => i !== index);
    const updated = { ...bill, items: newItems };
    setBill(updated);
    onBillChange(updated);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">Enter Bill Details</h2>

      {/* Company Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-700">Company Name</label>
        <input
          className="input w-full"
          type="text"
          placeholder="ABC Enterprises"
          value={bill.companyName}
          onChange={(e) => handleChange("companyName", e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-700">Company Address</label>
        <input
          className="input w-full"
          type="text"
          placeholder="123 Business St, City"
          value={bill.companyAddress}
          onChange={(e) => handleChange("companyAddress", e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1 text-gray-700">Company Email</label>
        <input
          className="input w-full"
          type="text"
          placeholder="Email"
          value={bill.companyEmail}
          onChange={(e) => handleChange("companyEmail", e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1 text-gray-700">Company GST (Optional)</label>
        <input
          className="input w-full"
          type="text"
          placeholder="22ABCDE1234FZ1"
          value={bill.companyGST}
          onChange={(e) => handleChange("companyGST", e.target.value)}
        />
      </div>

      {/* Customer Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-700">Customer Name</label>
        <input
          className="input w-full"
          type="text"
          placeholder="John Doe"
          value={bill.customerName}
          onChange={(e) => handleChange("customerName", e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1 text-gray-700">Customer Address</label>
        <input
          className="input w-full"
          type="text"
          placeholder="456 Customer Road, Town"
          value={bill.customerAddress}
          onChange={(e) => handleChange("customerAddress", e.target.value)}
        />
      </div>
      

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1 text-gray-700">Customer Email</label>
        <input
          className="input w-full"
          type="email"
          placeholder="xyz@gmail.com"
          value={bill.customerEmail}
          onChange={(e) => handleChange("customerEmail", e.target.value)}
        />
      </div>

      {/* Items Section */}
      <h3 className="text-lg font-medium text-blue-500 mb-2">Item Details</h3>

      {bill.items.map((item, index) => (
        <div key={index} className="grid grid-cols-12 gap-2 mb-3">
          <input
            type="text"
            placeholder="Item Name"
            className="input col-span-5"
            value={item.name}
            onChange={(e) => handleItemChange(index, "name", e.target.value)}
          />
          <input
            type="number"
            placeholder="Qty"
            className="input col-span-2"
            value={item.qty}
            onChange={(e) => handleItemChange(index, "qty", e.target.value)}
          />
          <select
            className="input col-span-2"
            value={item.unit}
            onChange={(e) => handleItemChange(index, "unit", e.target.value)}
          >
            {units.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Price"
            className="input col-span-2"
            value={item.price}
            onChange={(e) => handleItemChange(index, "price", e.target.value)}
          />
          <button
            className="bg-red-500 text-white px-2 rounded col-span-1 flex items-center justify-center hover:bg-red-300"
              onClick={() => removeItem(index)}
                  type="button"
                   >
                 <Trash2 size={16} />
</button>
        </div>
      ))}

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
        onClick={addItem}
        type="button"
      >
        Add Item
      </button>
    </div>
  );
};

export default BillForm;
