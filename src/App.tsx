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
      <Layout style={{ minHeight: '100vh' }}>
        <Content
        >
          <div className='main__container container'
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Made by 🦉 Anna Androshchuk. 💜 Hope ypu enjoy it!</Footer>
      </Layout>
      <ToastContainer
        position='bottom-right'
        autoClose={2000}
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
