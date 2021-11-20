import "tailwindcss/tailwind.css";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <Component {...pageProps} />
      </DndProvider>
    </Provider>
  );
}

export default App;
