import React from 'react';
import { withRouter } from 'react-router-dom'
import { Table, Divider } from 'antd';

import { ARTICLE_STATUS } from 'src/common/constant'
import articleService from 'src/services/article'
import { usePagination, useFetch } from 'src/utils/hooks';

const columns = [
    {
        title: '标题',
        dataIndex: 'title',
    },
    {
        title: '关键字',
        dataIndex: 'keyword',
    },
    {
        title: '发布状态',
        dataIndex: 'status',
        render: (text) => {
            const status = ARTICLE_STATUS.find(item => item.id === text);
            return status ? status.name : '';
        }
    },
    {
        title: '创建时间',
        dataIndex: 'createDate',
    },
    {
        title: '最后更新时间',
        dataIndex: 'updateDate',
    }
];

let tableData = [];

const ArticleList = (props) => {
    const { pagination } = usePagination();
    const { onChange: onPaginationChange, current, pageSize, total } = pagination;

    React.useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { res, fetching, fetchData } = useFetch(articleService.getArticleList, { pageSize: 1, current }, false);

    const getData = async ({ size = pageSize, cur = current } = {}) => {
        await fetchData({ pageSize: size, current: cur });
    }

    const handleResData = (res, fetching) => {
        if (!res || !fetching) return;
        const { result, count, pageSize, current } = res.data || {}
        tableData = result;
        onPaginationChange(current, pageSize, count)

    }

    handleResData(res, fetching)

    const editArticle = (row) => {
        props.history.push({
            pathname: `/article/edit`,
            search: `?id=${row.id}`
        })
    }

    const changeArticleStatus = (bool, row) => {
        console.log(bool, row);
    }

    const delArticle = (row) => {
        console.log(row);
    }

    const tableColumns = [
        ...columns,
        {
            title: '操作',
            dataIndex: 'operation',
            width: 200,
            render: (txt, row) => {
                const { status } = row;
                return (
                    <div className="noselect">
                        <a onClick={() => editArticle(row)}>编辑</a>
                        <Divider type="vertical" />
                        {
                            status === 0 ?
                                <a onClick={() => { changeArticleStatus(true, row) }}>发布</a> :
                                <a onClick={() => { changeArticleStatus(false, row) }}>取消发布</a>
                        }
                        <Divider type="vertical" />
                        <a onClick={() => delArticle(row)}>删除</a>
                    </div>
                )
            }
        }
    ]

    const handleTableChange = (page) => {
        getData({ size: page.pageSize, cur: page.current });
    }

    const tablePagCfg = {
        current,
        pageSize,
        total,
        // hideOnSinglePage: true, // 只有一页时是否隐藏分页器
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: () => `共${total}页`
    };

    return (
        <Table
            columns={tableColumns}
            rowKey={record => record.id}
            dataSource={tableData}
            pagination={tablePagCfg}
            loading={fetching}
            onChange={handleTableChange}
        />
    )
};

export default withRouter(ArticleList);
