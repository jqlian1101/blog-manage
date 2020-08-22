import React from 'react';
import { withRouter } from 'react-router-dom'
import { Form, Input, Select, Button, /* message, */ Col, Row } from 'antd';

import { isNil } from 'src/utils/util'

// import articleService from 'src/services/article'
// import { useFetch } from 'src/utils/hooks'

import styles from './index.module.scss';

const { Option } = Select;

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

/**
 * 创建文章
 */
const ArticleSearchForm = (props) => {
    // let tags = [];
    // let categories = [];

    const [form] = Form.useForm();

    // // 获取tags列表
    // const { res: tagsRes } = useFetch(articleService.getTagList)
    // if (tagsRes) {
    //     tags = tagsRes.data.result
    // }

    // // 获取tags列表
    // const { res: categoryRes } = useFetch(articleService.getCategoryList)
    // if (categoryRes) {
    //     categories = categoryRes.data.result
    // }

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

    const goEdit = () => props.history.push('/article/edit');

    return (
        <Form {...layout} form={form} name="articleSearchForm" labelAlign="left" onFinish={onFinish} >
            <Row gutter={24}>
                <Col span={6} >
                    <Form.Item name={['title']} label="标题" >
                        <Input autoComplete='off' allowClear />
                    </Form.Item>
                </Col>
                <Col span={6} >
                    <Form.Item name={['keyword']} label="关键字" >
                        <Input autoComplete='off' allowClear />
                    </Form.Item>
                </Col>
                <Col span={6} >
                    <Form.Item name={['status']} label='发布状态' >
                        <Select
                            placeholder="选择发布状态"
                            allowClear
                        >
                            <Option value={0}>草稿</Option>
                            <Option value={1}>发布</Option>
                        </Select>
                    </Form.Item>
                </Col>
                {/* <Col span={8} >
                    <Form.Item name={['tags']} label="标签" >
                        <Select
                            allowClear
                            mode="multiple"
                            placeholder="请选择文章标签"
                        >
                            {
                                tags.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)
                            }
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8} >
                    <Form.Item name={['categories']} label="分类">
                        <Select
                            allowClear
                            mode="multiple"
                            placeholder="请选择文章分类"
                        >
                            {
                                categories.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)
                            }
                        </Select>
                    </Form.Item>
                </Col> */}
                <Col span={6} >
                    <div className={styles.formBtn}>
                        <Button type="primary" htmlType="submit">Search</Button>
                        <Button type="primary" onClick={resetFields}>清空</Button>
                        <Button type="primary" onClick={goEdit}>新建</Button>
                    </div>
                </Col>
            </Row>
        </Form>
    );
};

ArticleSearchForm.defaultProps = {
    onSearch: () => { }
}

export default withRouter(ArticleSearchForm);
