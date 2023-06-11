import { Switch, Row, Col, Card, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { setWeatherData } from "../store/reducers";
import WeatherCardLayout from "./WeatherCardLayout";

const WeatherCard = (props) => {
    const weatherData = useSelector((state) => state.weatherData.weatherData);

    return (
        <>
            <br />
            <Row gutter={[10, 10]} align="middle">
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
