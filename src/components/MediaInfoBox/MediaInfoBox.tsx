import React from "react";

import Cast from "@/components/Cast/Cast";
import MediaDirectorOrNetwork from "@/components/MediaDirectorOrNetwork/MediaDirectorOrNetwork";
import MediaOverview from "@/components/MediaOverview/MediaOverview";
import Poster from "@/components/Poster/Poster";
import { Media } from "@/types/media";

import Heading from "../Heading/Heading";
import styles from "../MediaInfoBox/MediaInfoBox.module.scss";
import Tabs from "../Tabs/Tabs";

interface MediaInfoBoxProps {
  title: string;
  overview: string;
  poster: string;

  watch_providers: Media.IProviderList;
  release_date?: string;
  air_date?: string;
  cast: Media.ICastMember[];
  director?: Media.IDirector;
  network?: string[];
}

const MediaInfoBox: React.FC<MediaInfoBoxProps> = ({
  title,
  overview,
  poster,

  watch_providers,
  release_date,
  air_date,
  cast,
  director,
  network,
}) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.mediaInfoCard}>
          <Poster poster={poster} title={title} />
          <dl className={styles.details}>
            <MediaDirectorOrNetwork director={director} network={network} />
            <Cast cast={cast} />
          </dl>
        </div>

        <div className={styles.content}>
          <div className={styles.title}>
            <Heading as="h2" size="m">
              {title}
            </Heading>
          </div>

          <MediaOverview overview={overview} />
          <Tabs
            watch_providers={watch_providers}
            title={title}
            release_date={release_date}
            air_date={air_date}
          />
        </div>
      </div>
    </>
  );
};

export default MediaInfoBox;
