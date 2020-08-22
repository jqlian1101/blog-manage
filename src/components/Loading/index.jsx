import React from 'react';

import { Spin } from 'antd';

import styles from './index.module.scss';

/**
 * 全局Loading
 */
const Loading = () => {
    return (
        <div className={styles.root}>
            <Spin size="large" />
        </div>
    );
};


export default Loading;
