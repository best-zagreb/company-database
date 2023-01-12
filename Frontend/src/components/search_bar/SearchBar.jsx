import { Autocomplete, TextField } from "@mui/material";

const UserSearchBar = ({ posts, setSearchResults }) => {
  const handleSearchChange = (e) => {
    if (!e.target.value) {
      return setSearchResults(posts); //ako nema nista u search baru renderaj samo sve sto je i bilo prije
    }

    const resultsArray = posts.filter((post) => {
      return (
        post.firstName.includes(e.target.value) ||
        post.lastName.includes(e.target.value) ||
        post.nickname?.includes(e.target.value) ||
        post.loginEmailString.includes(e.target.value)
      );
    });

    setSearchResults(resultsArray);
  };

  return (
    <>
      <Autocomplete
        freeSolo
        size="small"
        disableClearable
        onInputChange={handleSearchChange}
        options={posts.map((post) => post.firstName + " " + post.lastName)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search users"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
        sx={{ width: "50%", maxWidth: "15rem" }}
      />
    </>
  );
};

const CompanySearchBar = ({ posts, setSearchResults }) => {
  const handleSubmit = (e) => e.preventDefault();

  const handleSearchChange = (e) => {
    if (!e.target.value) {
      return setSearchResults(posts); //ako nema nista u search baru renderaj samo sve sto je i bilo prije
    }

    e.target.value = e.target.value.toLowerCase();

    const resultsArray = posts.filter((company) => {
      return (
        company.companyName.toLowerCase().includes(e.target.value) &&
        !(e.target.value === " ")
      );
    });

    setSearchResults(resultsArray);
  };

  return (
    <header>
      <form className="search" onSubmit={handleSubmit}>
        <input
          className="search__input"
          type="text"
          id="search__bar"
          onChange={handleSearchChange}
        />
      </form>
    </header>
  );
};

export { UserSearchBar, CompanySearchBar };
