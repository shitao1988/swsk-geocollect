import React, { Component } from "react";
import { Card, Table, Tree, Select,Cascader,Input,DatePicker,Button  } from "antd";
import { PlusCircleOutlined } from '@ant-design/icons';
const { Search } = Input;

export default class OrgContent extends Component {
  onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  };
  render() {
   
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        render: text => <a>{text}</a>
      },
      {
        title: "Age",
        dataIndex: "age"
      },
      {
        title: "Address",
        dataIndex: "address"
      }
    ];
    const data = [
      {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park"
      },
      {
        key: "2",
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park"
      },
      {
        key: "3",
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park"
      },
      {
        key: "4",
        name: "Disabled User",
        age: 99,
        address: "Sidney No. 1 Lake Park"
      }
    ];

    const treeData = [
        {
          title: "parent 0",
          key: "0-0",
          children: [
            {
              title: "leaf 0-0",
              key: "0-0-0",
              isLeaf: true
            },
            {
              title: "leaf 0-1",
              key: "0-0-1",
              isLeaf: true
            }
          ]
        },
        {
          title: "parent 1",
          key: "0-1",
          children: [
            {
              title: "leaf 1-0",
              key: "0-1-0",
              isLeaf: true
            },
            {
              title: "leaf 1-1",
              key: "0-1-1",
              isLeaf: true
            }
          ]
        }
      ];
    return (
      <>
        <Card className="orgcontent_card">
        <Tree multiple defaultExpandAll treeData={treeData} />
        </Card>
        <Card className="orgcontent_list">
        <Search
            placeholder="请输入关键字"
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
            />
        <Button style={{float:'right'}} type="primary" icon={<PlusCircleOutlined />}>
            添加
            </Button>
          <Table style={{marginTop:20}}
            rowSelection={{
              type: "checkbox",
              onSelectChange: this.onSelectChange
            }}
            columns={columns}
            dataSource={data}
          />
        </Card>
      </>
    );
  }
}