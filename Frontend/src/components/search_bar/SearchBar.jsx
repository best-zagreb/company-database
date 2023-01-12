const UserSearchBar = ({ posts, setSearchResults }) => {
  const handleSubmit = (e) => e.preventDefault();

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

const CompanySearchBar = ({ posts, setSearchResults }) => {
  const handleSubmit = (e) => e.preventDefault();

  const handleSearchChange = (e) => {
    if (!e.target.value) {
      return setSearchResults(posts); //ako nema nista u search baru renderaj samo sve sto je i bilo prije
    }

    const resultsArray = posts.filter((post) => {
      return (
        post.name.includes(e.target.value) ||
        post.webUrl.includes(e.target.value) 
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

const ProjectSearchBar = ({ posts, setSearchResults }) => {
  const handleSubmit = (e) => e.preventDefault();

  const handleSearchChange = (e) => {
    if (!e.target.value) {
      return setSearchResults(posts); //ako nema nista u search baru renderaj samo sve sto je i bilo prije
    }

    const resultsArray = posts.filter((post) => {
      return (
        post.name.includes(e.target.value) ||
        post.category.includes(e.target.value) 
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

export {UserSearchBar, CompanySearchBar, ProjectSearchBar};
