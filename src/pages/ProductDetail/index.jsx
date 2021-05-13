
import { useEffect, useState } from 'react';
import { Card, Row, Col, InputNumber, Descriptions } from 'antd';
import { connect } from 'react-redux';

import { getProductDetailAction, getCartListAction } from '../../redux/actions';
import { getCategoryListAction } from '../../redux/actions';
import { getProductListAction } from '../../redux/actions';

import ItemProduct from '../ProductList/components/ItemProduct';

function ProductDetailPage({
  productDetail,
  getProductDetail,
  match,
  getCartList,
  cartList,
  categoryList,
  getCategoryList,
  getProductList,
  productList,
}) {

  // const {title,price,img,id} = props;
  console.log(cartList.data)
  const productId = match.params.id;
  // const [optionSelected, setOptionSelected] = useState({});

  useEffect(() => {
    getCartList();
    getProductDetail({ id: productId });
  }, [])

  // useEffect(() => {
  //   if (productDetail.data.id) {
  //     setOptionSelected(productDetail.data.productOptions[0] || {})
  //   }
  // }, [productDetail.data])

  // console.log('123',productDetail);
  // function renderProductOptions() {
  //   return productDetail.data.productOptions.map((item, index) => {
  //     return (
  //       <Radio.Button value={item}>
  //         {item.title}
  //       </Radio.Button>
  //     )
  //   })
  // }




  const [categorySelected, setCategorySelected] = useState(null);
  const [page, setPage] = useState(1)
  useEffect(() => {
    getCategoryList();
    getProductList({
      page: 1,
      limit: 8,
    });
  }, []);
  console.log(getCategoryList);

  // function handleFilterCategory(id) {
  //   productList.arrCategoryId.push(id)
  //   setCategorySelected(id);
  //   getProductList({
  //     page: 1,
  //     limit: 8,
  //     categoryId: id,
  //   });
  // }

  function renderProductList() {
    if (productList.load) return <p>Loading...</p>;
    return  productList.data.map((productItem) => {
      return (
        <ItemProduct
          title={productItem.name}
          price={productItem.price}
          img={productItem.img[0]}
          // onClick={() => history.push(`/product/${productItem.id}`)}
          id={productItem.id}
        />
      )
    })
  }

  return (
    <Row gutter={6}>
      <Col span={12} style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ marginTop: 16, marginBottom: 16 }}>
          <div style={{ width: 420, marginLeft: 130 }}>
            <div className="slide-img">
              <img src={productDetail.data.img}></img>
            </div>
          </div>
        </div>
      </Col>
      <Col span={12} style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ marginTop: 32, marginBottom: 16 }}>
          <div style={{ width: 420, height: 420, marginLeft: 130, color: '#008848', fontWeight: 700, fontSize: '120%' }}>
            <div style={{ color: '#008848', fontWeight: 700, fontSize: '140%' }}>
              <p>{productDetail.data.name}</p>
            </div>
            <div>
              <div className="type">
                <p>Loại: {productDetail.data.category.name}</p>
              </div>
              <div className="price" style={{ color: '#008848', fontWeight: 700, fontSize: '120%' }}>
                <p>Giá: {productDetail.data.price} </p>
              </div>
              <div className="number">
                <p>Số lượng: <InputNumber className="" min={1} max={99} defaultValue='1' /></p>
              </div>
              <div>
                <button className="buy-btn" style={{ color: '#008848', fontSize: '90%' }}>
                  Cho vào giỏ hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </Col>

      <Descriptions title="Mô tả:" style={{ marginLeft: 130, marginRight: 130, textAlign: 'justify' }}>
        <Descriptions.Item style={{ width: 500, marginLeft: 130, fontWeight: 700, }}>
          {productDetail.data.description}</Descriptions.Item>
      </Descriptions>

      <Descriptions title="Sản phẩm tương tự:" style={{ marginLeft: 130, marginRight: 130 }}>
        <Row gutter={8}>
          {renderProductList()}
          {/* {handleFilterCategory()} */}
        </Row>
      </Descriptions>
    </Row>

  );
}

const mapStateToProps = (state) => {
  const { productDetail } = state.productReducer;
  const { cartList } = state.cartReducer;

  const { categoryList, productList } = state.productReducer;
  return {
    productDetail,
    cartList,
    categoryList,
    productList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductDetail: (params) => dispatch(getProductDetailAction(params)),
    getCartList: (params) => dispatch(getCartListAction(params)),
    getProductList: (params) => dispatch(getProductListAction(params)),
    getCategoryList: (params) => dispatch(getCategoryListAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailPage);
