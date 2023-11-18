import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import QueryString from "qs";

import CTA from "@/components/CallToActionSection/CallToActionSection";
import CardList from "@/components/CardList/CardList";
import Dropdown, {
  DropdownsContainer,
  DropdownsInnerContainer,
  DropdownsOuterContainer,
} from "@/components/Dropdown/Dropdown";
import Heading from "@/components/Heading/Heading";
import Description from "@/components/MediaPageDescription/MediaPageDescription";
import { DEFAULT_GENRE, DEFAULT_NETWORK } from "@/constants/app";
import { BASE_TMDB_URL, BASE_TMDB_QUERY_PARAMS, seriesNetworkList } from "@/constants/tmdb";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { Media } from "@/types/media";

interface GenreSeriesProps {
  genreList: Media.IGenre[];
}

const GenreSeries: React.FC<GenreSeriesProps> = ({ genreList }) => {
  const { query } = useRouter();

  const slug = query.slugs;

  const genre =
    (genreList &&
      genreList.find((genre) => slug?.includes(genre.name.toLowerCase().replaceAll(" ", "-")))) ||
    DEFAULT_GENRE;

  const network =
    seriesNetworkList.find(({ provider_name }) =>
      slug?.includes(provider_name.toLowerCase().replaceAll(" ", "-"))
    ) ?? DEFAULT_NETWORK;

  const isDefaultNetwork = network.provider_name === DEFAULT_NETWORK.provider_name;
  const endpoint = !isDefaultNetwork
    ? `/api/network/tv/${network.provider_id}`
    : `/api/network/tv/8|337|9|531|29|350|38|103|380`;

  const { cards, isLoading, isError, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteScroll(endpoint);

  return (
    <>
      <Head>
        <title>{`What's on ${network.provider_name} | StreamHub`}</title>
        <meta
          name="description"
          content="Find out where to watch series from Netflix, Amazon Prime, Disney+ and many more services"
        />
      </Head>
      <main>
        <DropdownsOuterContainer>
          <Heading as="h1" size="s">
            Series:
          </Heading>
          <DropdownsInnerContainer>
            <DropdownsContainer>
              <Dropdown
                type="series"
                selected_genre={genre}
                genre_list={genreList}
                variant="genre"
                selected_network={network}
                style="primary"
              />
            </DropdownsContainer>
            <DropdownsContainer>
              <Dropdown
                type="series"
                selected_network={network}
                network_list={seriesNetworkList}
                selected_genre={genre}
                variant="service"
                style="primary"
              />
            </DropdownsContainer>
          </DropdownsInnerContainer>
        </DropdownsOuterContainer>

        <Description type="series" />
        <section>
          <CardList
            cards={cards}
            isLoading={isLoading}
            isError={isError}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
          />
        </section>

        <CTA />
      </main>
    </>
  );
};

export default GenreSeries;

export async function getStaticPaths() {
  const paths = seriesNetworkList.map((slug) => ({
    params: { slugs: [slug.provider_name] },
  }));

  return {
    paths,
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(
    `${BASE_TMDB_URL}/genre/tv/list?${QueryString.stringify(BASE_TMDB_QUERY_PARAMS)}`
  );
  const genreList = await response.json();

  return {
    props: {
      genreList: [DEFAULT_GENRE, ...genreList.genres],
    },
  };
};
