// 傳入數字，跟白天或晚上的資訊，可以返回相對應的天氣ICON
import Image from "next/image";

const weatherTypes = {
    isThunderstorm: [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
    isClear: [1],
    isCloudyFog: [25, 26, 27, 28],
    isCloudy: [2, 3, 4, 5, 6, 7],
    isFog: [24],
    isPartiallyClearWithRain: [8, 9, 10, 11, 12, 13, 14, 19, 20, 29, 30, 31, 32, 38, 39],
    isSnowing: [23, 37, 42],
};

const iconStyle = { width: "100%", height: "100%" };

const weatherIcons = {
    day: {
        isThunderstorm: <Image src="/images/day-thunderstorm.svg" alt="Day Thunderstorm" style={iconStyle} width={150} height={150} />,
        isClear: <Image src="/images/day-clear.svg" alt="Day Clear" style={iconStyle} width={150} height={150} />,
        isCloudyFog: <Image src="/images/day-cloudy-fog.svg" alt="Day Cloudy Fog" style={iconStyle} width={150} height={150} />,
        isCloudy: <Image src="/images/day-cloudy.svg" alt="Day Cloudy" style={iconStyle} width={150} height={150} />,
        isFog: <Image src="/images/day-fog.svg" alt="Day Fog" style={iconStyle} width={150} height={150} />,
        isPartiallyClearWithRain: (
            <Image
                src="/images/day-partially-clear-with-rain.svg"
                alt="Day Partially Clear With Rain"
                style={iconStyle}
                width={150}
                height={150}
            />
        ),
        isSnowing: <Image src="/images/day-snowing.svg" alt="Day Snowing" style={iconStyle} width={150} height={150} />,
    },
    night: {
        isThunderstorm: <Image src="/images/night-thunderstorm.svg" alt="Night Thunderstorm" style={iconStyle} width={150} height={150} />,
        isClear: <Image src="/images/night-clear.svg" alt="Night Clear" style={iconStyle} width={150} height={150} />,
        isCloudyFog: <Image src="/images/night-cloudy-fog.svg" alt="Night Cloudy Fog" style={iconStyle} width={150} height={150} />,
        isCloudy: <Image src="/images/night-cloudy.svg" alt="Night Cloudy" style={iconStyle} width={150} height={150} />,
        isFog: <Image src="/images/night-fog.svg" alt="Night Fog" style={iconStyle} width={150} height={150} />,
        isPartiallyClearWithRain: (
            <Image
                src="/images/night-partially-clear-with-rain.svg"
                alt="Night Partially Clear With Rain"
                style={iconStyle}
                width={150}
                height={150}
            />
        ),
        isSnowing: <Image src="/images/night-snowing.svg" alt="Night Snowing" style={iconStyle} width={150} height={150} />,
    },
    airFlow: <Image src="/images/weather-icon/air-flow.svg" alt="Air Flow" style={iconStyle} width={150} height={150} />,
    celsius: <Image src="/images/weather-icon/celsius.svg" alt="Celsius" style={iconStyle} width={150} height={150} />,
    tCold: <Image src="/images/weather-icon/t-cold.svg" alt="T Cold" style={iconStyle} width={150} height={150} />,
    tHot: <Image src="/images/weather-icon/t-hot.svg" alt="T Hot" style={iconStyle} width={150} height={150} />,
    umbrella: <Image src="/images/weather-icon/umbrella.svg" alt="Umbrella" style={iconStyle} width={150} height={150} />,
};

const WeatherIcon = (props) => {
    const iconKey = props.iconKey;
    return weatherIcons[iconKey];
};

const WeatherCode2Icon = (props) => {
    const { typeNumber, dayNightKey } = props;
    for (const type in weatherTypes) {
        if (weatherTypes[type].includes(parseInt(typeNumber))) {
            return weatherIcons[dayNightKey][type];
        }
    }
    return <></>;
};

export { WeatherIcon, WeatherCode2Icon };
