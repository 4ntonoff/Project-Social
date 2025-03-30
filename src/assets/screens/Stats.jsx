import React, { useState, useEffect, useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import BarChart from "../components/BarChart";

const Stats = () => {
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

  const likesData = useMemo(
    () => posts?.map((post) => post.reactions.likes) || [],
    [posts]
  );
  const dislikesData = useMemo(
    () => posts?.map((post) => post.reactions.dislikes) || [],
    [posts]
  );
  const viewsData = useMemo(
    () => posts?.map((post) => post.views) || [],
    [posts]
  );

  if (!posts) {
    return <div className="loader"></div>;
  }

  const { likes, dislikes, views } = posts.reduce(
    (acc, post) => {
      acc.likes += post.reactions.likes;
      acc.dislikes += post.reactions.dislikes;
      acc.views += post.views;
      return acc;
    },
    { likes: 0, dislikes: 0, views: 0 }
  );

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

  const PieChartData = {
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
