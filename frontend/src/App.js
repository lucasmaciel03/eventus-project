import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import CreateUser from "./POST/CreateUser.js";
import GetUser from "./GET/GetUser.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/createuser" element={<CreateUser />} />
        <Route path="/getuser" element={<GetUser />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
