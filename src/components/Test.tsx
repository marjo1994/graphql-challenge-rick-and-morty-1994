import { useQuery, gql } from "@apollo/client";

const TEST_QUERY = gql`
  query TestCharacters {
    characters(page: 1) {
      results {
        id
        name
      }
    }
  }
`;

export function TestComponent() {
  const { data, loading, error } = useQuery(TEST_QUERY);

  console.log(data, loading, error);

  return <div>Check console</div>;
}
