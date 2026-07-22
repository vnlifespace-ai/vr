import { RouterProvider, createBrowserRouter } from "react-router";
import router from "../router";

function App() {
    const browserRouter = createBrowserRouter(router)
    return (
        <RouterProvider router={browserRouter} />
    )
}

export default App