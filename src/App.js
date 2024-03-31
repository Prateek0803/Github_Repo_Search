import { useCallback, useState } from "react";
import "./App.css";
import axios from "axios";
import Card from "./Components/Card/Card";
import UseDebounce from "./hooks/UseDebounce";
import { sortOptions } from "./utils";
import moment from "moment";

function App() {
  const [query, setQuery] = useState("");
  const [repoData, setRepoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [error, setError] = useState(null);
  const debouncedValue = UseDebounce(query, 50);

  const fetch = async () => {
    const URL = `https://api.github.com/search/repositories?q=${debouncedValue}`;
    try {
      setLoading(true);
      const res = await axios.get(URL);
      if (res.status === 200) {
        setRepoData(res.data.items);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      setQuery("");
    }
  };
  const searchHandler = useCallback(() => {
    if (!debouncedValue.trim()) {
      alert("Please enter a valid value");
    } else {
      fetch(debouncedValue);
    }
  }, [debouncedValue]);

  const optionsHandler = useCallback(
    (e) => {
      try {
        const option = e.target.value;
        setSelectedOption(option);
        setLoading(true);
        const data = [...repoData];
        data.sort((a, b) => {
          if (option === "name") {
            return a[option].localeCompare(b[option]);
          } else if (option === "created_at" || option === "updated_at") {
            const format = "YYYY-MM-DDTHH:mm:ssZ";
            return moment(b[option], format).diff(moment(a[option], format));
          }
          return b[option] - a[option];
        });
        setRepoData(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    },
    [repoData, selectedOption]
  );

  return (
    <div className="App">
      <h2>Your own search box for awesome public repo</h2>
      <div className="input_container">
        <input
          placeholder="Search repos here"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn" onClick={searchHandler}>
          {" "}
          Search
        </button>
        <div>
          <select
            className="sort-container"
            value={selectedOption}
            onChange={optionsHandler}
          >
            <option value="">Sort By</option>
            {sortOptions.map((field) => (
              <option value={field.value} key={field.title}>
                {field.title}{" "}
              </option>
            ))}
          </select>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      <div className="card-container">
        {repoData?.map((ins, index) => (
          <Card data={ins} key={index} />
        ))}
      </div>
    </div>
  );
}

export default App;
