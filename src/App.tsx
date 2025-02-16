import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import '@ant-design/v5-patch-for-react-19';
import { ConfigProvider, theme } from 'antd';
import './App.scss'

const {Content, Footer} = Layout;


export const App = () => {
  return (
    <ConfigProvider theme={{
      // 1. Use dark algorithm
      token: {
        colorPrimary: '#5A54F9',
        // colorBgContainer: '#f6ffed'
      },
      algorithm: theme.darkAlgorithm,

      // 2. Combine dark algorithm and compact algorithm
      // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
    }}>
      <Layout
        style={{height: '100%'}}>
        <Content
          style={{
            padding: '0 48px',
            minHeight: '100vh'
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
          style={{textAlign: 'center',}}
        >
      Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </ConfigProvider>
  );
}
