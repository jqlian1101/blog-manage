// import React from "react";
import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { isLogin } from 'src/common/utils'
import Loading from 'src/components/Loading'

import Layout from "./Layout/BasicLayout";
import routers from "./routers";

const Login = React.lazy(() => import("./pages/Login"));

const App = () => {
    let redirectUrl = '/login';
    if (isLogin()) redirectUrl = '/article/list'

    return (
        <Suspense fallback={<Loading />}>
            <Switch>
                <Redirect exact from="/" to={redirectUrl} />
                <Route
                    exact={true}
                    path='/login'
                    component={Login}
                />
                <Layout>
                    {routers.routers.map((item, index) => {
                        return (
                            <Route
                                key={index}
                                exact={item.exact}
                                path={item.path}
                                render={() => {
                                    item.title &&
                                        (window.document.title = item.title);
                                    return item.component();
                                }}
                            />
                        );
                    })}
                </Layout>
            </Switch>
        </Suspense>
    );
};

export default App;
