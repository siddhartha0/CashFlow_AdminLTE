import { Toaster } from "react-hot-toast";
import MainContent from "../components/MainContent";
import MainLayout from "../components/MainLayout";

const HomePage = () => {
  return (
    <MainLayout>
      <Toaster />
      <MainContent />
    </MainLayout>
  );
};

export default HomePage;
