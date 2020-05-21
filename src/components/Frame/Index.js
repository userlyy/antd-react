import React from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Dropdown,
  Avatar,
  message,
  Badge,
} from "antd";
import { adminRoutes } from "../../routes";
import { withRouter } from "react-router-dom";
import { clearToken } from "../../utils/auth";
import "./frame.css";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const routes = adminRoutes.filter((route) => route.isShow);

function Index(props) {
  const popMenu = (
    <Menu
      onClick={(p) => {
        if (p.key === "logOut") {
          clearToken();
          props.history.push("/login");
        } else {
          // message.info(p.key); // tip
          if ((p.key = "noti")) {
            props.history.push("/admin/notices");
          }
        }
      }}
    >
      <Menu.Item key="noti">通知中心</Menu.Item>
      <Menu.Item key="setting">设置</Menu.Item>
      <Menu.Item key="logOut">退出</Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Header className="header">
        <Dropdown overlay={popMenu}>
          <div>
            <Avatar>U</Avatar>
            <Badge dot={!props.isAllRead}>
              <span style={{ color: "#fff" }}>超级管理员</span>
            </Badge>
            <Icon type="down" />
          </div>
        </Dropdown>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: "#fff" }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            {routes.map((route) => {
              return (
                <Menu.Item
                  key={route.path}
                  onClick={(p) => props.history.push(p.key)}
                >
                  {route.title}
                </Menu.Item>
              );
            })}
          </Menu>
        </Sider>
        <Layout style={{ padding: "16px" }}>
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
          <Content
            style={{
              background: "#fff",
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default withRouter(Index);
