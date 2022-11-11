import {useState, useEffect, useContext} from "react";
import {useRouter} from "next/router";
import {debounce} from "lodash";

import HomeComponent from "./home-component";
import {LanguageContext} from "../../providers/context";
import {searchByQueryAsync, wssBaseUrl} from "../../api";
import {ResultQuery} from "../../api/interfaces";

export default function Component() {
  const [counter, setCounter] = useState(0);
  const [query, setQuery] = useState("");
  const [data, setData] = useState<ResultQuery[]>([]);

  const onSearch = (q: string) => {
    setQuery(q);
    console.log(`called with ${q}`);
  };

  const router = useRouter();
  const onSearchValueSelected = (q: string) => router.push(`/search/${q}`);

  useEffect(() => {
    async function fetchData() {
      const fetchedData = await searchByQueryAsync(query);
      setData(fetchedData.searches);
    }

    if (query.length > 0) fetchData();
  }, [query]);

  const language = useContext(LanguageContext);

  return (
      <HomeComponent
        {...{
          q: query,
          counter,
          onSearch: debounce(onSearch, 10),
          onSearchValueSelected,
          language,
          data,
        }}
      />
  );
}
