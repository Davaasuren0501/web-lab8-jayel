import LineChart from "../../charts/line-chart/line-chart";
import LineChartDepo from "../../charts/line-chart/line-chart-depo";
import PieChart from "../../charts/PieChart/pie-chart";
import PieChartDepo from "../../charts/PieChart/pie-chart-depo";

const DepoChartModal = ({ hidden, setHidden, userId, list }) => {
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
        <PieChartDepo userId={userId} list={list} />
        <LineChartDepo list={list} userId={userId} />
      </div>
    </div>
  );
};

export default DepoChartModal;
