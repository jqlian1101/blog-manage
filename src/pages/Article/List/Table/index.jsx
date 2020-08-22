import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'
import { Table, Divider, message } from 'antd';

import { articleService } from 'src/services'

import { ARTICLE_STATUS } from 'src/common/constant'
import { usePagination } from 'src/utils/hooks';


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

const ArticleList = (props) => {
    const { title, keyword, status } = props.searchRules;

    const [fetching, setFetching] = useState(false);
    const [tableData, setTableData] = useState([]);
    const { pagination } = usePagination();

    const { onChange: onPaginationChange, current, pageSize, total } = pagination;

    React.useEffect(() => {
        resetTableData();
    }, [title, keyword, status])

    const resetTableData = async ({ size = pageSize, cur = current } = {}) => {
        setFetching(true);
        const res = await articleService.getArticleList({ ...props.searchRules, pageSize: size, current: cur })
        handleResData(res)
    }

    const handleResData = (res) => {
        if (!res || res.code !== 0) return;
        const { result, count, pageSize, current } = res.data || {}
        setTableData(result);
        setFetching(false);
        onPaginationChange(current, pageSize, count)
    }

    const editArticle = (row) => {
        props.history.push({
            pathname: `/article/edit`,
            search: `?id=${row.id}`
        })
    }

    const changeArticleStatus = async (bool, row) => {
        const res = await articleService.setArticleStatus({ id: row.id, status: bool })
        if (!res || res.code !== 0) return;
        message.success('操作成功');
        resetTableData();
    }

    const delArticle = async (row) => {
        const res = await articleService.deleteArticle({ id: row.id });
        if (!res || res.code !== 0) return;
        message.success('操作成功');
        resetTableData();
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
                                <a onClick={() => { changeArticleStatus(1, row) }}>发布</a> :
                                <a onClick={() => { changeArticleStatus(0, row) }}>取消发布</a>
                        }
                        <Divider type="vertical" />
                        <a onClick={() => delArticle(row)}>删除</a>
                    </div>
                )
            }
        }
    ]

    const handleTableChange = (page) => {
        resetTableData({ size: page.pageSize, cur: page.current });
    }

    const tablePagCfg = {
        current,
        pageSize,
        total,
        hideOnSinglePage: true, // 只有一页时是否隐藏分页器
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: () => `共${total}页`,
        onChange: (page, pageSize) => handleTableChange({ current: page, pageSize })
    };

    return (
        <Table
            columns={tableColumns}
            rowKey={record => record.id}
            dataSource={tableData}
            pagination={tablePagCfg}
            loading={fetching}
        />
    )
};

ArticleList.defaultProps = {
    searchRules: {}
}

export default withRouter(ArticleList);
