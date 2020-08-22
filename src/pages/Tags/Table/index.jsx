import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'
import { Table, message } from 'antd';

import { tagService } from 'src/services'
import { usePagination } from 'src/utils/hooks';

const columns = [
    {
        title: '名称',
        dataIndex: 'name',
    },
    {
        title: '创建时间',
        dataIndex: 'createDate',
    },
];

const TableList = (props) => {
    const { name: searchName } = props.searchRules;

    const [fetching, setFetching] = useState(false);
    const [tableData, setTableData] = useState([]);
    const { pagination } = usePagination();

    const { onChange: onPaginationChange, current, pageSize, total } = pagination;

    React.useEffect(() => {
        resetTableData();
    }, [searchName])

    const resetTableData = async ({ size = pageSize, cur = current } = {}) => {
        setFetching(true);
        const res = await tagService.getTagList({ ...props.searchRules, pageSize: size, current: cur })
        handleResData(res)
    }

    const handleResData = (res) => {
        if (!res) return;
        const { result = [], count = 0, pageSize = 10, current = 1 } = res.data || {}
        setTableData(result);
        setFetching(false);
        onPaginationChange(current, pageSize, count)
    }

    const delTag = async (row) => {
        await tagService.deleteTag({ id: row.id })
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
                return (
                    <div className="noselect">
                        <a onClick={() => delTag(row)}>删除</a>
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

TableList.defaultProps = {
    searchRules: {}
}

export default withRouter(TableList);
