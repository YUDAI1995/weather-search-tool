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

  return index === -1 ? null : isOver ? (
    <div
      ref={dropRef}
      className="py-4 px-4 w-full md:w-1/2 lg:w-1/3 bg-blue-100 rounded-xl"
    >
      <Weather
        area={areaList[index]}
        key={areaList[index].id}
        containerNum={containerNum}
      />
    </div>
  ) : (
    <div ref={dropRef} className="py-4 px-4 w-full md:w-1/2 lg:w-1/3">
      <Weather
        area={areaList[index]}
        key={areaList[index].id}
        containerNum={containerNum}
      />
    </div>
  );
};

export default ResultContainer;
