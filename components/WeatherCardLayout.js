// 使用自訂的Components來呈現天氣卡片的畫面
import { Switch, Col, Card, Spin } from "antd"; 
import { useState } from "react"; 
import dayjs from "dayjs"; 
import weekday from "dayjs/plugin/weekday"; // 引入 dayjs 的 weekday 插件
import { WeatherIcon, WeatherCode2Icon } from "./WeatherIcon"; // 引入自訂的天氣圖示元件
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
} from "./WeatherCardComponents"; // 引入自訂的天氣卡片元件
dayjs.extend(weekday); // 使用 dayjs 的 weekday 插件

const WeatherCardLayout = (props) => {
    const { currentDate, data, region } = props; // 從傳入的 props 中取得相應的值
    const [dayNightKey, setDayNightKey] = useState(Object.keys(data["day"]).length > 0 ? "day" : "night"); // 設定初始的白天/夜晚狀態
    const [wData, setWData] = useState(data[dayNightKey]); // 根據白天/夜晚狀態設定對應的天氣資料
    const [switchKey, setSwitchKey] = useState(dayNightKey === "day" ? true : false); // 設定初始的白天/夜晚開關狀態
    const [cardLoading, setCardLoading] = useState(false); // 設定天氣卡片的加載狀態

    return (
        <Col xl={8} md={12} xs={24} align="center">
            <Spin spinning={cardLoading} tip="Loading..." style={{ marginTop: "5%" }}>
                <Card
                    className="highlight-card"
                    style={{ borderColor: "black" }}
                    bodyStyle={{
                        height: 450,
                        width: 330,
                        padding: 10,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                    }}
                >
                    {/* 設定Layout */}
                    <WeatherCardWrapper>
                        <strong style={{ fontSize: 24 }}>{`${currentDate} ${dayjs(currentDate).format("dddd")}`}</strong>
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
                            <WeatherElement>{wData["PoP12h"] !== " " ? `${wData["PoP12h"]}%` : "-"}</WeatherElement>
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
