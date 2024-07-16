import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

type Props = {
  showLinks?: boolean;
  children: React.ReactNode;
};

function Layout({ children, showLinks = true }: Props) {
  return (
    <div className="h-screen flex flex-col">
      <Header showLinks={showLinks} />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
