import React from "react";

import ArticleEdit from "./pages/Article/Edit";

export const routers = [
    {
        path: "/",
        name: "ArticleEdit",
        component: () => <ArticleEdit />,
        exact: false,
        // title: "添加/修改"
    }
];
