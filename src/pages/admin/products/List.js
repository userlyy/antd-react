import React, { useEffect, useState } from "react";
import { Card, Table, Button, Popconfirm, Pagination } from "antd";
import { listApi, delOne, modifyOne } from "../../../services/products";

// const dataSource = [
//   {
//     id: 1,
//     name: "香皂",
//     price: 5,
//   },
//   {
//     id: 2,
//     name: "特仑苏",
//     price: 6,
//   },
//   {
//     id: 3,
//     name: "小浣熊",
//     price: 1.5,
//   },
// ];

function List(props) {
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    listApi().then((res) => {
      console.log(res);
      setDataSource(res.products);
      setTotal(res.totalCount);
    });
    // name: "小米"
  }, []);

  const loadData = (page) => {
    // console.log(page);
    listApi(page).then((res) => {
      setDataSource(res.products);
      setTotal(res.totalCount);
    });
  };

  // function onShowSizeChange(current, pageSize) {
  //   console.log(current, pageSize);
  // }

  const columns = [
    {
      title: "序号",
      key: "_id",
      width: 80,
      align: "center",
      render: (txt, record, index) => index + 1,
    },
    {
      title: "名字",
      dataIndex: "name",
    },
    {
      title: "价格",
      dataIndex: "price",
    },
    {
      title: "操作",
      render: (txt, record, index) => {
        return (
          <div>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                // 跳转到edit页面，传递id作为参数
                props.history.push(`/admin/products/edit/${record._id}`);
              }}
            >
              修改
            </Button>
            <Popconfirm
              title="确定删除此项？"
              onCancel={() => console.log("用户取消删除")}
              onConfirm={() => {
                console.log("用户确认删除");
                // 此处调用api接口进行相关操作
                // delOne(record._id).then((res) => {
                //   loadData();
                // });
              }}
            >
              <Button style={{ margin: "0 1rem" }} type="danger" size="small">
                删除
              </Button>
            </Popconfirm>
            <Button
              size="small"
              onClick={() => {
                // 修改在售状态
                // modifyOne(record._id, { onSale: !record.onSale }).then(
                //   (res) => {
                //     loadData();
                //   }
                // );
              }}
            ></Button>
          </div>
        );
      },
    },
  ];

  return (
    <Card
      title="商品列表"
      extra={
        <Button
          type="primary"
          size="small"
          onClick={() => {
            // 跳转到edit页面，传递id作为参数
            props.history.push("/admin/products/edit");
          }}
        >
          add list
        </Button>
      }
    >
      <Table
        rowKey="_id"
        columns={columns}
        pagination={{ total, defaultPageSize: 2, onChange: loadData }}
        bordered
        dataSource={dataSource}
        // Pagination="showSizeChanger
        // onShowSizeChange={onShowSizeChange}
        // defaultCurrent={3}
        // total={500}"
      />
    </Card>
  );
}

export default List;
