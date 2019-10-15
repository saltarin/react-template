import * as React from 'react';
import { Layout } from 'antd';
import { Welcome } from '../Home/Welcome';

const { Header, Content, Footer } = Layout;

const Home = () => (
    <Layout>
      <Header></Header>
      <Content>
        <Welcome />
      </Content>
      <Footer></Footer>
    </Layout>
)

export { Home }