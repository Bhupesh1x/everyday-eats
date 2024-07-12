import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 h-full">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
