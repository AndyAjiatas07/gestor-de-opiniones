import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PostDetail from "./pages/PostDetail";
import MyPosts from "./pages/MyPosts";
import PostForm from "./pages/PostForm";
import CommentFormPage from "./pages/CommentFormPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/posts/:id"
          element={
            <PrivateRoute>
              <PostDetail />
            </PrivateRoute>
          }
        />

        <Route
          path="/my-posts" 
          element={
            <PrivateRoute>
              <MyPosts />
            </PrivateRoute>
          }
          />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route path="/posts/new"
        element={
          <PrivateRoute>
        <PostForm />
        </PrivateRoute>
        }
        />

        <Route path="/posts/edit/:id"
        element={
          <PrivateRoute>
        <PostForm edit={true} />
        </PrivateRoute>
        } 
        />

        <Route
  path="/comments/edit/:commentId"
  element={
    <PrivateRoute>
      <CommentFormPage />
    </PrivateRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;