export default function Toggle3DButton({ toggle3D, setToggle3D }) {
  const toggle3DMode = () => {
    setToggle3D(!toggle3D);
  };

  return (
    <label className="flex items-center cursor-pointer border border-gray-400 rounded-full p-1 relative">
      <input
        type="checkbox"
        className="hidden"
        checked={toggle3D}
        onChange={toggle3DMode}
      />
      <span
        className={`toggle__line w-full h-4 bg-gray-400 rounded-full shadow-inner ${
          toggle3D ? "bg-screen-500" : "bg-gray-400"
        }`}
      ></span>
      <span
        className={`toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 ${
          toggle3D ? "right-0" : "left-0"
        }`}
      ></span>
    </label>
  );
}
