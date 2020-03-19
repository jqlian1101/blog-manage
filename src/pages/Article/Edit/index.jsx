import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import { Form, Input, Select, Button, message } from 'antd';

import articleService from 'src/services/article'
import { useFetch } from 'src/utils/hooks'
import { searchParse, isNil } from 'src/utils/util'
import { getMarkedEle } from 'src/utils/markd';

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
const CreateArticle = (props) => {
    let smde = null;
    let tags = [];
    let categories = [];
    let initId = '';   // id存在，则为编辑，否则，创建


    const [form] = Form.useForm();

    const { fetchData } = useFetch(articleService.getArticleDetail, {}, false);

    useEffect(() => {
        smde = getMarkedEle('contentTextarea');
        initData();
    }, [])

    const getId = () => {
        if (initId) return initId;
        return props.location.search ? searchParse(props.location.search).id : '';
    }

    // 重置markdown内容
    const resetCont = (cont = '') => smde.value(cont);

    // 初始化数据
    const initData = async () => {
        const id = getId();
        if (id) {
            const res = await fetchData({ id })
            if (!res || res.code !== 0) return;
            const { detail = {} } = res.data || {};
            initId = detail.id;
            resetCont(detail.content || '');
            form.setFieldsValue({
                title: detail.title || '',
                keyword: detail.keyword || '',
                status: isNil(detail.status) ? '' : detail.status,
                summary: detail.summary || '',
                content: detail.content || ''
            })
        }
    }

    // 获取tags列表
    const { res: tagsRes } = useFetch(articleService.getTagList)
    if (tagsRes) {
        tags = tagsRes.data.result
    }

    // 获取tags列表
    const { res: categoryRes } = useFetch(articleService.getCategoryList)
    if (categoryRes) {
        categories = categoryRes.data.result
    }

    /**
     * 点击换成后回调
     * 数据校验通过后执行
     */
    const onFinish = async (values) => {
        const content = smde.value();
        const data = { ...values, content }

        if (data.tags) data.tags = data.tags.join(',');
        if (data.categorys) data.categorys = data.categorys.join(',');

        const res = await articleService.createArticle({ ...data, id: getId() });
        if (res.code !== 0) return;
        message.success('操作成功');
    };

    return (
        <Form {...layout} form={form} name="editArticleForm" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item name={['title']} label="标题" rules={[{ required: true }]}>
                <Input autoComplete='off' />
            </Form.Item>
            <Form.Item name={['keyword']} label="关键字" rules={[{ required: true }]}>
                <Input autoComplete='off' />
            </Form.Item>
            <Form.Item name={['status']} label='发布状态' rules={[{ required: true }]}>
                <Select
                    placeholder="选择发布状态"
                >
                    <Option value={0}>草稿</Option>
                    <Option value={1}>发布</Option>
                </Select>
            </Form.Item>
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
            <Form.Item name={['categorys']} label="分类">
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

export default withRouter(CreateArticle);
