import React from 'react';
import { Select } from 'antd';




const { Option } = Select;


const CategorySelect = ({ options, handleSelectChange}) => (
    <Select
        mode="multiple"
        style={{ width: 200 }}
        placeholder="Select category"
        onChange={handleSelectChange}
    >
        {options.map((item, i) => <Option value={item.id} key={`${item.name}-[${i}]`}>{item.name}</Option>)}
    </Select>
);


const ConditionSelect = ({ handleSelectChange }) => (
    <Select
        style={{ width: 200 }}
        placeholder="Select condition"
        onChange={handleSelectChange}
    >
        <Option value="Used">Used</Option>
        <Option value="New">New</Option>
        <Option value="Refurbished">Refurbished</Option>
    </Select>
);


const TypeSelect = ({ handleSelectChange }) => (
    <Select
        style={{ width: 200 }}
        placeholder="Select condition"
        onChange={handleSelectChange}
    >
        <Option value="physical">physical</Option>
        <Option value="digital">digital</Option>
    </Select>
);


export {
    CategorySelect,
    ConditionSelect,
    TypeSelect
}