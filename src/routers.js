import React from "react";

// import ArticleEdit from "./pages/Article/Edit";
// import ArticleList from "./pages/Article/List";
const ArticleEdit = React.lazy(() => import("./pages/Article/Edit"));
const ArticleList = React.lazy(() => import("./pages/Article/List"));

export const menuData = [
    {
        path: "/article",
        name: "博文",
        children: [
            {
                path: "/article/list",
                name: "博文管理",
                exact: true,
                component: () => <ArticleList />
            },
            {
                path: "/article/edit",
                name: "新建博文",
                exact: true,
                component: () => <ArticleEdit />
            }
        ]
    }
    // {
    //     name: "account",
    //     icon: "user",
    //     path: "/account",
    //     locale: "menu.account",
    //     children: [
    //         {
    //             path: "/account/settings",
    //             name: "settings",
    //             locale: "menu.account.settings",
    //             children: [
    //                 {
    //                     path: "/account/settings",
    //                     redirect: "/account/settings/base",
    //                     exact: true,
    //                     locale: "menu.account.settings"
    //                 },
    //                 {
    //                     path: "/account/settings/base",
    //                     exact: true,
    //                     locale: "menu.account.settings"
    //                 },
    //                 {
    //                     path: "/account/settings/personalLink",
    //                     exact: true,
    //                     locale: "menu.account.settings"
    //                 }
    //             ]
    //         }
    //     ]
    // }
];

export const routers = [
    {
        path: "/article/edit",
        name: "ArticleEdit",
        component: () => <ArticleEdit />,
        exact: true
        // title: "添加/修改"
    },
    {
        path: "/article/list",
        name: "博文管理",
        exact: true,
        component: () => <ArticleList />
    }
];
