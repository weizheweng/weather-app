import { Layout } from "antd"; 
import { useEffect, useState } from "react"; 

const { Content } = Layout; 

const useWindowHeight = () => {
    const [windowHeight, setWindowHeight] = useState(0); // 視窗高度狀態

    useEffect(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight - 64); // 調整視窗高度並減去 Header 的高度（64）
        };

        window.addEventListener("resize", handleResize); // 監聽視窗大小改變事件

        handleResize(); // 初始化視窗高度

        return () => {
            window.removeEventListener("resize", handleResize); // 移除事件監聽器
        };
    }, []);

    return windowHeight; 
};

const AppContent = ({ children }) => {
    const windowHeight = useWindowHeight(); // 使用自訂的 useWindowHeight hook 取得視窗高度
    return (
        <Content style={{ padding: "15px", minHeight: windowHeight, background: "#fff", color: "black", marginTop: 64 }}>
            {children}
        </Content>
    );
};

export default AppContent;
