import React from "react";
import { useState } from "react";
import { BiCheck } from "react-icons/bi";

const DropDown = ({ handleBestClick, order }) => {
  const [tag, setTag] = useState("id");

  console.log("order", order);
  return (
    <>
      {/* 드롭다운 1 */}
      <div className="dropdown">
        <button className="dropbtn" style={{ fontFamily: "LINESeedKR-Bd" }}>
          {tag === "id" ? "최신순" : "좋아요 많은순"}
          <span class="material-icons">keyboard_arrow_down</span>
        </button>
        <div className="dropdown-content">
          <a
            onClick={() => {
              handleBestClick("id");
              setTag("id");
            }}
          >
            최신순
            {tag === "id" ? (
              <BiCheck style={{ fontSize: "20px", marginLeft: "100px" }} />
            ) : (
              ""
            )}
          </a>

          <a
            onClick={() => {
              handleBestClick("likeCount");
              setTag("likeCount");
            }}
          >
            좋아요 많은순
            {tag === "likeCount" ? (
              <BiCheck style={{ fontSize: "20px", marginLeft: "100px" }} />
            ) : (
              ""
            )}
          </a>
        </div>
      </div>
    </>
  );
};

export default DropDown;
