import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

type Props = {
  showLinks?: boolean;
  showFooter?: boolean;
  children: React.ReactNode;
};

function Layout({ children, showFooter = false, showLinks = true }: Props) {
  return (
    <div className="h-screen flex flex-col relative">
      <Header showLinks={showLinks} />
      <div className="flex-1">{children}</div>
      {!!showFooter && <Footer />}
    </div>
  );
}

export default Layout;
