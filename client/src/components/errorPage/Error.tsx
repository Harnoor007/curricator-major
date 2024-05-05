

const ErrorComponent = ({ message }: any) => {
  return (
    <div className="bg-white text-red-500 mx-auto my-auto p-6 rounded-md shadow-md">
      <div className="flex items-center">
        <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        <span className="font-bold">Error:</span>
      </div>
      <p className="mt-2">{message}</p>
    </div>
  );
};

export default ErrorComponent;
