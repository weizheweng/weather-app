// 使用styled-components來建立Weather Card所需要用到的元件
import styled from "styled-components";

const theme = { width: "290px" };

export const WeatherCardWrapper = styled.div`
    position: relative;
    padding: 5px;
`;

export const Region = styled.div`
    height: 50px;
    text-align: left;
    font-size: 28px;
`;

export const Description = styled.div`
    height: 25px;
    text-align: left;
    font-size: 16px;
    color: #828282;
`;

export const CurrentWeather = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 140px;
    width: ${theme.width};
`;

export const Temperature = styled.div`
    font-size: 90px;
    font-weight: 300;
    display: flex;
`;

export const Celsius = styled.div`
    width: 60px;
    height: 70px;
    margin-top: -26px;
`;

export const CurrentWeatherInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    width: ${theme.width};
`;

export const StyleIcon = styled.div`
    flex: 0 0 45px;
`;

export const WeatherElement = styled.div`
    flex: 0 0 100px;
    font-size: 26px;
    font-weight: 300;
    display: flex;
`;

export const StyleSwitch = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: ${theme.width};
`;
