import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* addToOrderSaga(action) {
  try {
    const { orderInforAddress,status, userId  } = action.payload;
    const result = yield axios({
      method: "POST",
      url: `http://localhost:3001/carts/`,
      data: {
        orderInforAddress: orderInforAddress,
        status : status,
        userId : userId
      },
    });
    yield axios({
      method: 'PATCH',
      url: `http://localhost:3001/users/${userId}`,
      data: {
        carts: [],
      }
    });
    yield put({
      type: "ADD_TO_ORDER_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "ADD_TO_ORDER_FAIL",
      payload: {
        error: e.error,
      },
    });
  }
}

function* getOrderListSaga(action) {
  try {
    const {status,searchKey} = action.payload;
    const result = yield axios({
      method: 'GET',
      url: `http://localhost:3001/carts`,
      params: {
        ...status && { status },
        _sort : "id",
        _order: "desc",
        ...searchKey && { q: searchKey },
      }
    });
    yield put({
      type: "GET_ORDER_LIST_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_ORDER_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* reviewOrderListSaga(action) {
  try {
    const { id, order } = action.payload;
    console.log("🚀 ~ file: order.saga.js ~ line 62 ~ function*reviewOrderListSaga ~ order", order)
    const result = yield axios({
      method: 'PATCH',
      url: `http://localhost:3001/carts/${id}`,
      data: {
        ...order
      }
    });
    yield put({ type: "REVIEW_ORDER_LIST_REQUEST"});
    yield put({
      type: "REVIEW_ORDER_LIST_SUCCESS",
      payload: {
        id: id,
        data: result.data
      }
    });
  } catch (e) {
    yield put({
      type: "REVIEW_ORDER_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* getOrderItemSaga(action) {
  try {
    const {userId} = action.payload;
    console.log("🚀 ~ file: order.saga.js ~ line 100 ~ function*getOrderItemSaga ~ userId", userId)
    const result = yield axios({
      method: 'GET',
      url: `http://localhost:3001/carts?userId=${userId}`,
      params: {
        _sort : "id",
        _order: "desc",
      }
    });
    console.log("🚀 ~ file: order.saga.js ~ line 109 ~ function*getOrderItemSaga ~ result", result)
    yield put({
      type: "GET_ORDER_ITEM_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_ORDER_ITEM_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}
export default function* orderSaga() {
  yield takeEvery("ADD_TO_ORDER_REQUEST", addToOrderSaga);
  yield takeEvery('GET_ORDER_LIST_REQUEST', getOrderListSaga);
  yield takeEvery('REVIEW_ORDER_LIST_REQUEST', reviewOrderListSaga);
  yield takeEvery('GET_ORDER_ITEM_REQUEST', getOrderItemSaga);

}