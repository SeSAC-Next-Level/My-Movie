import React from 'react'
import LinkBtn from '../../component/common/LinkBtn'

export default function Login() {
  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault()
        
        console.log(e.target);

        
      }}>
        <input type="text" name="username" id="username" required value={"123"}/>
        <input type="password" name="password" id="password" /* required */  value={"456"}/>
        <button type="submit">로그인</button>
      </form>
    </div>
  )
}
function login() {

}