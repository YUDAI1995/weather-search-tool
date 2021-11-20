import { useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Weather from "./Weather";

interface ResultContainerProp {
  containerNum: number;
}

const ResultContainer: React.FC<ResultContainerProp> = ({ containerNum }) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: "weatherData",
    drop: () => ({ containerNum }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const areaList = useSelector((state: RootState) => state.areaState.areaList);
  const index = areaList.findIndex(({ num }) => num === containerNum);
  return isOver ? (
    <div
      ref={dropRef}
      className="py-2 px-4 md:p-4 h-64 w-full md:w-1/2 lg:w-1/3 border-2 border-blue-200"
    >
      <Weather
        area={areaList[index]}
        key={areaList[index].id}
        containerNum={containerNum}
      />
    </div>
  ) : (
    <div
      ref={dropRef}
      className="py-2 px-4 md:p-4 h-64 w-full md:w-1/2 lg:w-1/3 border-1 border-transparent"
    >
      <Weather
        area={areaList[index]}
        key={areaList[index].id}
        containerNum={containerNum}
      />
    </div>
  );
};

export default ResultContainer;
