import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  incrementBy,
  reset,
} from "../../redux/counterSlice";

const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.count);
  const [incVal, setIncVal] = useState(0);

  const inc = (val) => {
    setIncVal(+val || 0);
  };
  const resetVal = () => {
    setIncVal(0);
    dispatch(reset());
  };
  return (
    //   <div>Counter</div>
    <section>
      {count}
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <input value={incVal} type="text" onChange={(e) => inc(e.target.value)} />
      <button onClick={() => dispatch(incrementBy(incVal))}>Add</button>
      <button onClick={resetVal}>Reset</button>
    </section>
  );
};

export default Counter;
