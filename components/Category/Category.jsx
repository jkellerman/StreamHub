import Card from "@/components/Card/Card";
import CardDetails from "@/components/CardDetails/CardDetails";
import styles from "@/components/Category/Category.module.css";
import Link from "next/link";

const Category = ({ data, category, type }) => {
  return (
    <section className={styles.section}>
      <div className={styles.headingContainer}>
        <div>
          <h1 className={styles.heading}>{category}</h1>

          {type === "movies" && (
            <svg
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.iconMovies}
            >
              <path
                d="M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.044 3.044 0 0 0 20 16.956V3.044A3.044 3.044 0 0 0 16.956 0ZM4 9H2V7h2v2Zm-2 2h2v2H2v-2Zm16-2h-2V7h2v2Zm-2 2h2v2h-2v-2Zm2-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM2.74 2H4v2H2V2.74A.74.74 0 0 1 2.74 2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm16 0a.74.74 0 0 1-.74.74H16v-2h2v1.26Z"
                fill="#FFF"
              />
            </svg>
          )}

          {type === "series" && (
            <svg
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.iconSeries}
            >
              <path
                d="M20 4.481H9.08l2.7-3.278L10.22 0 7 3.909 3.78.029 2.22 1.203l2.7 3.278H0V20h20V4.481Zm-8 13.58H2V6.42h10v11.64Zm5-3.88h-2v-1.94h2v1.94Zm0-3.88h-2V8.36h2v1.94Z"
                fill="#FFF"
              />
            </svg>
          )}
        </div>
        <Link href={`/${type}/${category.replace(/\s/g, "")}`}>
          <a className={styles.categoryLink}>see more</a>
        </Link>
      </div>
      <div className={styles.container}>
        {data.map((show) => {
          return (
            <article key={show.id} className={styles.linkContainer}>
              <Card
                id={show.id}
                image={show.backdrop_path}
                airDate={show.first_air_date}
                seriesName={show.name}
                releaseDate={show.release_date}
                title={show.title}
              />
              <CardDetails
                airDate={show.first_air_date}
                seriesName={show.name}
                releaseDate={show.release_date}
                title={show.title}
              />
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Category;
