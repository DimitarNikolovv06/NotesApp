import React from "react";
import { Main } from "./main/Main";
import { Header } from "./header/Header";
import "./Layout.css";

// const style = {
//   background: rgb(22,22,22);
// }

export default function Layout() {
  return (
    <div className="layout">
      <Header />
      <Main />
    </div>
  );
}
