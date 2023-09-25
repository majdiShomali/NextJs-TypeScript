"use client"
import type { RootState } from '@/GlobalRedux/store';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '@/GlobalRedux/Features/counter/counterSlice';

const ReduxTest = () => {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();
  return (
    <main className="first-line:">
    <button 
      className=""
      onClick={() => dispatch(increment())}
    >Increment</button>
    <span>{count}</span>
    <button 
      className=""
      onClick={() => dispatch(decrement())}
    >Decrement</button>
    <button 
      className=""
      onClick={() => dispatch(incrementByAmount(2))}
    >Increment by 2</button>
  </main>
  )
}

export default ReduxTest

