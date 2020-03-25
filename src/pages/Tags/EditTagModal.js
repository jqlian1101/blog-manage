import React from "react";
import { Input, Modal } from "antd";

const EditTagModal = props => {
    const normalCenter = {
        textAlign: "center",
        marginBottom: 20
    };

    return (
        <Modal
            title="添加标签"
            visible={props.visible}
            onOk={props.handleOk}
            width="600px"
            onCancel={props.handleCancel}
        >
            <Input
                style={normalCenter}
                addonBefore="标签名"
                size="large"
                placeholder="标签名"
                name="title"
                value={props.name}
                onChange={props.handleChange}
            />
            <Input
                addonBefore="描述"
                size="large"
                placeholder="描述"
                name="title"
                value={props.desc}
                onChange={props.handleDescChange}
            />
        </Modal>
    );
};

export default EditTagModal;
