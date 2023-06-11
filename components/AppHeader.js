import { Layout, Row, Col } from "antd";
import Image from "next/image";
import AppMenu from "./AppMenu";
const { Header } = Layout;

const AppHeader = () => {
    return (
        <Header
            style={{
                position: "fixed",
                height: 64,
                width: "100%",
                zIndex: 3000,
            }}
        >
            <Row gutter={[10, 10]} align="middle">
                <Col xl={4} md={4} xs={4} align="center">
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Image src="/weather.svg" alt="logo" width={32} height={32} />
                    </div>
                </Col>
                <Col xl={6} md={14} xs={14} align="left">
                    <div style={{ color: "white", fontSize: 22, fontWeight: "bold", marginLeft: 15 }}>Weather App</div>
                </Col>
                <Col xl={14} md={6} xs={6} align="center">
                    <AppMenu />
                </Col>
            </Row>
        </Header>
    );
};

export default AppHeader;
