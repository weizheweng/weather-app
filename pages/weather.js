import { Button, Row, Col, Select, Spin, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import anime from "animejs";
import dayjs from "dayjs";
import { setWeatherData } from "../store/reducers";
import WeatherCard from "../components/WeatherCard";
import * as request from "../request/api";

const authorizationKey = process.env.NEXT_PUBLIC_AUTHORIZATION_KEY;
const requestUrl = process.env.NEXT_PUBLIC_REQUEST_URL;

const regionData = [
    "基隆市",
    "臺北市",
    "新北市",
    "桃園市",
    "新竹縣",
    "新竹市",
    "苗栗縣",
    "臺中市",
    "彰化縣",
    "南投縣",
    "雲林縣",
    "嘉義縣",
    "嘉義市",
    "臺南市",
    "高雄市",
    "屏東縣",
    "宜蘭縣",
    "花蓮縣",
    "臺東縣",
    "澎湖縣",
    "金門縣",
    "連江縣",
];

const WeatherPage = () => {
    const elementRef = useRef(null);
    const [regionOptions, setRegionOptions] = useState([]);
    const [regionSelect, setRegionSelect] = useState(regionData[0]);
    const [cardHtml, setCardHtml] = useState();
    const [pageLoading, setPageLoading] = useState(false);
    const dispatch = useDispatch();

    const currentDate = dayjs().isAfter(dayjs().set("hour", 6).startOf("hour")) ? dayjs() : dayjs().subtract(1, "day");

    const getData = async () => {
        setPageLoading(true);
        // 觸發動畫效果
        const animation = anime({
            targets: elementRef.current,
            translateX: [-300, 0],
            duration: 2000,
            easing: "easeOutExpo",
        });

        const returnData = await request.getWeatherRecords(requestUrl, "GET", {
            Authorization: authorizationKey,
            locationName: regionSelect,
            elementName: "T,Wx,MaxT,MinT,PoP12h,WS",
        });

        let tempWeatherDate = {};

        if (returnData.success) {
            const weatherElement = returnData.records.locations[0].location[0].weatherElement;
            for (let i = 0; i <= 7; i++) {
                const tempCurrentDate = currentDate.add(i, "day").format("YYYY-MM-DD");
                tempWeatherDate[tempCurrentDate] = { day: {}, night: {} };
            }

            weatherElement.map((item) => {
                item.time.map((ele) => {
                    const dateKey =
                        dayjs(ele.startTime).format("HH") === "00"
                            ? dayjs(ele.startTime).subtract(1, "day").format("YYYY-MM-DD")
                            : dayjs(ele.startTime).format("YYYY-MM-DD");
                    const dayNightKey = dayjs(ele.endTime).format("HH") === "18" ? "day" : "night";
                    tempWeatherDate[dateKey][dayNightKey][item.elementName] =
                        item.elementName !== "Wx" ? ele.elementValue[0].value : [ele.elementValue[0].value, ele.elementValue[1].value];
                });
            });
            setTimeout(() => {
                dispatch(setWeatherData(tempWeatherDate));
                setCardHtml(<WeatherCard region={regionSelect} />);
                setPageLoading(false);
            }, 500);
        } else {
            setTimeout(() => {
                setPageLoading(false);
            }, 500);
        }
        setTimeout(() => {
            animation.pause();
        }, 2000);
    };

    useEffect(() => {
        const options = regionData.map((ele) => ({
            label: ele,
            value: ele,
        }));
        setRegionOptions(options);
    }, []);

    return (
        <>
            <Spin spinning={pageLoading} tip="Loading..." size="large" style={{ marginTop: "15%" }}>
                <Row gutter={[10, 10]} align="middle">
                    <Col xl={18} md={18} xs={24}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <strong style={{ fontSize: 20, marginRight: 10, flexShrink: 0 }}>區域：</strong>
                            <Select
                                showSearch
                                size="large"
                                defaultValue={regionSelect}
                                onChange={(value) => setRegionSelect(value)}
                                style={{ width: "100%" }}
                                options={regionOptions}
                            />
                        </div>
                    </Col>
                    <Col xl={6} md={6} xs={24}>
                        <Button
                            icon={<SearchOutlined />}
                            size="large"
                            style={{
                                width: "100%",
                            }}
                            onClick={() => getData()}
                        >
                            Search
                        </Button>
                    </Col>
                </Row>
                <div ref={elementRef}> {cardHtml}</div>
            </Spin>
        </>
    );
};

export default WeatherPage;
