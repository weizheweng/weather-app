import { Layout, Space } from "antd"; 
import Image from "next/image";
import AppMenu from "./AppMenu"; 
const { Header } = Layout;

const HeaderStyle = { color: "white", fontSize: 22, fontWeight: "bold", marginLeft: 15 }; // Header 的樣式設定

const AppHeader = () => {
    return (
        <Header
            style={{
                position: "fixed", // 固定在頁面上方
                height: 64, // 設定 Header 的高度
                width: "100%", // 設定 Header 的寬度
                zIndex: 3000, // 設定疊放順序（z-index）
                paddingInline: 20, // 設定水平方向的內邊距
            }}
        >
            <Space size={10}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Image src="/weather.svg" alt="logo" width={32} height={32} /> {/* 顯示 logo 圖片 */}
                </div>
                <div style={HeaderStyle}>Weather App</div> {/* 顯示標題 */}
                <div style={HeaderStyle}>
                    <AppMenu /> {/* 顯示應用程式選單 */}
                </div>
            </Space>
        </Header>
    );
};

export default AppHeader;
