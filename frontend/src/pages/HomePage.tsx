import Layout from "../layouts/Layout";

import { Hero } from "../components/Hero";
import { Info } from "../components/HomePage/Info";

function HomePage() {
  return (
    <Layout>
      <Hero />
      <div className="container pb-10">
        <Info />
      </div>
    </Layout>
  );
}

export default HomePage;
