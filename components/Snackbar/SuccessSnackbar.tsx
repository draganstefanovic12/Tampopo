const SuccessSnackbar = () => {
  return (
    <div
      className="bg-teal-100 fixed bottom-2 right-2 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
      role="alert"
    >
      <div className="flex">
        <div className="py-1"></div>
        <p className="font-bold">Progress updated.</p>
      </div>
    </div>
  );
};

export default SuccessSnackbar;
