import { Row } from "antd"; 
import { useSelector } from "react-redux"; 
import dayjs from "dayjs"; 
import WeatherCardLayout from "./WeatherCardLayout"; // 引入自訂的 WeatherCardLayout 元件

const WeatherCard = (props) => {
    const weatherData = useSelector((state) => state.weatherData.weatherData); // 從 Redux store 中取得 weatherData 狀態值

    return (
        <>
            <br />
            <Row gutter={[15, 15]} align="middle">
                {Object.keys(weatherData)
                    .filter((date) => dayjs(date).isBefore(dayjs().add(6, "day"))) // 過濾出六天內的日期
                    .map((date) => (
                        <WeatherCardLayout currentDate={date} data={weatherData[date]} region={props.region} key={date} /> // 依序產生天氣卡片
                    ))}
            </Row>
        </>
    );
};

export default WeatherCard;
