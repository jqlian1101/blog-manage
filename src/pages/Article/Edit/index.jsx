import React from 'react';
import { Form, Input, Select, Button, message } from 'antd';

import articleService from 'src/services/article'
import { useFetch, useMarkd } from 'src/utils/hooks'

const { Option } = Select;

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
};

const validateMessages = {
    required: '必填',
};

/**
 * 创建文章
 */
const CreateArticle = () => {
    let smde = null;
    let tags = [{ id: 1, name: 1 }];

    // 获取tags列表
    const { response } = useFetch(articleService.getTagList)
    if (response) {
        tags = response.data.result
    }

    // 生成markdown实例
    const { marked } = useMarkd('contentTextarea')
    smde = marked

    /**
     * 点击换成后回调
     * 数据校验通过后执行
     */
    const onFinish = async (values) => {
        const content = smde.value();
        const data = { ...values, content }

        if (data.tags) data.tags = data.tags.join(',');
        if (data.category) data.category = data.category.join(',');

        const res = await articleService.createArticle({ ...data });
        if (res.code !== 0) return;
        message.success('创建成功');
    };

    return (
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item name={['title']} label="标题" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['keyword']} label="关键字" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['status']} label='发布状态' rules={[{ required: true }]}>
                <Select
                    placeholder="选择发布状态"
                >
                    <Option value="0">草稿</Option>
                    <Option value="1">发布</Option>
                </Select>
            </Form.Item>
            <Form.Item name={['tags']} label="标签" rules={[{ required: true }]}>
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
            <Form.Item name={['category']} label="分类" rules={[{ required: true }]}>
                <Select
                    allowClear
                    mode="multiple"
                    placeholder="请选择文章分类"
                >
                    {
                        [{ id: 1, name: 1 }].map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)
                    }
                </Select>
            </Form.Item>
            <Form.Item name={['summary']} label="描述" rules={[{ required: true }]}>
                <Input.TextArea />
            </Form.Item>
            <Form.Item label="文章内容" >
                <textarea id="contentTextarea" size="large" />
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: layout.labelCol.span }}>
                <Button type="primary" htmlType="submit">提交</Button>
            </Form.Item>
        </Form>
    );
};


export default CreateArticle;
