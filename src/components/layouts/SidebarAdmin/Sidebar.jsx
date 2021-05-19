import history from '../../../utils/history'
import './styles.css';
import { Layout, Menu } from 'antd';
import { ShoppingCartOutlined, UserOutlined, ShopOutlined, HomeOutlined, TableOutlined } from '@ant-design/icons';
import logo from '../../../images/logo.png'

const { Sider } = Layout;
function Sidebar() {
  return (
    <Layout >
      <Sider
        style={{ backgroundColor: '#fff', height: '100vh' }}
        width="260px"
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="logo">
            <img src={logo} alt="" />
          </div>
        </div>
        <Menu theme="" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<HomeOutlined />} onClick={() => { history.push('/admin/') }}>
            Dashboard
        </Menu.Item>
          <Menu.Item key="2" icon={<ShopOutlined />} onClick={() => { history.push('/admin/product') }} >
            Quản lý sản phẩm
        </Menu.Item>
          <Menu.Item key="3" icon={<ShoppingCartOutlined />} onClick={() => { history.push('/admin/order') }}>
            Quản lý đơn hàng
        </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />} onClick={() => { history.push('/admin/user') }}>
            Quản lý thành viên
        </Menu.Item>
        <Menu.Item key="5" icon={<TableOutlined />} onClick={() => { history.push('/admin/category') }}>
            Quản lý danh mục
        </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  );
}

export default Sidebar;
