import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'
import { Table, message, Divider } from 'antd';

import { COMMENT_STATUS } from 'src/common/constant'

import { commentService } from 'src/services'
import { usePagination } from 'src/utils/hooks';

const columns = [
    {
        title: 'id',
        dataIndex: 'id',
    },
    {
        title: '文章标题',
        dataIndex: 'topicTitle',
    },
    {
        title: '评论内容',
        dataIndex: 'content',
    },
    {
        title: '状态',
        dataIndex: 'status',
        render: (value) => {
            return COMMENT_STATUS.find(item => item.id === value).name
        }
    },
    {
        title: '赞',
        dataIndex: 'likeNum',
    },
    {
        title: '回复',
        dataIndex: 'replyNum',
    },
    {
        title: '评论者',
        dataIndex: 'fromUid',
    },
    {
        title: '评论时间',
        dataIndex: 'createDate',
        width: 200
    },
];

const TableList = (props) => {
    const { status: searchStatus } = props.searchRules;

    const [fetching, setFetching] = useState(false);
    const [tableData, setTableData] = useState([]);
    const { pagination } = usePagination();

    const { onChange: onPaginationChange, current, pageSize, total } = pagination;

    React.useEffect(() => {
        resetTableData();
    }, [searchStatus])

    const resetTableData = async ({ size = pageSize, cur = current } = {}) => {
        setFetching(true);
        const res = await commentService.getList({ ...props.searchRules, pageSize: size, current: cur })
        handleResData(res)
    }

    const handleResData = (res) => {
        if (!res) return;
        const { result = [], count = 0, pageSize = 10, current = 1 } = res.data || {}
        setTableData(result);
        setFetching(false);
        onPaginationChange(current, pageSize, count)
    }

    /**
     * 删除评论
     */
    const delFn = async (row) => {
        await commentService.del({ id: row.id })
        message.success('操作成功');
        resetTableData();
    }

    /**
     * 修改发布状态
     */
    const resetStatus = async (row) => {
        await commentService.resetStatus({ id: row.id, status: row.status === 0 ? 1 : 0 })
        message.success('操作成功');
        resetTableData();
    }

    const tableColumns = [
        ...columns,
        {
            title: '操作',
            dataIndex: 'operation',
            width: 200,
            fixed: 'right',
            render: (txt, row) => {
                const { status } = row;
                // status: 0:待审核，1:已发布
                const isPublic = status === 1;

                return (
                    <div className="noselect">
                        <a onClick={() => delFn(row)}>删除</a>
                        <Divider type="vertical" />
                        <a onClick={() => resetStatus(row)}>{isPublic ? '取消发布' : '发布'}</a>
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
            scroll={{ x: 'max-content' }}
        />
    )
};

TableList.defaultProps = {
    searchRules: {}
}

export default withRouter(TableList);
