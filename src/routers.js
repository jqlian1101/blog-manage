import React from "react";

import Index from "./pages/App";

export const routers = [
    {
        path: "/",
        name: "Index",
        component: () => <Index />,
        exact: false,
        title: "Index"
    }
];
