import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import BarChart from "../components/BarChart";

const Stats = () => {
  let likes = 0;
  let dislikes = 0;
  let views = 0;
  ChartJS.register(ArcElement, Tooltip, Legend);
  const [posts, setPosts] = useState(null);
  async function getPosts() {
    try {
      const response = await axios.get("https://dummyjson.com/posts");
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error loading:", error);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  if (!posts) {
    return <div className="loader"></div>;
  }

  posts.forEach((post) => {
    likes += post.reactions.likes;
    dislikes += post.reactions.dislikes;
    views += post.views;
  });

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#e6e6e6",
        },
      },
      title: {
        display: true,
        text: "Reactions",
        color: "#e6e6e6",
      },
    },
  };
  let PieChartData = {
    labels: ["Likes", "Dislikes", "Views"],
    datasets: [
      {
        label: "Amount",
        data: [likes, dislikes, views],
        backgroundColor: ["#0F5088", "#4F0F75", "#B9201E"],
        borderColor: "black",
        borderWidth: 0.5,
      },
    ],
  };

  const likesData = posts.map((post) => post.reactions.likes);
  const dislikesData = posts.map((post) => post.reactions.dislikes);
  const viewsData = posts.map((post) => post.views);

  return (
    <div className="stats">
      <h1>Stats</h1>
      <div className="charts">
        <div className="piechart">
          <Doughnut options={options} data={PieChartData} />
        </div>
        <div className="barchart">
          <BarChart data={likesData} name="Likes" />
        </div>
      </div>
      <div className="charts">
        <div className="barchart50">
          <BarChart data={dislikesData} name="Dislikes" />
        </div>
        <div className="barchart50">
          <BarChart data={viewsData} name="Views" />
        </div>
      </div>
    </div>
  );
};

export default Stats;
