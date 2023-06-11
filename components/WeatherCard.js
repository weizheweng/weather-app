import { Row} from "antd";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import WeatherCardLayout from "./WeatherCardLayout";

const WeatherCard = (props) => {
    const weatherData = useSelector((state) => state.weatherData.weatherData);

    return (
        <>
            <br />
            <Row gutter={[15, 15]} align="middle">
                {Object.keys(weatherData)
                    .filter((date) => dayjs(date).isBefore(dayjs().add(6, "day")))
                    .map((date) => (
                        <WeatherCardLayout currentDate={date} data={weatherData[date]} region={props.region} key={date} />
                    ))}
            </Row>
        </>
    );
};

export default WeatherCard;
