import { Menu } from "antd";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { setMenuKey } from "../store/reducers";

const AppMenu = () => {
    const router = useRouter(); // 獲取路由資訊
    const menuKey = useSelector((state) => state.menuKey.menuKey); // 從 Redux store 中取得 menuKey 狀態值
    const dispatch = useDispatch(); // 建立 dispatch 函式的參考
    const menuItem = [
        {
            key: "/weather",
            label: <Link href="/weather">天氣</Link>, // 設定連結到天氣頁面的標籤
        },
    ];

    useEffect(() => {
        const { pathname, query } = router;
        dispatch(setMenuKey(pathname)); // 設定 menuKey 的值為當前頁面的路徑
    }, [router]);

    const handleMenuClick = (e) => {
        dispatch(setMenuKey(e.key)); // 設定 menuKey 的值為選中的鍵值
        router.push(e.key); // 導航到選中的頁面
    };

    return (
        <Menu
            onClick={handleMenuClick}
            mode="horizontal"
            theme="dark"
            defaultSelectedKeys={["/weather"]}
            selectedKeys={[menuKey]}
            items={menuItem}
        />
    );
};

export default AppMenu;
