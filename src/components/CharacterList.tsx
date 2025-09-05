import { useCharactersQuery } from "../__generated__/types";

export const CharacterList = () => {
  const { data, loading, error } = useCharactersQuery({
    variables: { page: 1 },
  });

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Failed to Load Data</p>;
  console.log("data", data);
  return (
    <div className="characterList">
      <div className="character">
        {data?.characters?.results?.map((char) =>
          char ? (
            <>
              <h2 key={char.id}>{char.name}</h2>
              <p>{char.species}</p>
            </>
          ) : null
        )}
      </div>
    </div>
  );
};
