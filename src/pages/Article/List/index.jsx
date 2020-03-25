import React, { useState } from 'react';

import ListTable from './Table'
import Search from './Search';

/**
 * 创建文章
 */
const ArticleList = () => {
    let [searchRules, setSearchRules] = useState({})

    const onSearch = (rules) => {
        setSearchRules(rules);
    }

    return (
        <div>
            <Search onSearch={onSearch} />
            <ListTable searchRules={searchRules} />
        </div>
    );
};


export default ArticleList;
