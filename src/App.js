import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'antd'

function App() {

  const [users, setUsers] = useState([])
  const [userPosts, setPosts] = useState([])

  const getData = () => {

    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(res => {
        if (res && Array.isArray(res) && res.length > 0) {
          setUsers(res)
        } 
      })

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(resPost => resPost.json())
      .then(resPost => {
        if (resPost && Array.isArray(resPost) && resPost.length > 0) {
          setPosts(resPost)
        } 
      })
    
  }


  const loadUsers = () => {
    getData()
  }

  useEffect(()=>{
    getData()
    
  }, [])

  
  const styles = {
    color: 'black',
    border: '1px solid #d5b7ff',
    padding: 15,
    margin: 'auto',
    marginBottom: 5,
    backgroundColor: '#d5b7ff',
    fontFamily: 'Helvetica Neue'
  }
  return(
    <>

      <h2 style={styles}>Users</h2>
      <div style={{margin: 30, gap: 12,}} id="outer">
      
        {users.length > 0 &&
          users.map(user => {
            return (
              
              <Card title={user.name} key={Math.random()} style={{width: 700, margin:10 }} headStyle={{backgroundColor: '#FFFFFF'}}>
              <p style={{fontFamily: 'Helvetica Neue'}}>Email: {user.email}</p>
              
              <Row gutter={10}>  
               { 
                
                userPosts.filter(post => post.userId === user.id).map(post =>{
                  return(
                    
                    <Col span={30}>
                    <Card title={post.title}  bordered={false} style={{margin:10}} headStyle={{backgroundColor: '#ffc8e2'}}>
                    <p >{post.body} </p>
                    </Card>
                    </Col>
                    
                      ) 
                
                    } 
                  )
                
              }
              </Row>
            </Card>
            )
            
          })
        }
      </div>
    </>
  )
}

export default App;