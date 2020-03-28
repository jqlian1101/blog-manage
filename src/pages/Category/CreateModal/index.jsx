import React, { useState } from 'react';
import { Input, Modal, message } from 'antd';

import { categoryService } from 'src/services'

const CreateModal = (props) => {
    const { visible, toggleVisible, onSuccessCb } = props;
    const [name, setName] = useState('');

    const handleCancel = () => {
        toggleVisible(false);
    }

    const handleOk = async () => {
        await categoryService.create({ name });
        message.success('创建成功');
        onSuccessCb();
        handleCancel();
    }

    const normalCenter = {
        textAlign: 'center',
        marginBottom: 20,
    };

    return (
        <Modal
            title="添加"
            visible={visible}
            onOk={handleOk}
            width="400px"
            onCancel={handleCancel}
        >
            <Input
                style={normalCenter}
                placeholder="请输入名称"
                value={name}
                onChange={e => setName(e.target.value)}
            />
        </Modal>
    )
}

CreateModal.defaultProps = {
    toggleVisible: () => { },
    onSuccessCb: () => { },
}

export default CreateModal;
