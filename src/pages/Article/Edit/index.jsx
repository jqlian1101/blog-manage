import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import { Form, Input, Select, Button, message } from 'antd';

import { articleService, tagService, categoryService } from 'src/services';

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

const isDelete = (newArr = [], source = []) => {
    return source.filter(item => !newArr.includes(item));
}

/**
 * 创建文章
 */
const CreateArticle = (props) => {
    // let smde = null;
    let tags = [];
    let categories = [];
    let initId = '';   // id存在，则为编辑，否则，创建

    // let cacheTags = [];     // 缓存已设置的标签，用以标记删除
    // let cacheCatetories = [];

    const [form] = Form.useForm();

    useEffect(() => {
        initMDEle();
        initData();
    }, [])

    const getId = () => {
        if (initId) return initId;
        return props.location.search ? searchParse(props.location.search).id : '';
    }

    // 重置markdown内容
    const initMDEle = () => {
        form.smde = getMarkedEle('contentTextarea')
    }
    const resetCont = (cont = '') => form.smde.value(cont);
    const getMDVal = () => form.smde.value();

    // 初始化数据
    const initData = async () => {
        const id = getId();
        if (id) {
            const res = await articleService.getArticleDetail({ id })
            if (!res || res.code !== 0) return;
            const { detail = {} } = res.data || {};
            initId = detail.id;

            resetCont(detail.content || '');

            const { tags = [], categories = [] } = detail;

            form.cacheTags = tags.map(item => item.id);
            form.cacheCatetories = categories.map(item => item.id);

            form.setFieldsValue({
                title: detail.title || '',
                keyword: detail.keyword || '',
                status: isNil(detail.status) ? '' : detail.status,
                summary: detail.summary || '',
                content: detail.content || '',
                tags: [...form.cacheTags],
                categories: [...form.cacheCatetories]
            })
        }
    }

    // 获取tags列表
    const { res: tagsRes } = useFetch(tagService.getTagList)
    if (tagsRes) {
        tags = tagsRes.data.result || []
    }

    // 获取tags列表
    const { res: categoryRes } = useFetch(categoryService.getList)
    if (categoryRes) {
        categories = categoryRes.data.result || []
    }

    /**
     * 点击换成后回调
     * 数据校验通过后执行
     */
    const onFinish = async (values) => {
        const content = getMDVal();
        const data = { ...values, content };

        data.tags = data.tags || [];
        data.categories = data.categories || [];

        // 编辑过程中删除的tag和category
        data.deleteTag = isDelete(data.tags, form.cacheTags);
        data.deleteCategory = isDelete(data.categories, form.cacheCatetories);

        // if (data.tags) data.tags = data.tags.join(',');
        // if (data.categories) data.categories = data.categories.join(',');

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
