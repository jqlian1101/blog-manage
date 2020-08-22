import React from 'react';
import { withRouter } from 'react-router-dom'
import { Form, Select, Button, Col, Row } from 'antd';

import { isNil } from 'src/utils/util'
import { COMMENT_STATUS } from 'src/common/constant'

import styles from './index.module.scss';

const { Option } = Select;


const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

const SearchForm = (props) => {
    const [form] = Form.useForm();

    const handleSearchField = (obj = {}) => {
        const result = {};
        for (const [key, value] of Object.entries(obj)) {
            if (!isNil(value)) result[key] = value;
        }
        return result;
    }

    /**
     * 点击换成后回调
     * 数据校验通过后执行
     */
    const onFinish = (values) => {
        const searchRules = handleSearchField(values);
        props.onSearch(searchRules)
    };

    const resetFields = () => {
        form.resetFields();
        props.onSearch({})
    };

    return (
        <Form {...layout} form={form} name="searchForm" labelAlign="left" onFinish={onFinish} >
            <Row gutter={24}>
                <Col span={6} >
                    <Form.Item name={['status']} label="状态" >
                        <Select
                            placeholder="请选择评论状态"
                            allowClear
                        >
                            {
                                COMMENT_STATUS.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>)
                            }
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={6} >
                    <div className={styles.formBtn}>
                        <Button type="primary" htmlType="submit">Search</Button>
                        <Button type="primary" onClick={resetFields}>清空</Button>
                    </div>
                </Col>
            </Row>
        </Form>
    );
};

SearchForm.defaultProps = {
    onSearch: () => { }
}

export default withRouter(SearchForm);
