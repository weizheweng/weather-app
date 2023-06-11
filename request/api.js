// 使用非同步函式 fetchApi 來處理 HTTP 請求
export async function fetchConfig() {
    try {
        const response = await fetch("/api/config");
        if (!response.ok) {
            throw new Error("Failed to fetch config");
        }
        const config = await response.json();
        return config;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function fetchApi(url, method, data = null) {
    try {
        const options = {
            method: method.toUpperCase(),
        };

        // 根據請求方法決定將資料添加為查詢參數或請求主體
        if (data) {
            if (options.method === "GET" || options.method === "HEAD") {
                // 將資料添加為查詢參數
                const queryParams = new URLSearchParams(data).toString();
                url += "?" + queryParams;
            } else {
                // 將資料添加到請求主體中
                options.body = JSON.stringify(data);
            }
        }
        // console.log(url);
        // 發送請求
        const response = await fetch(url, options);

        // 檢查請求是否成功
        if (!response.ok) {
            const error = new Error("網路回應不正確");
            error.status = response.status;
            error.statusText = response.statusText;
            throw error;
        }

        // 將回應解析為JSON
        return await response.json();
    } catch (error) {
        console.log(error);
        return {
            status: error.status || (response && response.status),
            statusText: error.statusText || (response && response.statusText),
        };
    }
}

//  取的相關資料
export async function getWeatherRecords(url, method, data) {
    return await fetchApi(url, method, data);
}
