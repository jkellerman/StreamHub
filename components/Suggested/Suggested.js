import styles from "@/components/Suggested/Suggested.module.css";
import Link from "next/link";
import Image from "next/image";
import { BASE_URL_IMAGE, shimmer, toBase64 } from "@/utils/utils";

const Suggested = ({ suggested, movies, closeReadMore }) => {
  const suggestedArr = suggested.results.filter(
    (suggested) => suggested.backdrop_path !== null
  );

  return (
    <section className={styles.container}>
      <div className={styles.heading}>suggested</div>

      {suggested.results.length > 0 ? (
        <div className={styles.suggestions}>
          {suggestedArr.map((suggestion) => {
            return (
              <article key={suggestion.id} className={styles.linkContainer}>
                <Link
                  href={
                    movies
                      ? `/movies/${suggestion.id}/${suggestion.title.replace(
                          /\s+/g,
                          "-"
                        )}`
                      : `/series/${suggestion.id}/${suggestion.name.replace(
                          /\s+/g,
                          "-"
                        )}`
                  }
                >
                  <a
                    className={styles.suggestionContainer}
                    onClick={() => closeReadMore()}
                  >
                    <Image
                      src={`${BASE_URL_IMAGE}${suggestion.backdrop_path}`}
                      alt={`${suggestion.title} backdrop`}
                      layout="fill"
                      objectFit="cover"
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        shimmer(240, 140)
                      )}`}
                    />
                  </a>
                </Link>
                {movies ? (
                  <div className={styles.name}>
                    {suggestion.title.length > 40
                      ? `${suggestion.title.slice(0, 40)}...`
                      : suggestion.title}
                  </div>
                ) : (
                  <div className={styles.name}>
                    {suggestion.name.length > 40
                      ? `${suggestion.name.slice(0, 40)}...`
                      : suggestion.name}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      ) : (
        <div className={styles.message}>No suggestions yet</div>
      )}
    </section>
  );
};

export default Suggested;
