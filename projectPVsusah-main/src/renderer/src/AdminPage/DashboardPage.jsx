import React from "react";
import dash from "./dashboard.png"

export default function DashboardPage() {
  return (
    <>
      <div style={{height:"100%", overflowY:"auto"}}>
        <h1 style={{fontSize:"64px", color:"red"}}>Dashboard</h1>
        <img src={dash}></img>
      </div>
    </>
  )
}