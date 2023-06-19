import React from "react";
import "./ReduxTestPage.css";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementByAmount } from "../redux/counter";

function ReduxTestPage() {
  const { count } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div className="container">
      <div className="counter-div">{count}</div>
      <div className="button-bar">
        <button
          className="button incr"
          onClick={(e) => {
            dispatch(increment());
          }}
        >
          increment
        </button>
        <button
          className="button decr"
          disabled={count <= 0 ? true : false}
          onClick={(e) => {
            dispatch(decrement());
          }}
        >
          decrement
        </button>
        <button
          className="button incramt"
          onClick={(e) => {
            dispatch(incrementByAmount(30));
          }}
        >
          increment by 30
        </button>
      </div>
    </div>
  );
}

export default ReduxTestPage;
