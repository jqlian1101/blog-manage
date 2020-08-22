import React from 'react';
import { useHistory } from 'react-router-dom'
import { Form, Input, Button } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';

import { userService } from 'src/services'
import { TOKEN_LOCATIONSTORAGE } from 'src/common/constant';
import { clearUserToken } from 'src/common/utils';
import styles from './index.module.scss';

const FormItem = Form.Item;

const Login = () => {
    const history = useHistory();
    const [form] = Form.useForm();

    React.useEffect(() => {
        clearUserToken();
    }, [])

    /**
     *  登录
     */
    const loginFetch = async (values) => {
        const res = await userService.userLogin(values);
        if (res.code !== 0) return;
        const { data: { token } } = res;

        if (!token) return;
        window.localStorage.setItem(TOKEN_LOCATIONSTORAGE, token);
        history.replace('/article/list');
    }

    const onFinish = (values) => loginFetch(values);

    const handleSubmit = async () => {
        const values = await form.validateFields();
        loginFetch(values)
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.container}>
                <h2 className={styles.title}>后台管理系统</h2>
                <Form form={form} className={styles.loginForm} initialValues={{}} onFinish={onFinish}>
                    <FormItem name="userName" rules={[{
                        required: true,
                        message: '用户名不能为空',
                    }]} >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="请输入用户名"
                            onPressEnter={handleSubmit}
                            allowClear
                        />
                    </FormItem>
                    <FormItem name="password" rules={[{
                        required: true,
                        message: '密码不能为空',
                    }]} >
                        <Input
                            prefix={<UnlockOutlined />}
                            type="password"
                            placeholder="请输入密码"
                            onPressEnter={handleSubmit}
                            allowClear
                        />
                    </FormItem>
                    <FormItem style={{ textAlign: 'center' }}>
                        <Button type="primary" onClick={handleSubmit} className={styles.button}>登录</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    );
}


export default Login;
