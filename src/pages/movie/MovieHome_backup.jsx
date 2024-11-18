import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { test } from '../../store/slice/sampleSlice'

export default function MovieHome() {
  const sample = useSelector((state) => state.sample.value)
  console.log(sample);
  
  const dispatch = useDispatch()


  return (
    <div onClick={()=>dispatch(test(55))}>MovieHome</div>
  )
}
