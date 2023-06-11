import { useRouter } from "next/router";
import { useEffect } from "react";

const IndexPage = () => {
    const router = useRouter();

    useEffect(() => {
        router.replace("/weather");
    }, []);

    return null; // 或者可以顯示一個提示訊息等內容
};

export default IndexPage;
