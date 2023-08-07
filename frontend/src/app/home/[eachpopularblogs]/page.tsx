"use client";
import axios from "axios";
// import { useParams, useRouter } from "next/Navigation";
import router from "next/router";
import { useEffect } from "react";

// // interface Iblogs {
// //   id: number;
// //   title: string;
// //   description: string;
// //   image: string;
// //   author: string;
// //   date: string;
// }

function Eachpopularblog() {
  const { home } = router.query;

  // const [blogData, setBlogData] = useState<Iblogs>();
  useEffect(() => {
    // Fetching data from json server
    axios
      .get(`http://localhost:4000/popular_blogs/${home}`)
      .then((response) => {
        // setBlogData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [home]);

  return (
    <div>
      <h1>idblogs</h1>
    </div>
  );
}

export default Eachpopularblog;
