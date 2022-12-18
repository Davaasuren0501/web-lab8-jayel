import { getCookie } from "cookies-next";
import LineChartReport from "../components/charts/line-chart/line-chart-report";
import PieChartReport from "../components/charts/PieChart/pie-chart-report";
import Layout from "../components/layout/layout";
import { useEffect } from "react";
import { useRouter } from "next/router";
// import CardLineChart from "../components/line-chart/line-chart";
export const getServerSideProps = async (req, res) => {
  const token = getCookie("token", req, res);
  const userId = getCookie("userId", req, res);

  userId;
  let withlists = await fetch(
    `${
      process.env.NODE_ENV != "production"
        ? "http://localhost:3000"
        : "https://web-last-2lyd.vercel.app"
    }/api/with-list/${userId}`
  );
  withlists = await withlists.json();
  let depolists = await fetch(
    `${
      process.env.NODE_ENV != "production"
        ? "http://localhost:3000"
        : "https://web-last-2lyd.vercel.app"
    }/api/depo-list/${userId}`
  );
  depolists = await depolists.json();
  return {
    props: {
      token: token ? token : false,
      userId: userId ? userId : false,
      depolists: depolists.length === 0 ? [] : depolists,
      withlists: withlists.length === 0 ? [] : withlists,
    },
  };
};

const Report = ({ withlists, userId, depolists, token }) => {
  console.log(withlists);
  console.log(depolists);
  const router = useRouter();
  useEffect(() => {
    if (token === false) {
      router.replace("/login");
      return;
    }
  }, []);
  return token ? (
    <Layout>
      <div className="w-2/3 ">
        {/* <CardLineChart /> */}
        <LineChartReport
          withlists={withlists}
          depolists={depolists}
          userId={userId}
        />
        <PieChartReport
          withlists={withlists}
          depolists={depolists}
          userId={userId}
        />
      </div>
    </Layout>
  ) : (
    <div></div>
  );
};

export default Report;
