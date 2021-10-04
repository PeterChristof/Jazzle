// const handleFormSubmit = async (id) => {
//     const response = await axios.post(
//       `${process.env.REACT_APP_SERVER_HOSTNAME}/post/${id}/like`,
//       null,
//       { withCredentials: true }
//     );

//     //  console.log(response.data)
//     console.log(response.data.likes.length);
//     setLikes(response.data.likes.length);
   
//     setPosts(posts.map(post => post._id === id ? {...post, likes : response.data.likes} : post));
//     history.push("/feed");
//   };





// import React from "react";
// import axios from 'axios';

// class Followers extends React.Component {
//     constructor(props) {
//       super(props)
//       this.state = {
//         users: [],
//         follower: [],
//         following: [],
//         button: "Follow"
//       }
//     }
  
//     componentDidMount = () => {
//       this.getUsers()
//     }
  
//     getUsers = () => {
//       axios(`${process.env.REACT_APP_SERVER_HOSTNAME}/user/${username}/follow`)
//         .then(response => {
//           this.setState({ users: response.data})
//           console.log(response.data)
//         })
//         .catch(error => {
//           this.setState({ error: true })
//         })
//     }
  
//     followUser = (e) => {
//       e.preventDefault();
//       const userId = this.props.user[0].username
//       const followedId = e.target.value
      
//       axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/user/${username}/follow`, {
//         username,
//         followedId,
//         createdAt: new Date().toISOString().slice(0, 10),
//         updatedAt: new Date().toISOString().slice(0, 10)
//       })
//       .then(response => {
//         console.log(response.data)
//         this.setState(state => ({
//           button: "Unfollow",
//           loggedIn: !state.loggedIn
//         }))
//       })
//       .catch(error => {
//         console.log(error)
//       })
//     }
  
//     unfollowUser = (e) => {
//       e.preventDefault();
//       const userId = this.props.user[0].id
//       const followedId = e.target.value
  
//       axios.delete(`http://localhost:7001/api/users/${userId}/unfollow/${followedId}`)
//       .then(response => {
//         console.log(response)
//         this.setState({ button: "Follow" })
//       })
//       .catch(error => {
//         this.setState({ error: true })
//       })
//     }
  
  
//     render() {
//       const { users, button } = this.state
//       const userId = this.props.user[0].id
  
//       return (
//         <div>
//           <h2>Users in Unax</h2>
//           <ul>
//             {users.map((user, index) => {
//              if(user.id !== userId) {
//                return (
//                 <Card className="users" key= {index}>
//                   <CardBody>
//                     <CardTitle>{user.user_name}</CardTitle>
//                     <Button id="btn" value={user.id} onClick={this.followUser}>Follow</Button>
//                     <Button id="btn" value={user.id} onClick={this.unfollowUser}>Unfollow</Button>
//                   </CardBody>
//                 </Card>
//                )}  
//             })}
//           </ul>
//         </div>
//       )
//     }
//   }