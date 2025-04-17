import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: 'url("/bg.jpg")' }}
    >
      <div className="bg-white p-12 rounded-md shadow-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
