import Head from "next/head";
import SearchBar from "@/components/atoms/SearchBar/SearchBar";
import CategoryResults from "@/components/organisms/MediaCategory/MediaCategory";

const Trending = () => {
  return (
    <>
      <Head>
        <title>Trending | Streaming Movies and TV series guide</title>
        <meta
          name="description"
          content="Reelgood allows you to search and discover any movie or TV show across Netflix, Disney, Amazon and many other other providers in one place."
        />
      </Head>
      <main>
        <SearchBar all />
        <CategoryResults
          endpoint="api/trending"
          category="trending"
          type="trending"
        />
      </main>
    </>
  );
};

export default Trending;
