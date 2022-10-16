import React from "react";
import Footer from "../component/Footer";
import AnalysisString from "../component/AnalysisString";
import { useState, useEffect } from "react";
import AnalysisHistory from "../component/AnalysisHistory";
import MyPieChart from "../component/MyPieChart";
import NeckMode from "../component/NeckMode";
import BackMode from "../component/BackMode";
import "./s1.css";
import "../component/Analyz.css";

import {
  PieChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Pie,
  Cell,
  LineChart,
} from "recharts";

function Analysis() {
  let ParsedStorage;
  let localStorageKey = [];
  let localStorageValue = [];
  let date;
  let dateChange = [];
  let key;
  let value1;
  const advice = [
    "바른 자세를 유지하면 신체의 핵심 근육들이 활발히 움직여 기초대사량과 열량 소모를 높입니다 !",
    "허리는 일자로 펴고 앉으시되 앞으로 나온 턱을 뒤로 밀어 넣고, 어깨를 편 자세를 함께 유지해주세요 ! ",
    "바른 자세는 업무 능력을 향상시킵니다 ! ",
    "앉아있을땐 20~30분 간격으로 몸을 틀어주고 스트레칭을 하는게 좋아요 !",
  ];

  let StorageMap = new Map(); //TODO:
  const [mode, setMode] = useState(1); //neck, back 바꾸는 버튼에 쓰임, 0이면 디폴트 넥
  const [StorageData, setStorageData] = useState([
    {
      XTimeStorage: 0,
      YTimeStorage: 0,
      XVibrateStorage: 0,
      YVibrateStorage: 0,
      Duplicated: 0,
      TotalTimeStorage: 0,
    },
  ]);

  function onClickMode() {
    if (mode == 1) {
      setMode(0);
    } else {
      setMode(1);
    }
  }

  return (
    <div>
      <div className="back" style={{ height: "180vh" }}>
        <br></br>
        <br></br>
        <br></br>
        <button className="btn-3" onClick={onClickMode}>
          {" "}
          {mode ? "목의 통계를 확인합니다" : "허리의 통계를 확인합니다"}
        </button>
        {mode ? <NeckMode /> : <BackMode />}
      </div>
    </div>
  );
}

export default Analysis;
