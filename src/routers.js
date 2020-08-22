import React from "react";

// import ArticleEdit from "./pages/Article/Edit";
// import ArticleList from "./pages/Article/List";

const ArticleEdit = React.lazy(() => import("./pages/Article/Edit"));
const ArticleList = React.lazy(() => import("./pages/Article/List"));

const Tags = React.lazy(() => import("./pages/Tags"));
const Category = React.lazy(() => import("./pages/Category"));

const Comment = React.lazy(() => import("./pages/Messages/Comment"));
const Replies = React.lazy(() => import("./pages/Messages/Replies"));

const menuData = [
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
    },
    {
        path: "/tags",
        name: "标签",
        children: [
            {
                path: "/tags/list",
                name: "标签管理",
                exact: true,
                component: () => <Tags />
            }
        ]
    },
    {
        path: "/category",
        name: "分类",
        children: [
            {
                path: "/category/list",
                name: "分类管理",
                exact: true,
                component: () => <Category />
            }
        ]
    },
    {
        path: "/messages",
        name: "留言",
        children: [
            {
                path: "/messages/comment",
                name: "评论管理",
                exact: true,
                component: () => <Comment />
            },
            {
                path: "/messages/replies",
                name: "评论回复",
                exact: true,
                component: () => <Replies />
            }
        ]
    }
];

const routers = [];

const initRouters = (r = []) => {
    r.map(item => {
        if (item.component) routers.push(item);
        if (Array.isArray(item.children)) {
            initRouters(item.children);
        }
    });
};

initRouters(menuData);

export default {
    menuData,
    routers
};
