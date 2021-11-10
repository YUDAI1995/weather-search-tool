import Head from "next/head";
import Weather from "../components/Weather";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Weather Application</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20">
        <h1 className="text-4xl font-bold mb-4">Weather Application</h1>
        <Weather />
      </main>

      <footer className="flex items-center justify-center w-full h-20 bg-gray-200">
        <div>
          <small>&copy; 2021 YUDAI1995</small>
        </div>
      </footer>
    </div>
  );
};

export default Home;
