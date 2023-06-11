import { Layout, Space } from "antd";
import Image from "next/image";
import styled from "styled-components";
import AppMenu from "./AppMenu";
const { Header } = Layout;

const HeaderStyle = { color: "white", fontSize: 22, fontWeight: "bold", marginLeft: 15 };

const AppHeader = () => {
    return (
        <Header
            style={{
                position: "fixed",
                height: 64,
                width: "100%",
                zIndex: 3000,
                paddingInline: 20,
            }}
        >
            <Space size={10}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Image src="/weather.svg" alt="logo" width={32} height={32} />
                </div>
                <div style={HeaderStyle}>Weather App</div>
                <div style={HeaderStyle}>
                    <AppMenu />
                </div>
            </Space>
        </Header>
    );
};

export default AppHeader;
