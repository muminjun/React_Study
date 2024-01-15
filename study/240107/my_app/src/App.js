import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./Mini_Pjt/Pages/MiniPage";
import PostCreate from "./Mini_Pjt/Pages/PostCreate";
import PostRead from "./Mini_Pjt/Pages/PostRead";

function App(props) {
  return (
    <BrowserRouter>
        <p>소플의 미니 블로그</p>
        <Routes>
            <Route index element={<MainPage />} />
            <Route path="post-create" element={<PostCreate />} />
            <Route path="post/:postId" element={<PostRead />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App