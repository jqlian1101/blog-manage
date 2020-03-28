import React, { useState } from 'react';
import { Input, Modal, message } from 'antd';

import { tagService } from 'src/services'

const CreateTagModal = (props) => {
    const { visible, toggleVisible, onSuccessCb } = props;
    const [name, setName] = useState('');

    const handleCancel = () => {
        toggleVisible(false);
    }

    const handleOk = async () => {
        await tagService.createTag({ name });
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
            title="添加标签"
            visible={visible}
            onOk={handleOk}
            width="600px"
            onCancel={handleCancel}
        >
            <Input
                style={normalCenter}
                placeholder="请输入标签名"
                value={name}
                onChange={e => setName(e.target.value)}
            />
        </Modal>
    )
}

CreateTagModal.defaultProps = {
    toggleVisible: () => { },
    onSuccessCb: () => { },
}

export default CreateTagModal;
