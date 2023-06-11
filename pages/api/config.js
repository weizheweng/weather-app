export default function handler(req, res) {
    const { REQUEST_URL, AUTHORIZATION_KEY } = process.env;

    const config = {
        requestUrl: REQUEST_URL,
        authorizationKey: AUTHORIZATION_KEY,
    };

    res.status(200).json(config);
}
