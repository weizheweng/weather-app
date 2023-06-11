import { Button, Row, Col, Select, Spin } from "antd"; 
import { SearchOutlined } from "@ant-design/icons"; 
import { useState, useEffect, useRef } from "react"; 
import { useDispatch } from "react-redux"; // 引入 Redux 的 useDispatch hook
import anime from "animejs"; // 引入 anime.js 動畫庫
import dayjs from "dayjs"; 
import { setWeatherData } from "../store/reducers"; // 引入 Redux action
import WeatherCard from "../components/WeatherCard"; // 引入自訂的 WeatherCard 元件
import * as request from "../request/api"; // 引入自訂的 API 請求函式

const authorizationKey = process.env.NEXT_PUBLIC_AUTHORIZATION_KEY; // 取得環境變數授權金鑰
const requestUrl = process.env.NEXT_PUBLIC_REQUEST_URL; // 取得環境變數請求 URL

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
]; // 台灣所有縣市的array

const WeatherPage = () => {
    const elementRef = useRef(null);
    const [regionOptions, setRegionOptions] = useState([]); // 區域選項狀態
    const [regionSelect, setRegionSelect] = useState(regionData[0]); // 選擇的區域
    const [cardHtml, setCardHtml] = useState(); // 天氣卡片內容狀態
    const [pageLoading, setPageLoading] = useState(false); // 頁面載入狀態
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
        // 請求中央氣象局API
        const returnData = await request.getWeatherRecords(requestUrl, "GET", {
            Authorization: authorizationKey,
            locationName: regionSelect,
            elementName: "T,Wx,MaxT,MinT,PoP12h,WS",
        });

        let tempWeatherDate = {};
        // 解析回傳值，並製作成相對應的資料結構
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
            // 實現loading的效果
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
