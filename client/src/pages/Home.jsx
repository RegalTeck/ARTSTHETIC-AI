import React, { useState, useEffect } from "react";

import { Loader, Card, FormField } from "../components";
import "./Home.css";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();

          setAllPosts(result.data.reverse());
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);

    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );

        setSearchedResults(searchResults);
      }, 500)
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h3
          className=" text-[#000000] text-[22px] max-w[500px] text-center
        rounded-lg   px-5 py-5 transition ease-in-out delay-150 bg-[#008080]-500 hover:-translate-x-1 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100 duration-300 "
        >
          <span className="mt-2 text-[24px]">ARTSTHETIC AI:</span> "Create Image
          with Imagination"
        </h3>
      </div>

      <div className="text-center rounded-lg px-5 py-5 transition ease-in-out delay-150 bg-[#008080]-500 hover:-translate-x-1 hover:-translate-y-1 hover:scale-100 hover:text-gray-100 hover:bg-gray-200 duration-300 ">
        <p className="text-[#ffffff]">Explore</p>
      </div>

      <div className="Home">
        <div className="Home-one rounded-lg mt-2 mb-2 border-2 px-4 py-4 transition ease-in-out delay-150 bg-gray-200 hover:-translate-x-1 hover:-translate-y-1 hover:scale-100 hover:text-blue-100 hover:bg-gray-400  duration-300">
          <h3 className="mt-2 text-[22px] max-w[500px] mb-5 text-center hover:text-blue-600">
            Inspire and be Inspired
          </h3>
          <p className="home-inner text-[#000000] tracking-normal">
            Immerse yourself in a vibrant community of artists. Discover
            incredible artwork created by fellow users.
            <br />
            Explore a vast library of artistic styles and effortlessly apply
            them to your project.
          </p>
        </div>
        <div className="Home-two rounded-lg mt-2 mb-2 border-2 px-4 py-4 transition ease-in-out delay-150 bg-gray-200 hover:-translate-x-1 hover:-translate-y-1 hover:scale-100 hover:text-blue-100 hover:bg-gray-400 duration-300 ">
          <h3 className="mt-2 text-[22px] max-w[500px] mb-5 text-center hover:text-blue-600">
            Create beauty, Share and Showcase
          </h3>
          <p className="home-inner text-[#000000] tracking-normal">
            Create stunning realistic images for your works and projects in a
            munite. Quality resolution and no watermarks. <br />
            Share your stunning creations directly from the app to social media
            platforms, online galleries, or print them as high-quality art
            prints. Let the world experience your unique artistic vision.
          </p>
        </div>
        <div className="Home-three rounded-lg mt-2 mb-2 border-2 px-4 py-4 transition ease-in-out delay-150 bg-gray-200 hover:-translate-x-1 hover:-translate-y-1 hover:scale-100 hover:text-blue-100 hover:bg-gray-400 duration-300 ">
          <h3 className="mt-2 text-[22px] max-w[500px] mb-2 text-center hover:text-blue-600">
            Intuitive Interface
          </h3>
          <p className="home-inner text-[#000000] tracking-normal">
            ARTSTHETIC AI user-friendly interface makes it easy for anyone,
            regardless of their artistic background, to dive into the world of
            digital art.
            <br /> No coding or complex software required—just unleash your
            creativity and let ARTSTHETIC AI handle the rest.
          </p>
        </div>
      </div>

      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px] hover:text-blue-600">
          The Community Showcase
        </h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w[500px]">
          Browse through a collection of imaginative and visual stunning images
          generated by ARTSTHETIC AI
        </p>
      </div>

      <div className="mt-16">
        <FormField
          labelName="search posts"
          type="text"
          name="text"
          placeholder="search posts"
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing results for{" "}
                <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No search results found"
                />
              ) : (
                <RenderCards data={allPosts} title="No posts found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
