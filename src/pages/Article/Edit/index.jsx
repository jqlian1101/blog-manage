import React, { useEffect } from 'react';
import { Form, Input, Select, Button } from 'antd';

import SimpleMDE from 'simplemde'
import marked from 'marked'
import highlight from 'highlight.js'
import 'simplemde/dist/simplemde.min.css';

import articleService from 'src/services/article'
import { useFetch } from 'src/utils/hooks'

// import styles from './index.module.scss';

const { Option } = Select;

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
};

const validateMessages = {
    required: '必填',
};

const CreateArticle = () => {
    let smde = null;
    let tags = [];


    const { response, error } = useFetch(articleService.getTagList)
    console.log('useFetch response : ', response, error)
    if (response) {
        tags = response.data.result
    }

    const onFinish = values => {
        console.log(values);
        console.log(smde.value())
    };

    useEffect(() => {
        smde = new SimpleMDE({
            element: document.getElementById('contentTextarea'),
            autofocus: true,
            autosave: true,
            previewRender(plainText) {
                return marked(plainText, {
                    renderer: new marked.Renderer(),
                    gfm: true,
                    pedantic: false,
                    sanitize: false,
                    tables: true,
                    breaks: true,
                    smartLists: true,
                    smartypants: true,
                    highlight(code) {
                        return highlight.highlightAuto(code).value;
                    },
                });
            },
        })
    }, []);

    return (
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item name={['user', 'title']} label="标题" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['user', 'keyword']} label="关键字" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['user', 'status']} label='发布状态' rules={[{ required: true }]}>
                <Select
                    placeholder="选择发布状态"
                >
                    <Option value="0">草稿</Option>
                    <Option value="1">发布</Option>
                </Select>
            </Form.Item>
            <Form.Item name={['user', 'tags']} label="标签" rules={[{ required: true }]}>
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
            <Form.Item name={['user', 'category']} label="分类" rules={[{ required: true }]}>
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
            <Form.Item name={['user', 'introduction']} label="描述" rules={[{ required: true }]}>
                <Input.TextArea />
            </Form.Item>

            <Form.Item label="文章内容" >
                <textarea id="contentTextarea" size="large" />
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">提交</Button>
            </Form.Item>
        </Form>
    );
};


export default CreateArticle;
