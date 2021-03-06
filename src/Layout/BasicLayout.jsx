import React from 'react';
import { Layout } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';

import SiderMenu from 'src/components/SiderMenu';
import { isLogin } from 'src/common/utils';

import './BasicLayout.scss';

import routers from 'src/routers';


const { Header, Content } = Layout;

class LayoutComponent extends React.Component {
    state = {
        collapsed: false,
    };

    componentDidMount () {
        if (!isLogin()) window.location.href = '/';
    }

    /**
     * @this
     * @memberof LayoutComponent
     */
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render () {
        return (
            <Layout className="layout-container">
                <div className='noselect'>
                    <SiderMenu
                        logo='Blog'
                        theme='light'
                        collapsed={this.state.collapsed}
                        onCollapse={this.handleMenuCollapse}
                        menuData={routers.menuData}
                        className="noselect"
                        {...this.props}
                    />
                </div>

                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {
                            React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: this.toggle,
                            })
                        }
                    </Header>
                    <Content className="site-layout-background content">
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default LayoutComponent
