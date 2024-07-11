import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LocalStorageInitData from "../../behindTheScene/helper/LocalStorageInitData";

export default function HomeLayout() {
  const navigate = useNavigate();
  const { token } = LocalStorageInitData();

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate, token]);
  return (
    <section className="landing-page">
      <Outlet />
    </section>
  );
}
