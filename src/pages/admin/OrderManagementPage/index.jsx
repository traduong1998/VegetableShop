import { Table, Popconfirm, Space, Input, Button, List, Row, Select, Form } from 'antd';

import { useEffect } from 'react';
import { connect } from 'react-redux';

import { getOrderListAction, reviewOrderListAction } from '../../../redux/actions';


function OrderManagementPage({
  getOrderList,
  orderList,
  reviewOrderList
}) {
  
  useEffect(() => {
    getOrderList({
      status : null
    });
  }, []);
  const { Search } = Input;
  const onSearch = value => console.log(value);

  const { Option } = Select;

  function onSelect(value) {
    getOrderList({
      status : value
    });
  }

  function handleAcceptOrder(id) {
    orderList.data.forEach((item) => {
      if (item.id === id) {
        reviewOrderList({
          order: {
            orderInforAddress: {
              fullName: item.orderInforAddress.fullName,
              phone: item.orderInforAddress.phone,
              address: item.orderInforAddress.address,
              totalPrice: item.orderInforAddress.totalPrice,
              date: item.orderInforAddress.date,
              time: item.orderInforAddress.time,
              cartList: [...item.orderInforAddress.cartList],
            },
            id: id,
            userId: item.orderInforAddress.userId,
            status: 'confirmed'
          }, id: id
        });
      }
    })
  }

  function handleCancelOrder(id) {
    orderList.data.forEach((item) => {
      if (item.id === id) {
        reviewOrderList({
          order: {
            orderInforAddress: {
              fullName: item.orderInforAddress.fullName,
              phone: item.orderInforAddress.phone,
              address: item.orderInforAddress.address,
              totalPrice: item.orderInforAddress.totalPrice,
              date: item.orderInforAddress.date,
              time: item.orderInforAddress.time,
              cartList: [...item.orderInforAddress.cartList],
            },
            userId: item.orderInforAddress.userId,             
            id: id,
            status: 'cancelled'
          }, id: id
        });
      }
    })
  }

  const tableData = orderList.data.map((item) => {
    console.log(orderList.data)
    return {
      key: item.id,
      id: item.id,
      fullName: item.orderInforAddress.fullName,
      status: item.status,
      address: item.orderInforAddress.address,
      cartList: item.orderInforAddress.cartList,
      time: `${item.orderInforAddress.time} - ${item.orderInforAddress.date}`,
      totalPrice: item.orderInforAddress.totalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
    }
  })

  const tableColumns = [
    {
      title: 'T??n ng?????i nh???n',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: '?????a ch???',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Th???i gian',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'T???ng ti???n',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    {
      title: 'H??nh ?????ng',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        if (record.status == 'waiting') {
          return (
            <Space>
              <Button type="primary" ghost
                onClick={() => { handleAcceptOrder(record.id) }}
              >
                X??c nh???n
              </Button>
              <Popconfirm
                title={`B???n c?? ch???c mu???n h???y ????n h??ng n??y`}
                onConfirm={() => { handleCancelOrder(record.id) }}
                okText="H???y"
                cancelText="Kh??ng"
              >
                <Button danger >H???y </Button>
              </Popconfirm>
            </Space>
          )
        } else if (record.status == 'confirmed') {
          return (
            <div>???? x??c nh???n ????n h??ng</div>
          )
        } else {
          return (
            <div>???? h???y ????n h??ng</div>
          )
        }
      }
    },

  ];

  return (
    <div className='home' >
      <h2>Qu???n l?? danh m???c</h2>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '14px'
      }}
      >
        <Search
          placeholder="Nh???p v??o th??ng tin"
          allowClear
          enterButton="T??m ki???m"
          size="large"
          style={{ width: 400 }}
          onSearch={(value)=>{getOrderList({searchKey : value})}}
        />
        <div>
          <Select defaultValue = "Ch???n lo???i ????n h??ng" style={{ width: 200 }} onSelect={onSelect}>
            <Option >T???t c??? ????n h??ng</Option>
            <Option value="waiting">??ang ?????i x??c nh???n</Option>
            <Option value="confirmed">???? x??c nh???n</Option>
            <Option value="cancelled">???? h???y</Option>
          </Select>
        </div>
      </div>
      <Table
        loading={orderList.load}
        size="middle"
        columns={tableColumns}
        dataSource={tableData}
        pagination = {{defaultPageSize: 9}}
        expandable={{
          expandedRowRender: (record) => {
            return (
              <List
                size="small"
                dataSource={record.cartList}
                renderItem={(item) => (
                  <List.Item>
                    <Row justify="space-between" style={{ width: '100%' }}>
                      <div>{item.name}</div>
                      <div>S??? l?????ng: x{item.count}</div>
                      <div>Gi??: {(item.price * item.count).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</div>
                    </Row>
                  </List.Item>
                )}
              />
            )
          }
        }}
      />
    </div>
  );
}
const mapStateToProps = (state) => {
  const { orderList } = state.orderReducer;
  return {
    orderList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderList: (params) => dispatch(getOrderListAction(params)),
    reviewOrderList: (params) => dispatch(reviewOrderListAction(params)),

  };
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderManagementPage);
