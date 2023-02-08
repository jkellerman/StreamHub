import {
  BASE_TMDB_QUERY_PARAMS_END,
  BASE_TMDB_QUERY_SEARCH_PARAMS,
  BASE_TMDB_URL,
} from "@/constants/tmdb";
import QueryString from "qs";

export default async function handler(req, res) {
  try {
    const { id, ...queryParams } = req.query;
    const queryString = QueryString.stringify(
      {
        ...BASE_TMDB_QUERY_SEARCH_PARAMS,
        query: id,
        ...queryParams,
        include_adult: "false",
      },
      { addQueryPrefix: true }
    );

    const url = `${BASE_TMDB_URL}/search/tv${queryString}`;
    console.info("🚀 Request URL: ", url);

    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
