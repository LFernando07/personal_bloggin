import React from "react";
import { CategoryBar } from "../components/category/CategoryBar";
import '../style/Principal.css';
import CategoryFormCreated from "../components/category/CategoryFormCreated";

export const Principal = () => {
  return (
    <div className="container">
      <div className="item">
        <h1>Welcome to the Personal Blog</h1>
      </div>
      <div className="item">
        <div className="category-head">
          <h1>Categorias</h1>
          <CategoryFormCreated />

        </div>
        <hr />
        <CategoryBar />
      </div>
      <div className="item">
        <img src="blog.png" alt="Blog image" />

      </div>
    </div>
  );

}