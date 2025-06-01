import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initSocket = (token: string) => {
  socket = io(import.meta.env.VITE_SOCKET_URL, {
    auth: {
      pass: token,
    },
    transports: ["websocket"],
  });
  return socket;
};

export const getSocket = () => socket;
