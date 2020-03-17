import React from "react";

import ArticleEdit from "./pages/Article/Edit";

export const menuData = [
    {
        path: "/article",
        name: "博文",
        children: [
            {
                path: "/article/create",
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
        path: "/article/create",
        name: "ArticleEdit",
        component: () => <ArticleEdit />,
        exact: true
        // title: "添加/修改"
    }
];
