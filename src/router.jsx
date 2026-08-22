import Can1APage from "./pages/hiyori/can1a/page";
import Can1BPage from "./pages/hiyori/can1b/page";
import Can2APage from "./pages/hiyori/can2a/page";
import Can2BPage from "./pages/hiyori/can2b/page";
import Can3APage from "./pages/hiyori/can3a/page";
import Can3BPage from "./pages/hiyori/can3b/page";

const router = [

    {
        path: '/hiyori/can1a',
        element: <Can1APage />
    },
    {
        path: '/hiyori/can1b',
        element: <Can1BPage />
    },
    {
        path: '/hiyori/can2a',
        element: <Can2APage />
    },
    {
        path: '/hiyori/can2b',
        element: <Can2BPage />
    },
    {
        path: '/hiyori/can3a',
        element: <Can3APage />
    },
    {
        path: '/hiyori/can3b',
        element: <Can3BPage />
    }
];

export default router;

