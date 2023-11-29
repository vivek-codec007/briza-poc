import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Radio, Select, } from "antd";

import usePost from "hooks/usePost";
import { CREATE_PRE_APP } from "constants/api";

const CustomQuestionRender = () => {
    const [form] = Form.useForm();
    const { mutateAsync: getQuestionList } = usePost();
    const [questionList, setQuestionList] = useState([]);

    useEffect(() => {
        const payload = {
            brokerageId: process.env.REACT_APP_BROKERAGE_ID,
            links: [
                {
                    type: "brokerage",
                },
            ],
        };
        getQuestionList({
            url: CREATE_PRE_APP,
            payload,
        }).then((res) => {
            console.log("res --->", res);
            setQuestionList(res?.questionnaire?.questions);
        });
    }, []);

    const onFinish = (values) => {

        console.log('Received values:', values);
    };

    // const onFinishFailed = (errorInfo) => {
    //   console.log('Failed:', errorInfo);
    // };

    const validateEmail = (rule, value, callback) => {
        console.log('validateEmail called');

        // Email validation pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (value && !emailPattern.test(value)) {
            console.log('Validation failed');
            callback('Please enter a valid email address!');
        } else {
            console.log('Validation passed');
            callback();
        }
    };

    const renderFields = (data) => {
        const { ui, type, question, required, validation, id } = data;
        if (
            type == "SingleLine" ||
            type == "WcClassCode" ||
            type == "ClassOfBusiness"
        ) {
            return (
                <Form.Item
                    name={id}
                    style={{ width: 855 }}
                    label={ui?.label}
                    rules={[
                        { required: required },
                        // { type: validation?.[0]?.type },
                        // {
                        //   validator:  async (_, value) => {
                        //     await validateEmail(_, value);
                        //   },
                        //   validateTrigger: "onChange",
                        // },
                    ]}
                >
                    <h5>{question}</h5>
                    <Input placeholder={ui?.label} />
                </Form.Item>
            );
        }
        if (type == "Select") {
            return (
                <Form.Item
                    name={id}
                    style={{ width: 855 }}
                    label={ui?.label}
                // rules={[
                //   { required: required },
                //   { type: validation?.[0]?.type },
                // ]}
                >
                    <h5>{question}</h5>
                    <Select placeholder={ui?.label}>
                        {data?.options.map((option) => (
                            <Select.Option value={option?.key}>{option.label}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            );
        }
        if (data?.options?.length == 2 && required) {
            return (
                <Form.Item
                    name={id}
                    label={ui?.label}
                // rules={[
                //   { required: required },
                //   { type: validation?.[0]?.type },
                // ]}
                >
                    <h5>{question}</h5>
                    <Radio.Group>
                        {data?.options?.map((option) => (
                            <Radio value={option.key} > {option.label} </Radio>
                        ))}
                    </Radio.Group>
                </Form.Item>
            );
        }
    };
    return (
        <div>
            {!!questionList.length && (
                <Form
                    form={form}
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    style={{ maxWidth: 600, padding: 20 }}
                >
                    {questionList.map((questionObj, index) => {
                        return renderFields(questionObj);
                    })}

                    {/* <Form.Item label="DatePicker">
              <DatePicker />
            </Form.Item> */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </div>
    )
}

export default CustomQuestionRender