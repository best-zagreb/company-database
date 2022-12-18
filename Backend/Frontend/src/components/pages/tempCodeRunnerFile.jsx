fetch("http://159.65.127.217:8080/companies/delete-company/", {
      method: "DELETE",
      headers: {
        Authorization: "Basic " + window.btoa("admin:pass"),

        "Content-Type": "application/json",
      },
      body: JSON.stringify({ companyName : companyName }),
    })
      .then((response) => response.json())
      .then((json) => {
        fetchUsers();
      });