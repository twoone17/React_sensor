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
            console.log(localStorage.key(i))
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            StorageMap.set(localStorage.key(i), localStorage.getItem(key));
            //StorageMap에 집어넣음 - a로 시작하는 것만
        }                    
    }
    const SortedStorage = new Map([...StorageMap].sort().reverse());

    for (let i = 0; i < localStorage.length; i++) {
        localStorageKey[i] = Array.from(SortedStorage.keys())[i];
        localStorageValue[i] = Array.from(SortedStorage.values())[i];
    } //localstorage에 넣음

    for (let i = 0; i < localStorageValue.length; i++) {
        localStorageValue[i] = JSON.parse(localStorageValue[i]);
    } //밸류를 스트링에서 json 객체로 변환

    function Linechart() {
        let lvalue = [];
        const data01 = [];
        for (let i = 0; i < localStorageValue.length; i++) {
        lvalue[i] =
            ((localStorageValue[i].TotalTimeStorage -
            (localStorageValue[i].XTimeStorage +
                localStorageValue[i].YTimeStorage -
                localStorageValue[i].Duplicated)) /
            localStorageValue[i].TotalTimeStorage) * 100;
        }
        console.log(lvalue[0]);

        let i = localStorageValue.length;
        let NewCount = 6;
        while (i >= 0 && NewCount >= 0) {
        data01.push({ //data01에 로컬스토리지 키,값 넣기
            name: localStorageKey[NewCount],
            value: lvalue[NewCount],
        });
        i--;
        NewCount--;
        }
        console.log("data01 : " + data01[0].name);

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
        null
    )

}

export default BackMode;