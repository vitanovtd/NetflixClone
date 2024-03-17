import { createRoot } from "react-dom/client";
import { Provider as StateProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { routerInstance } from "./routes";
import store from "./db/store";
import "./styles/style.css";

const rootNode = document.getElementById("root");
const root = createRoot(rootNode);
root.render(
    <StateProvider store={store}>
        <RouterProvider router={routerInstance} />
    </StateProvider>
);
