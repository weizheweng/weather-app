import { Layout } from "antd";
import { useEffect, useState } from "react";

const { Content } = Layout;

const useWindowHeight = () => {
    const [windowHeight, setWindowHeight] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight - 64);
        };

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return windowHeight;
};

const AppContent = ({ children }) => {
    const windowHeight = useWindowHeight();
    return (
        <Content style={{ padding: "30px", minHeight: windowHeight, background: "#fff", color: "black", marginTop: 64 }}>
            {children}
        </Content>
    );
    return;
};

export default AppContent;
