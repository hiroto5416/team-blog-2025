export const Spinner = () => {
  return (
    <div className="bg-opacity-20 fixed inset-0 z-50 flex items-center justify-center bg-gray-100">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
    </div>
  );
};
