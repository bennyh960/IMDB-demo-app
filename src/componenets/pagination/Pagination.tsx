import React from "react";
import "./pagination.css";

interface Props {
  page: number;
  maxContent: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<Props> = ({ page, setPage, maxContent }) => {
  const handleLeft = () => {
    if (page > 1) setPage((p) => p - 1);
  };
  const handleRight = () => {
    if (page < maxContent) setPage((p) => p + 1);
  };
  return (
    <div className="pagination">
      <div onClick={handleLeft}>&#60;&#60; </div>
      <div className="pagination-num">
        {page}/{maxContent}
      </div>
      <div onClick={handleRight}>&#62;&#62; </div>
    </div>
  );
};

export default Pagination;
