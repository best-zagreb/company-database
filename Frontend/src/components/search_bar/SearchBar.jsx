import { Autocomplete, TextField } from "@mui/material";

const UserSearchBar = ({ posts, setSearchResults }) => {
  const handleSearchChange = (value) => {
    value = value.toLowerCase();

    const resultsArray = posts.filter((user) => {
      return (
        (user.firstName + " " + user.lastName).toLowerCase().includes(value) ||
        user.nickname?.toLowerCase().includes(value) ||
        user.loginEmailString.toLowerCase().includes(value)
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
        onInputChange={(e, inputValue) => {
          handleSearchChange(inputValue);
        }}
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
  const handleSearchChange = (value) => {
    value = value.toLowerCase();

    const resultsArray = posts.filter((company) => {
      return company.companyName.toLowerCase().includes(value);
    });

    setSearchResults(resultsArray);
  };

  return (
    <>
      <Autocomplete
        freeSolo
        size="small"
        disableClearable
        onInputChange={(e, inputValue) => {
          handleSearchChange(inputValue);
        }}
        options={posts.map((post) => post.companyName)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search companies"
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

export { UserSearchBar, CompanySearchBar };
