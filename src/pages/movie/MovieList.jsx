import React from 'react';
import { Link } from 'react-router-dom';
export default function MovieList() {
  return (
    <div>
      <div>
        <div style={{ display: "flex" }}>
          <h3>SF</h3>
          <div>
            <b><Link to="list?genre=sf">더보기</Link></b>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ boxSizing: "content-box", margin: "10px" }}>
            <div>제목 1</div>
            <div><img src="https://placehold.co/100x200/000000/FFFFFF/png" alt="" /></div>
          </div>
          <div style={{ boxSizing: "content-box", margin: "10px" }}>
            <div>제목 2</div>
            <div><img src="https://placehold.co/100x200/000000/FFFFFF/png" alt="" /></div>
          </div>
        </div>
      </div>
      <div>
        <div style={{ display: "flex" }}>
          <h3>로맨스</h3>
          <div>
            <b><Link to="list?genre=romence">더보기</Link></b>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ boxSizing: "content-box", margin: "10px" }}>
            <div>제목 3</div>
            <div><img src="https://placehold.co/100x200/000000/FFFFFF/png" alt="" /></div>
          </div>
          <div style={{ boxSizing: "content-box", margin: "10px" }}>
            <div>제목 4</div>
            <div><img src="https://placehold.co/100x200/000000/FFFFFF/png" alt="" /></div>
          </div>
        </div>
      </div>

    </div >
  );
}
