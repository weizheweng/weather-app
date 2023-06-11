import { Menu } from "antd";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { setMenuKey } from "../store/reducers";

const AppMenu = () => {
    const router = useRouter();
    const menuKey = useSelector((state) => state.menuKey.menuKey);
    const dispatch = useDispatch();
    const menuItem = [
        {
            key: "/weather",
            label: <Link href="/weather">天氣</Link>,
        },
    ];

    useEffect(() => {
        const { pathname, query } = router;
        dispatch(setMenuKey(pathname));
    }, [router]);

    const handleMenuClick = (e) => {
        dispatch(setMenuKey(e.key));
        router.push(e.key);
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
