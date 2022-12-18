import LineChart from "../../charts/line-chart/line-chart";
import PieChart from "../../charts/PieChart/pie-chart";

const WithChartModal = ({ hidden, setHidden, userId, list }) => {
  return (
    <div
      onClick={() => {
        setHidden(true);
      }}
      className={`w-full bg-white left-0  absolute   h-screen top-0 ${
        hidden ? "hidden" : "absolute"
      }`}
    >
      <div className="w-full flex flex-col justify-center h-full items-center ">
        <PieChart userId={userId} list={list} />
        <LineChart userId={userId} list={list} />
      </div>
    </div>
  );
};

export default WithChartModal;
