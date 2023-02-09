import styles from "../HeroContent/HeroContent.module.css";
import {
  toHoursAndMinutes,
  POSTER_URL_IMAGE,
  shimmer,
  toBase64,
  DATE_SLICE,
} from "@/utils/utils";
import StarRating from "../StarRating/StarRating";
import Image from "next/future/image";
const OVERVIEW_CUTOFF = 320;

const Content = ({
  title,
  tagline,
  age_rating,
  series_age_rating,
  release_date,
  runtime,
  rating,
  overview,
  poster,
  air_date,
  seasons,
}) => {
  return (
    <div className={styles.container}>
      <Image
        src={`${POSTER_URL_IMAGE}${poster}`}
        alt={`${title} poster`}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(240, 140))}`}
        unoptimized={true}
        width={150}
        height={230}
        className={styles.poster}
        priority={true}
      />

      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.tagline}>
          {tagline !== "" ? `"${tagline}"` : null}
        </div>
        <div>
          <ul className={styles.list}>
            {age_rating && <li className={styles.ageRating}>{age_rating}</li>}

            {series_age_rating && (
              <li className={styles.ageRating}>
                {series_age_rating.length === 0 ? "NR" : `${series_age_rating}`}
              </li>
            )}

            {release_date ? (
              <li>{release_date.slice(0, DATE_SLICE)}</li>
            ) : (
              <li>{air_date.slice(0, DATE_SLICE)}</li>
            )}
            {runtime ? (
              <li
                className={rating > 0 ? styles.runtime : styles.displayRuntime}
              >
                {toHoursAndMinutes(runtime)}
              </li>
            ) : (
              <li className={styles.seasons}>
                {seasons > 1 ? `${seasons} seasons` : `${seasons} season`}
              </li>
            )}
            <li>{rating > 0 && <StarRating rating={rating} />}</li>
          </ul>
        </div>
        <p className={styles.overview}>
          {overview.length > OVERVIEW_CUTOFF
            ? `${overview.slice(0, OVERVIEW_CUTOFF)}...`
            : overview}
        </p>
      </div>
    </div>
  );
};

export default Content;
