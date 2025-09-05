import { useCharacterQuery } from "../../__generated__/types";
import styles from "./CharacterDetail.module.scss";
import wheel from "../../assets/wheel-icon.svg";

type Props = {
  characterId: string | null;
};

export const CharacterDetails = ({ characterId }: Props) => {
  const { data, loading, error } = useCharacterQuery({
    variables: { id: characterId! },
  });

  if (loading) {
    return (
      <div className="loading">
        <img src={wheel} alt="wheel icon" />
        Loading...
      </div>
    );
  }
  if (error) return <div className="error">Error</div>;
  if (!data?.character) return <div>Character not found</div>;

  const char = data?.character;
  const episodes = char.episode?.slice(0, 5) || [];

  return (
    <div className={styles.characterDetails}>
      <h2 className={styles.subtitle}>General Information</h2>
      {char.image && (
        <img
          src={char.image}
          alt={char.name ?? `Rick and Morty Character`}
          loading="lazy"
        />
      )}
      {char.name && (
        <div className={styles.detail}>
          <p className={styles.label}>Name</p>
          <p className={styles.info}>{char.name}</p>
        </div>
      )}
      {char.species && (
        <div className={styles.detail}>
          <p className={styles.label}>Species</p>
          <p className={styles.info}>{char.species}</p>
        </div>
      )}
      {char.status && (
        <div className={styles.detail}>
          <p className={styles.label}>Status</p>
          <p className={styles.info}>{char.status}</p>
        </div>
      )}
      {char.gender && (
        <div className={styles.detail}>
          <p className={styles.label}>Gender</p>
          <p className={styles.info}>{char.gender}</p>
        </div>
      )}
      {char.origin && (
        <div className={styles.detail}>
          <p className={styles.label}>Origin</p>
          <p className={styles.info}>{char.origin?.name}</p>
        </div>
      )}
      {char.location && (
        <div className={styles.detail}>
          <p className={styles.label}>Location</p>
          <p className={styles.info}>{char.location?.name}</p>
        </div>
      )}

      <h2 className={styles.secondSubtitle}>Episodies</h2>
      {episodes.length > 0 ? (
        episodes.map((episode) => (
          <div key={episode?.id} className={styles.detail}>
            <p className={styles.label}>{episode?.name}</p>
          </div>
        ))
      ) : (
        <div className={styles.detail}>
          <p className={styles.label}>No episodes found</p>
        </div>
      )}
    </div>
  );
};
