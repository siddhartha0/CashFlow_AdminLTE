import { Outlet, useNavigate } from "react-router-dom";
import LocalData from "../../behindTheScene/helper/LocalData";
import { useEffect } from "react";

export default function HomeLayout() {
  const navigate = useNavigate();
  const token = LocalData.getStorageData("token");
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, []);
  console.log(token);
  return (
    <section className="landing-page">
      <Outlet />
    </section>
  );
}
