import React, { useState } from 'react';
import { uniqueId } from 'lodash';

import ListTable from './Table'
import Search from './Search';

const key_s = '_comment_table_list_'

/**
 * 创建文章
 */
const CategoryIndex = () => {
    const [searchRules, setSearchRules] = useState({})
    const [tablekey, setTableKey] = useState(uniqueId(key_s))

    const onSearch = (rules) => {
        setSearchRules(rules);
    }

    const onRefresh = () => {
        setTableKey(uniqueId(key_s))
    }

    return (
        <div>
            <Search onSearch={onSearch} onRefresh={onRefresh} />
            <ListTable searchRules={searchRules} key={tablekey} />
        </div>
    );
};


export default CategoryIndex;
