import uppclLogo from "./../../assets/logo.jpeg";
function Dashboard() {
  return (
    <div className="min-h-full flex justify-center items-center">
      <div
        className="block max-w-xl p-6 border border-gray-200 rounded-lg shadow bg-gray-100 
        dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-full"
      >
        <img className="mx-auto w-60" src={uppclLogo} alt="logo" />
        <h1 className="text-3xl font-bold mt-4 text-center">
          New Verified Bill Portal
        </h1>
      </div>
    </div>
  );
}
export default Dashboard;
