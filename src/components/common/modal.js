import { useState } from "react";

function Modal({ onClose, onSubmit }) {
  const [form, setForm] = useState({ name: "", email: "", role: "Viewer" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    onSubmit(form);
    onClose();
  };

  const handleChange = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((er) => ({ ...er, [key]: "" }));
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/45 z-50 flex items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-[420px] max-w-[90vw] shadow-2xl overflow-hidden">
        <div className="px-6 pt-5 pb-4 border-b border-slate-100 flex justify-between items-center">
          <div>
            <div className="text-[15px] font-bold text-slate-900">
              Add new user
            </div>
            <div className="text-[12px] text-slate-400 mt-0.5">
              Fill in the details below
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-xl leading-none px-1 rounded-md transition-colors cursor-pointer bg-transparent border-none"
          >
            ×
          </button>
        </div>
        <div className="px-6 py-5 flex flex-col gap-3.5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-semibold text-gray-700">
              Name
            </label>
            <input
              type="text"
              placeholder="Jane Smith"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={`px-3 py-2.5 rounded-lg text-[13px] bg-slate-50 text-slate-900 outline-none transition-colors border ${
                errors.name
                  ? "border-red-400 focus:border-red-400"
                  : "border-slate-200 focus:border-indigo-400"
              }`}
            />
            {errors.name && (
              <span className="text-[11px] text-red-500">{errors.name}</span>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="jane@company.com"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`px-3 py-2.5 rounded-lg text-[13px] bg-slate-50 text-slate-900 outline-none transition-colors border ${
                errors.email
                  ? "border-red-400 focus:border-red-400"
                  : "border-slate-200 focus:border-indigo-400"
              }`}
            />
            {errors.email && (
              <span className="text-[11px] text-red-500">{errors.email}</span>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-semibold text-gray-700">
              Role
            </label>
            <select
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
              className="px-3 py-2.5 rounded-lg border border-slate-200 text-[13px] bg-slate-50 text-slate-900 outline-none cursor-pointer focus:border-indigo-400 transition-colors"
            >
              <option>Admin</option>
              <option>Editor</option>
              <option>Viewer</option>
            </select>
          </div>
        </div>
        <div className="px-6 pb-5 pt-2 flex gap-2.5 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-[13px] font-semibold cursor-pointer hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-lg border-none bg-gradient-to-br from-indigo-500 to-indigo-400 text-white text-[13px] font-semibold cursor-pointer shadow-[0_2px_8px_rgba(99,102,241,0.35)] hover:opacity-90 transition-opacity"
          >
            Add user
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
