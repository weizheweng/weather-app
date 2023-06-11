import "@/styles/globals.css";
import { Layout } from "antd";
import { Provider } from "react-redux";
import Head from "next/head";
import AppHeader from "../components/AppHeader";
import AppContent from "../components/AppContent";
import store from "../store";

const App = ({ Component, pageProps }) => {
    // const pageLoading = useSelector((state) => state.pageLoading.pageLoading);
    return (
        <Provider store={store}>
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
