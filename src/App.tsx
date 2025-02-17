import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import '@ant-design/v5-patch-for-react-19';
import { ConfigProvider, theme } from 'antd';
import './styles/App.scss';
import { Slide, ToastContainer } from 'react-toastify';
import { customAntdTheme } from './styles/theme';

const { Content, Footer } = Layout;

export const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: customAntdTheme,
        algorithm: theme.darkAlgorithm,
      }}
    >
      <Layout style={{ height: '100%' }}>
        <Content
          style={{
            padding: '0 48px',
            minHeight: '100vh',
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
        <Footer style={{ textAlign: 'center' }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
      </Layout>
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
        transition={Slide}
      />
    </ConfigProvider>
  );
};
