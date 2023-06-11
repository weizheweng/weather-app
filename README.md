# Weather App

This is a weather application built with Next.js, using data from the Central Weather Bureau API to display weather information for various regions.

## Getting Started

To get a local copy of this project, follow these steps:

1. Clone the repository to your local machine:
git clone https://github.com/weizheweng/weather-app.git

2. Change into the project directory:
cd weather-app

3. Install the dependencies using npm:
npm install

## Configuration

Before running the application, you need to configure the API credentials. Follow these steps:

1. Create a `.env.local` file in the project root directory.

2. Add the following environment variables to the `.env.local` file:
NEXT_PUBLIC_API_KEY=your-api-key


Replace `your-api-key` with your actual API key obtained from the Central Weather Bureau API.

## API Documentation

For detailed documentation of the Central Weather Bureau API, please refer to the [API Swagger Documentation](https://opendata.cwb.gov.tw/dist/opendata-swagger.html). This documentation provides examples and descriptions of the available endpoints and data formats.

## Running the Application

To start the application in development mode, use the following command:
npm run dev

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Building and Deployment

To build the application for production, run the following command:
npm run build

This will generate an optimized build of your app in the `out` directory.

To deploy the app to a hosting platform, refer to their documentation for specific deployment instructions.
## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
