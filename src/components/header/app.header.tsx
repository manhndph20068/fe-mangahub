"use client";

import {
  DownOutlined,
  MenuOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Col, Row, Avatar, Dropdown, Space, MenuProps } from "antd";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import "./app.header.scss";
import InputSearch from "./input.search";
import MenuHeader from "./menu.header";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import MenuDrawer from "./menu.drawer";
import { sendRequest } from "@/src/utils/api";

const AppHeader = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [genres, setGenres] = useState<IGenre[] | []>([]);
  const pathname = usePathname();
  const { data: session } = useSession();
  const usernameRef = useRef<HTMLDivElement>(null);

  const handleOpenSearch = () => {
    setOpenSearch(!openSearch);
  };

  useEffect(() => {
    setOpenSearch(false);
  }, [pathname]);

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const items: MenuProps["items"] = [
    {
      label: <Link href="#">Cài đặt</Link>,
      key: "0",
    },
    {
      type: "divider",
    },
    {
      onClick: () => {
        {
          signOut();
        }
      },
      label: <div style={{ textAlign: "center", color: "red" }}>Logout</div>,
      key: "3",
    },
  ];

  const fetchGenres = async () => {
    const res = await sendRequest<IGenre[]>({
      url: `${process.env.NEXT_PUBLIC_COMICS_API_URL}/genres`,
      method: "GET",
    });
    console.log("sdf", res);
    if (res && res.length > 0) {
      setGenres(res);
    } else {
      setTimeout(fetchGenres, 1000);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <>
      {openSearch && (
        <Row justify="center">
          <Col
            xs={{ span: 23 }}
            sm={{ span: 23 }}
            md={{ span: 23 }}
            lg={{ span: 22 }}
            xl={{ span: 19 }}
            xxl={{ span: 17 }}
          >
            <InputSearch />
          </Col>
        </Row>
      )}
      <Row justify="center" className="header-bar">
        <Col
          xs={{ span: 23 }}
          sm={{ span: 23 }}
          md={{ span: 23 }}
          lg={{ span: 22 }}
          xl={{ span: 19 }}
          xxl={{ span: 17 }}
          style={{
            height: "70px",
          }}
        >
          <Row
            style={{
              height: "100%",
            }}
          >
            <Col
              md={5}
              sm={14}
              xs={14}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Link href={"/"}>
                <div style={{ width: "100%" }}>
                  <img
                    src="https://raw.githubusercontent.com/manhndph20068/image-store/main/logo12.png"
                    alt="logo"
                    style={{
                      height: "43px",
                      paddingLeft: "15px",
                    }}
                  />
                </div>
              </Link>
            </Col>
            <Col md={12} sm={0} xs={0}>
              <MenuHeader resGenres={genres} />
            </Col>

            <Col md={7} sm={0} xs={0}>
              <div className="right-content">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    gap: "10px",
                    width: "100%",
                  }}
                >
                  <Button
                    type="primary"
                    style={{
                      background: openSearch ? "white" : "black",
                    }}
                    size="large"
                    shape="circle"
                    icon={
                      <SearchOutlined
                        style={{ color: openSearch ? "black" : "white" }}
                      />
                    }
                    onClick={() => handleOpenSearch()}
                  />
                  {session ? (
                    <div
                      style={{
                        display: "flex",
                        width: "auto",
                        gap: "7px",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        size="large"
                        src={
                          session.user?.image
                            ? `${session.user?.image}`
                            : `${session.userInfo?.avatar}` ?? null
                        }
                        icon={<UserOutlined />}
                      />
                      <div
                        className="user-name"
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                        ref={usernameRef}
                      >
                        <Dropdown menu={{ items }} trigger={["click"]}>
                          <a onClick={(e) => e.preventDefault()}>
                            <Space>
                              {session?.user?.name ?? session?.userInfo?.email}
                              <DownOutlined />
                            </Space>
                          </a>
                        </Dropdown>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Button
                        type="link"
                        style={{ background: "black", color: "white" }}
                        shape="round"
                        icon={<UserOutlined />}
                        ghost
                        size="large"
                        onClick={() => {
                          signIn();
                        }}
                      >
                        Login
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Col>
            <Col md={0} sm={10} xs={10}>
              <div
                className="right-content"
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  width: "100%",
                  gap: "10px",
                }}
              >
                <Button
                  type="primary"
                  style={{ background: "#8E5D4F" }}
                  size="large"
                  color="#8E5D4F"
                  shape="circle"
                  icon={<SearchOutlined />}
                  onClick={() => handleOpenSearch()}
                />
                <Button
                  type="text"
                  icon={<MenuOutlined />}
                  size="large"
                  onClick={() => showDrawer()}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <MenuDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        resGenres={genres}
        items={items}
      />
    </>
  );
};
export default AppHeader;
