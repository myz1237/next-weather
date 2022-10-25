import Link from "next/link";
import Router from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";

import cities from "../../lib/city.list.json";
import { City, CityData } from "../../utils/types";

const SearchBox = ({ placeholder }: { placeholder: string }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Array<CityData>>([]);

  useEffect(() => {
    const clearQuery = () => setQuery("");

    // the page has been changed, meaning you do a query and then I clean the query
    Router.events.on("routeChangeComplete", clearQuery);

    return () => {
      Router.events.off("routeChangeComplete", clearQuery);
    };
  }, []);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setQuery(value);
    const matchCities: Array<CityData> = [];

    if (value.length > 3) {
      const cityArray = cities as City[];

      for (const city of cityArray) {
        if (matchCities.length >= 5) {
          break;
        }
        const match = city.name.toLowerCase().startsWith(value.toLowerCase());

        if (match) {
          matchCities.push({
            ...city,
            slug: `${city.name.toLowerCase().replaceAll(" ", "-")}-${city.id}`,
          });
        }
      }
    }
    return setResults(matchCities);
  };

  return (
    <div className="search">
      <input
        type={"text"}
        placeholder={placeholder}
        value={query}
        onChange={onChange}
      ></input>
      {query.length > 3 && (
        <ul>
          {results.length > 0 ? (
            results.map((city) => (
              <li key={city.slug}>
                <Link href={`/location/${city.slug}`}>
                  <a>
                    {city.name}
                    {city.state ? `, ${city.state}` : ""}{" "}
                    <span style={{ color: "blue" }}>{`, ${city.country}`}</span>
                  </a>
                </Link>
              </li>
            ))
          ) : (
            <li className="search__no-results">No search results</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
