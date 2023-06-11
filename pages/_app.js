import "@/styles/globals.css";
import { Layout } from "antd";
import { Provider } from "react-redux";
import Head from "next/head";
import AppHeader from "../components/AppHeader"; // 引入自訂的 AppHeader 元件
import AppContent from "../components/AppContent"; // 引入自訂的 AppContent 元件
import store from "../store"; // 引入 Redux store

const App = ({ Component, pageProps }) => {
    return (
        <Provider store={store}>
            {/* 使用 Redux Provider，將 store 傳遞給應用程式的所有元件 */}
            <Head>
                <link rel="icon" href="/icon.png" /> 
                <title>Weather</title>
            </Head>
            <Layout>
                <AppHeader />
                <AppContent>
                    <Component {...pageProps} />
                </AppContent>
            </Layout>
        </Provider>
    );
};

export default App;
