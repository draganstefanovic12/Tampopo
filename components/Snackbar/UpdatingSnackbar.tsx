const UpdatingSnackbar = () => {
  return (
    <div
      className="bg-blue-100 fixed bottom-2 right-2 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
      role="alert"
    >
      <p className="font-bold">Updating progress...</p>
    </div>
  );
};

export default UpdatingSnackbar;
