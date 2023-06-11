import { Switch, Col, Card, Spin } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import { WeatherIcon, WeatherCode2Icon } from "./WeatherIcon";
import {
    WeatherCardWrapper,
    Region,
    Description,
    CurrentWeather,
    Temperature,
    Celsius,
    CurrentWeatherInfo,
    StyleIcon,
    WeatherElement,
    StyleSwitch,
} from "./WeatherCardComponents";
dayjs.extend(weekday);

const WeatherCardLayout = (props) => {
    const { currentDate, data, region } = props;
    const [dayNightKey, setDayNightKey] = useState(Object.keys(data["day"]).length > 0 ? "day" : "night");
    const [wData, setWData] = useState(data[dayNightKey]);
    const [switchKey, setSwitchKey] = useState(dayNightKey === "day" ? true : false);
    const [cardLoading, setCardLoading] = useState(false);

    return (
        <Col xl={8} md={12} xs={24} align="center">
            <Spin spinning={cardLoading} tip="Loading..." style={{ marginTop: "5%" }}>
                <Card className="highlight-card" style={{ borderColor: "black" }} bodyStyle={{ height: 450, width: 330, padding: 5 }}>
                    <strong style={{ fontSize: 24 }}>{`${currentDate} ${dayjs(currentDate).format("dddd")}`}</strong>
                    <WeatherCardWrapper>
                        <Region>{region}</Region>
                        <Description>{wData["Wx"][0]}</Description>
                        <CurrentWeather>
                            <Temperature>
                                {wData["T"]}
                                <Celsius>{<WeatherIcon iconKey={"celsius"} />}</Celsius>
                            </Temperature>
                            <WeatherCode2Icon typeNumber={wData["Wx"][1]} dayNightKey={dayNightKey} />
                        </CurrentWeather>
                        <CurrentWeatherInfo>
                            <StyleIcon>
                                <WeatherIcon iconKey={"tCold"} />
                            </StyleIcon>
                            <WeatherElement>{`${wData["MinT"]}°C`}</WeatherElement>
                            <StyleIcon>
                                <WeatherIcon iconKey={"tHot"} />
                            </StyleIcon>
                            <WeatherElement>{`${wData["MaxT"]}°C`}</WeatherElement>
                        </CurrentWeatherInfo>
                        <CurrentWeatherInfo>
                            <StyleIcon>
                                <WeatherIcon iconKey={"airFlow"} />
                            </StyleIcon>
                            <WeatherElement>{`${wData["WS"]} m/s`}</WeatherElement>
                            <StyleIcon>
                                <WeatherIcon iconKey={"umbrella"} />
                            </StyleIcon>
                            <WeatherElement>{wData["PoP12h"] !== " " ? `${wData["PoP12h"]}%` : "NULL"} </WeatherElement>
                        </CurrentWeatherInfo>
                        <StyleSwitch>
                            <Switch
                                checkedChildren="白天"
                                unCheckedChildren="夜晚"
                                checked={switchKey}
                                onChange={(checked) => {
                                    setCardLoading(true);
                                    setSwitchKey(checked);
                                    setTimeout(() => {
                                        setDayNightKey(checked ? "day" : "night");
                                        setWData(data[checked ? "day" : "night"]);
                                        setCardLoading(false);
                                    }, 1000);
                                }}
                                disabled={Object.keys(data["day"]).length === 0 || Object.keys(data["night"]).length === 0 ? true : false}
                            />
                        </StyleSwitch>
                    </WeatherCardWrapper>
                </Card>
            </Spin>
        </Col>
    );
};

export default WeatherCardLayout;
