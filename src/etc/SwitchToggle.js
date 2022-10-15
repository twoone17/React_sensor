// import React, { Component } from "react";
// import Switch from "react-switch";

// class SwitchToggle extends Component {
//   constructor() {
//     super();
//     this.state = { checked: false };
//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleChange(checked) {
//     this.setState({ checked });
//   }

//   render() {
//     return (
//       <div className="example">
//         <h2>Custom styling</h2>
//         <label htmlFor="material-switch">
//           <Switch
//             checked={this.state.checked}
//             onChange={this.handleChange}
//             onColor="#86d3ff"
//             offColor="#86d3ff"
//             onHandleColor="#2693e6"
//             handleDiameter={40}
//             uncheckedHandleIcon={
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   height: "100%",
//                   fontSize: 20,
//                 }}
//               >
//                 😀
//               </div>
//             }
//             uncheckedIcon={
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   height: "100%",
//                   fontSize: 20,
//                   // color: "orange",
//                   paddingRight: 2,
//                 }}
//               >
//                 목 측정
//               </div>
//             }
//             checkedIcon={
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   height: "100%",
//                   fontSize: 20,
//                   paddingRight: 2,
//                 }}
//               >
//                 허리 측정
//               </div>
//             }
//             checkedHandleIcon={
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   height: "100%",
//                   fontSize: 20,
//                 }}
//               >
//                 😀
//               </div>
//             }
//             // boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
//             // activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
//             height={100}
//             width={200}
//             className="react-switch"
//             id="material-switch"
//           />
//         </label>
//       </div>
//     );
//   }
// }

// export default SwitchToggle;
