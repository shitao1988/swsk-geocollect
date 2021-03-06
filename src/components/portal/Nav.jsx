/*
 * @Author: 史涛
 * @Date: 2019-01-05 19:36:30
 * @Last Modified by: 史涛
 * @Last Modified time: 2020-03-19 11:15:15
 */

import React from "react";
import PropTypes from "prop-types";
import TweenOne from "rc-tween-one";
import { Menu, Avatar, Icon } from "antd";
import { NavLink, withRouter } from "react-router-dom";
import { loginout, login } from "../../utils/UserInfoUtils";
import { getCookie } from "../../utils/UserInfoUtils";
import  '../less/nav.less';

const Item = Menu.Item;
const SubMenu = Menu.SubMenu;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneOpen: false,
      applink: "/"
    };
  }
  static propTypes = {
    className: PropTypes.string,
    isMobile: PropTypes.bool,
    id: PropTypes.string
  };

  static defaultProps = {
    className: "header1"
  };



  render() {
    const props = { ...this.props };
    const isMobile = props.isMobile;
    const pathname = props.location.pathname;
    delete props.staticContext;
    delete props.isMobile;
    const navData = [
      {
        title: "数据采集",
        link: "/"
      },
      {
        title: "数据审核",
        link: "/audit"
      },
      {
        title: "运维管理",
        link: "/devops"
      }
    ];
    const displayname =
      getCookie("userinfo") && JSON.parse(getCookie("userinfo")).displayname;
    if (displayname) {
      navData.push({
        title: "个人中心",
        link: "/personcenter"
      });
    }

    const navChildren = navData.map((item, i) => {
      return item.link ? (
        <Item key={item.link + i}>
          <NavLink to={item.link}>
            <span>{item.title}</span>
          </NavLink>
        </Item>
      ) : (
        <Item
          key={item.title}
          onClick={() => {
            window.open(item.herf, "_blank");
          }}
        >
          {item.title}
        </Item>
      );
    });

    displayname
      ? navChildren.push(
          <SubMenu
            className="user"
            title={
              <div>
                <span className="img">
                  <Avatar style={{ backgroundColor: "#87d068" }} icon="user" />
                </span>
                <span>{displayname}</span>
              </div>
            }
            key="user"
          >
            <Item key="loginout" onClick={loginout}>
              退出
            </Item>
          </SubMenu>
        )
      : navChildren.push(
          <Item key="login" onClick={login}>
            登录
          </Item>
        );

    return (
      <TweenOne
        component="header"
        style={{ background: this.state.background }}
        animation={{ opacity: 1, type: "from" }}
        {...props}
      >
          <NavLink to="/">
            <span className="logotitle">管理单元数据采集系统</span>
          </NavLink>
        <Menu
              mode="horizontal"
              defaultSelectedKeys={["/home"]}
              selectedKeys={[pathname]}
              onSelect={this.onSelect}
              id={`${this.props.id}-menu`}
              className="page"
            >
              {navChildren}
            </Menu>
      </TweenOne>
    );
  }
}

export default withRouter(Header);
