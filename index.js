// const io = require("socket.io")(8800, {
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });



// let activeUsers = [];

// const getUser = (id) => {
//   // return activeUsers.find((user) => user.newUserId === id);
//   let test = activeUsers.find((user) => user.newUserId === id);
//   console.log(test);
  
// };
// io.on("connection", (socket) => {
//   // add new User
//   socket.on("new-user-add", (newUserId) => {
//     // if user is not added previously
//     if (!activeUsers.some((user) => user.userId === newUserId)) { 
//       activeUsers.push({ userId: newUserId, socketId: socket.id });
//       console.log("New User Connected", activeUsers);
//     }
//     // send all active users to new user
//     io.emit("get-users", activeUsers);
//   });

  // socket.on("disconnect", () => {
  //   // remove user from active users
  //   activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
  //   console.log("User Disconnected", activeUsers);
  //   // send all active users to all users
  //   io.emit("get-users", activeUsers);
  // });

  // send message to a specific user
  // socket.on("send-message", (data) => {
  //   const { receiverId } = data;
  //   const user = activeUsers.find((user) => user.userId === receiverId);
  //   console.log("Sending from socket to :", receiverId);
  //   console.log("Data: ", data);
  //   if (user) {
  //     io.to(user.socketId).emit("recieve-message", data);
  //   }
  // });
  // socket.on("sendNotification", ( { user }) => {
    // const receiver = getUser(user._id);
  //  getUser(user._id);
    // console.log(receiver);
    // console.log(receiver);
    // io.to(receiver.socketId).emit("getNotification", {
    //   post,
    //   type,
    // });
  // });
// });

// { user, post, type }

const iserver = "https://socket-vf1h.onrender.com"

const io = require("socket.io")(iserver, {
  cors: {
    origin: "https://f-uture.web.app",
  },
});




let activeUsers = [];
const getUser = (newUserId) => {
  return activeUsers.find((user) => user.userId === newUserId);
};

io.on("connection", (socket) => {

  socket.on("new-user-add", (newUserId) => {
    // if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) { 
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      console.log("New User Connected", activeUsers);
    }
    // send all active users to new user
    io.emit("get-users", activeUsers);
  });





  socket.on("send-message", (data) => {
    const {receiverId} = data
    const receiver = getUser(receiverId);
  try {
   
    if(receiver)
    io.to(receiver.socketId).emit("recieve-message", data);
  } catch (error) {
    return error
  }
  });


  

  socket.on("sendNotification", (data) => {
    // console.log(data);
    const {reciverId} = data
    const receiverNotif = getUser(reciverId);
    try {
      
        if(receiverNotif)
      io.to(receiverNotif.socketId).emit("getNotification", data);
    } catch (error) {
        return error
    }
  });


  socket.on("disconnect", () => {
    // remove user from active users
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected", activeUsers);
    // send all active users to all users
    io.emit("get-users", activeUsers);
  });



});

// console.log(onlineUsers);
