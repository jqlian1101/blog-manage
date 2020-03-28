// import React from "react";
import React, { Suspense } from "react";

import { Route, Switch } from "react-router-dom";

import Layout from "./Layout/BasicLayout";
import routers from "./routers";

const App = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
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
