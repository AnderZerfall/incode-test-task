import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import '@ant-design/v5-patch-for-react-19';
const { Header, Content, Footer } = Layout;
import './App.scss'

export const App = () => {
  return (
    <Layout
    style={{
      height: '100%'
    }}>
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="demo-logo" />
    </Header>
    <Content
      style={{
        padding: '0 48px',
      }}
    >
      <div
        style={{
          minHeight: 280,
          padding: 24,
        }}
      >
        <Outlet />
      </div>
    </Content>
    <Footer
      style={{
        textAlign: 'center',
      }}
    >
      Ant Design ©{new Date().getFullYear()} Created by Ant UED
    </Footer>
  </Layout>
  );
}
