import React, { useEffect, useState } from "react";
import "./App.css";
import './AirBriza.css'

import { AxiosInterceptor } from "services/axiosinstance";
import AirBriza from "views/QuestionsRender/AirBriza";
import CustomQuestionRender from "views/QuestionsRender/CustomQuestionRender";
import AppRoutes from "Routes";

const App = () => {

  return (
    <AxiosInterceptor>
      <div style={{margin: '50px'}}>
        <AppRoutes />
      </div>
    </AxiosInterceptor>
  );
};

export default App;
