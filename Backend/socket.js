import { Server } from "socket.io";
import { userModel } from "./models/user.model.js";
import { captainModel } from "./models/captain.model.js";

let io;

function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    })

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on('join', async (data) => {
           const { userId, userType } = data;
            console.log(`User ${userId} joined ${userType}`);
            
           if (userType === 'user') {
                await userModel.findByIdAndUpdate(
                    userId, 
                    { socketId: socket.id }
                );
           } else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(
                    userId, 
                    { socketId: socket.id}
                )
           }
        });

        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;
            // console.log('userId And location-cap', userId, location);
            
            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: 'Invalid location' });
            }
            
            await captainModel.findByIdAndUpdate(userId, { 
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            })
        })

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
            
        })
        
    })
}

function sendMessageToSocketId(socketId, messageObject) {
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log(`Socket.io not initialized`);
        
    }
}

export {initializeSocket, sendMessageToSocketId}