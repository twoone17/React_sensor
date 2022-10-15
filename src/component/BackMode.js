import React from "react";
import Footer from "./Footer";
import AnalysisString from "./AnalysisString";
import { useState, useEffect } from "react";
import AnalysisHistory from "./AnalysisHistory";
import MyPieChart from "./MyPieChart";
import Analysis from "../routes/Analysis";
import "./s2.css";

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


function BackMode() {
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

    for (let i = 0; i < localStorage.length; i++) {
        if(localStorage.key(i)[0]=='a'){
            const key = localStorage.key(i).substring(1,localStorage.key(i).length); //key값을 a빼고 b에 저장
            const value = localStorage.getItem(localStorage.key(i));
            StorageMap.set(key, value);
            //StorageMap에 집어넣음 - a로 시작하는 것만
        }                    
    }
    const SortedStorage = new Map([...StorageMap].sort().reverse()); //정렬
    // console.log(SortedStorage)
    const size = StorageMap.size; //총 길이
    

    for (let i = 0; i < size; i++) {
        localStorageKey[i] = Array.from(SortedStorage.keys())[i];
        localStorageValue[i] = Array.from(SortedStorage.values())[i];
    } //localstorage에 넣음
    console.log(localStorageKey)


    for (let i = 0; i < size; i++) {
        localStorageValue[i] = JSON.parse(localStorageValue[i]);
    } //밸류를 스트링에서 json 객체로 변환

    function Linechart() {
        let lvalue = [];
        const data01 = [];
        for (let i = 0; i < size; i++) {
        lvalue[i] =
            ((localStorageValue[i].TotalTimeStorage -
            (
                localStorageValue[i].XTimeStorage +
                localStorageValue[i].YTimeStorage -
                localStorageValue[i].Duplicated)) /
                localStorageValue[i].TotalTimeStorage) * 100;
            }

        let i = localStorageValue.length; //8
        let NewCount = 7;
        if(i>=NewCount){
          while(NewCount>0){
            data01.push({ 
              name: localStorageKey[NewCount-1], //newcount -> i 로 수정
              value: lvalue[NewCount-1],
            });
            NewCount--;
          }
        }
        else{
          while(i>0){
            data01.push({ 
              name: localStorageKey[i-1], //newcount -> i 로 수정
              value: lvalue[i-1],
            });
            i--;
          }
        };

        return (
        <LineChart
            width={350}
            height={150}
            data={data01}
            margin={{ top: 5, right: 40, left: 0, bottom: 0 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            name="자세 좋았던 시간 비율"
            />
        </LineChart>
        );
    }

    return (
        <div>
        <div className="back" style={{ height: "180vh"}}>
          <div className="c">
            <div>            
              <h5 className="e">최근 당신의 자세는 어땠을까요?</h5>              
              <MyPieChart
                Piekey={localStorageKey[0]}
                Pievalue={localStorageValue[0]}
              /> 
              <AnalysisString ParsedStorage={localStorageValue[0]} /> 
            </div>

            <Linechart />
            <hr />
            <p className="d">
              {advice[Math.floor(Math.random() * advice.length)]}
            </p>
            <hr />
            <div>
              <h5 className="e">이전의 자세 기록을 살펴볼까요?</h5>
              <AnalysisHistory
                localStorageKey={localStorageKey}
                localStorageValue={localStorageValue}
              />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    )

}

export default BackMode;