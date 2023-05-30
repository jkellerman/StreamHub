import Image from "next/future/image";
import React, { useEffect } from "react";

import JustWatchLogo from "@/components/atoms/JustWatchLogo/JustWatchLogo";
import { LOGO_URL_IMAGE } from "@/constants/tmdb";
import { Media } from "@/src/types";

import styles from "../WatchProvidersTab/WatchProvidersTab.module.scss";
const LOGO_SIZE = 35;

interface WatchProvidersTabProps {
  watch_providers: Media.IProviderList;
  activeTab: string;
  stream?: boolean;
  rent?: boolean;
  buy?: boolean;
}

const WatchProvidersTab: React.FC<WatchProvidersTabProps> = ({
  watch_providers,
  activeTab,
  stream,
  rent,
  buy,
}) => {
  useEffect(() => {
    console.log(watch_providers);
  }, [watch_providers]);
  return (
    <>
      {stream && (
        <div
          className={activeTab === "stream" ? `${styles.container} ${styles.active}` : undefined}
        >
          <JustWatchLogo tab />
          <div className={styles.providers}>
            {watch_providers.flatrate === undefined && <span>Not available to stream online</span>}
            {watch_providers.flatrate && (
              <div className={styles.icons}>
                {watch_providers.flatrate.map((provider) => {
                  return (
                    <div key={provider.provider_id} className={styles.provider}>
                      <div className={styles.iconWrapper}>
                        <Image
                          src={`${LOGO_URL_IMAGE}${provider.logo_path}`}
                          alt={provider.provider_name}
                          unoptimized={true}
                          className={styles.icon}
                          width={LOGO_SIZE}
                          height={LOGO_SIZE}
                        />
                      </div>
                      <div className={styles.providerDetails}>
                        <span>{provider.provider_name}</span>
                        <span className={styles.subscription}>subscription</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
      {rent && (
        <div
          className={activeTab === "stream" ? `${styles.container} ${styles.active}` : undefined}
        >
          <JustWatchLogo tab />
          <div className={styles.providers}>
            {watch_providers.rent === undefined && <span>Not available to rent online</span>}
            {watch_providers.rent && (
              <div className={styles.icons}>
                {watch_providers.rent.map((provider) => {
                  return (
                    <div key={provider.provider_id} className={styles.provider}>
                      <div className={styles.iconWrapper}>
                        <Image
                          src={`${LOGO_URL_IMAGE}${provider.logo_path}`}
                          alt={provider.provider_name}
                          unoptimized={true}
                          className={styles.icon}
                          width={LOGO_SIZE}
                          height={LOGO_SIZE}
                        />
                      </div>
                      <div className={styles.providerDetails}>
                        <span>{provider.provider_name}</span>
                        {/* <span className={styles.subscription}>subscription</span> */}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
      {buy && (
        <div
          className={activeTab === "stream" ? `${styles.container} ${styles.active}` : undefined}
        >
          <JustWatchLogo tab />
          <div className={styles.providers}>
            {watch_providers.buy === undefined && <span>Not available to buy online</span>}
            {watch_providers.buy && (
              <div className={styles.icons}>
                {watch_providers.buy.map((provider) => {
                  return (
                    <div key={provider.provider_id} className={styles.provider}>
                      <div className={styles.iconWrapper}>
                        <Image
                          src={`${LOGO_URL_IMAGE}${provider.logo_path}`}
                          alt={provider.provider_name}
                          unoptimized={true}
                          className={styles.icon}
                          width={LOGO_SIZE}
                          height={LOGO_SIZE}
                        />
                      </div>
                      <div className={styles.providerDetails}>
                        <span>{provider.provider_name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default WatchProvidersTab;
