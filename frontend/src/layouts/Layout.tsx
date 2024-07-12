import { Header } from "../components/Header";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 h-full py-2">{children}</div>
    </div>
  );
}

export default Layout;
