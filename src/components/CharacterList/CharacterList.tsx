import { useCharactersQuery } from "../../__generated__/types";
import { useRef, useCallback } from "react";
import styles from "./CharacterList.module.scss";

export const CharacterList = () => {
  const { data, loading, error, fetchMore } = useCharactersQuery({
    variables: { page: 1 },
    notifyOnNetworkStatusChange: true,
  });

  const observer = useRef<IntersectionObserver | null>(null);

  const lastCharacterRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && data?.characters?.info?.next) {
          fetchMore({
            variables: { page: data.characters.info.next },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;
              return {
                characters: {
                  __typename: "Characters",
                  info: fetchMoreResult.characters?.info,
                  results: [
                    ...(prev.characters?.results ?? []),
                    ...(fetchMoreResult.characters?.results ?? []),
                  ],
                },
              };
            },
          });
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, data, fetchMore]
  );

  if (error) return <p className="error">Failed to Load Data</p>;

  //console.log("data", data);
  return (
    <div className={styles.characterList}>
      {data?.characters?.results?.map((char, index) => {
        if (!char) return null;

        const results = data.characters?.results;
        if (!results) return null;

        const isLastItem = index === results.length - 1;

        return (
          <div
            key={char.id}
            ref={isLastItem ? lastCharacterRef : undefined}
            className={styles.characterItem}
          >
            <h2>{char.name}</h2>
            <p>{char.species}</p>
          </div>
        );
      })}
      {loading && <p className="loading">Loading...</p>}
    </div>
  );
};
