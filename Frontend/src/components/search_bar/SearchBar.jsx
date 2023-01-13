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
        // throws error because it takes string "firstName lastName" as key, needs to be changed to take id as key
        options={posts.map((user) => user.firstName + " " + user.lastName)}
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
      return (
        company.name.toLowerCase().includes(value) ||
        company.webUrl.toLowerCase().includes(value)
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
        // throws error because it takes string "firstName lastName" as key, needs to be changed to take id as key
        options={posts.map((company) => company.name)}
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

const ProjectSearchBar = ({ posts, setSearchResults }) => {
  const handleSearchChange = (value) => {
    value = value.toLowerCase();

    const resultsArray = posts.filter((project) => {
      return (
        project.name.toLowerCase().includes(value) ||
        project.category.toLowerCase().includes(value)
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
        // throws error because it takes string "firstName lastName" as key, needs to be changed to take id as key
        options={posts.map((project) => project.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search projects"
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

export { UserSearchBar, CompanySearchBar, ProjectSearchBar };
