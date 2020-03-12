import React from 'react';
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';

import './BasicLayout.scss';

const { Header, Sider, Content } = Layout;

class LayoutComponent extends React.Component {
    state = {
        collapsed: false,
    };

    /**
     * @this
     * @memberof LayoutComponent
     */
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Layout className="layout-container">
                <Sider trigger={null} collapsible collapsed={this.state.collapsed} theme="light">
                    <div className="logo">
                        {
                            this.state.collapsed ? 'Blog' : 'Blog管理后台'
                        }
                    </div>
                    <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <UserOutlined />
                            <span>nav 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <VideoCameraOutlined />
                            <span>nav 2</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <UploadOutlined />
                            <span>nav 3</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                        })}
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
