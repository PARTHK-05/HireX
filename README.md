# HireX

A comprehensive web-based platform designed to facilitate mock coding interviews, enabling users to practice technical interviews in a simulated environment with real-time collaboration features.

## 🚀 Features

- **User Authentication**: Secure login and registration powered by Clerk
- **Session Management**: Create and join interview sessions with problem assignments
- **Real-time Video Calls**: Integrated video conferencing using Stream Video SDK
- **Live Chat**: In-session messaging for communication during interviews
- **Code Execution**: Run and test code snippets with Piston API integration
- **Problem Library**: Access to a curated collection of coding problems
- **Dashboard**: Track active and recent interview sessions
- **Responsive Design**: Optimized for desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Query** - Powerful data synchronization for React
- **Axios** - HTTP client for API requests
- **Clerk** - Authentication and user management
- **Stream Video SDK** - Real-time video and audio

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data persistence
- **Stream Chat SDK** - Real-time messaging
- **Inngest** - Event-driven background job processing
- **Clerk** - Server-side authentication middleware

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB database
- Clerk account for authentication
- Stream account for video and chat services

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd interview-prep
   ```

2. **Install backend dependencies**
   ```bash
   cd Backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd Frontend
   npm install
   ```

4. **Environment Configuration**

   **Backend (.env)**
   ```env
   CLIENT_URL=http://localhost:5173
   PORT=3000
   DB_URL=<your-mongodb-connection-string>
   CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
   CLERK_SECRET_KEY=<your-clerk-secret-key>
   STREAM_API_KEY=<your-stream-api-key>
   STREAM_API_SECRET=<your-stream-api-secret>
   INNGEST_EVENT_KEY=<your-inngest-event-key>
   INNGEST_SIGNING_KEY=<your-inngest-signing-key>
   ```

   **Frontend (.env)**
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
   VITE_API_URL=http://localhost:3000/api
   VITE_STREAM_API_KEY=<your-stream-api-key>
   VITE_STREAM_VIDEO_TOKEN=<your-stream-video-token>
   ```

## 🚀 Running the Application

1. **Start the backend server**
   ```bash
   cd Backend
   npm start
   ```

2. **Start the frontend development server**
   ```bash
   cd Frontend
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 📁 Project Structure

```
interview-prep/
├── Backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── lib/            # Utility libraries
│   │   ├── middleware/     # Authentication middleware
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   └── server.js       # Main server file
│   └── package.json
├── Frontend/
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── api/           # API service functions
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility libraries
│   │   ├── pages/         # Page components
│   │   └── main.jsx       # Application entry point
│   └── package.json
└── README.md
```

## 🔐 Authentication

The application uses Clerk for authentication. Users must sign in to access interview features. The authentication state is managed globally through the Clerk React provider.

## 🎥 Video Calls

Video functionality is powered by Stream Video SDK. Sessions support:
- HD video quality
- Audio controls
- Screen sharing
- Participant management

## 💬 Real-time Chat

In-session messaging is handled by Stream Chat SDK, providing:
- Real-time message delivery
- Message history
- User presence indicators

## 🔍 API Endpoints

### Sessions
- `POST /api/sessions` - Create new interview session
- `GET /api/sessions/active` - Get active sessions
- `GET /api/sessions/my-recent` - Get user's recent sessions
- `GET /api/sessions/:id` - Get session details
- `POST /api/sessions/:id/join` - Join a session
- `POST /api/sessions/:id/end` - End a session

### Chat
- `GET /api/chat/token` - Get chat authentication token

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, please contact the development team or create an issue in the repository.

## 🔄 Future Enhancements

- [ ] Code editor with syntax highlighting
- [ ] Interview recording and playback
- [ ] Performance analytics
- [ ] Integration with popular coding platforms
- [ ] Mobile application development
