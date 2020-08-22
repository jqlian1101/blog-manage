import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'
import { Form, Input, Button, Col, Row } from 'antd';

import { isNil } from 'src/utils/util'

import styles from './index.module.scss';

import CreateTagModal from '../CreateModal';

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

/**
 * 创建文章
 */
const TagSearchForm = (props) => {
    const [form] = Form.useForm();
    const [createTagModalVisible, setCreateTagModalVisible] = useState(false);

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

    const toggleCreateTagModalVisible = (bool) => {
        setCreateTagModalVisible(bool);
    }

    const onRefresh = () => {
        props.onRefresh();
    }

    return (
        <>
            <Form {...layout} form={form} name="tagSearchForm" labelAlign="left" onFinish={onFinish} >
                <Row gutter={24}>
                    <Col span={6} >
                        <Form.Item name={['name']} label="标签名" >
                            <Input autoComplete='off' allowClear />
                        </Form.Item>
                    </Col>
                    <Col span={6} >
                        <div className={styles.formBtn}>
                            <Button type="primary" htmlType="submit">Search</Button>
                            <Button type="primary" onClick={resetFields}>清空</Button>
                            <Button type="primary" onClick={() => toggleCreateTagModalVisible(true)}>新建</Button>
                        </div>
                    </Col>
                </Row>
            </Form>
            <CreateTagModal visible={createTagModalVisible} toggleVisible={toggleCreateTagModalVisible} onSuccessCb={onRefresh} />
        </>
    );
};

TagSearchForm.defaultProps = {
    onSearch: () => { }
}

export default withRouter(TagSearchForm);
