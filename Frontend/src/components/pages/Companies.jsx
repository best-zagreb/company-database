import {
  Container,
  Box,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { AddCircle as AddCircleIcon } from "@mui/icons-material";

import { useState, useEffect, useContext } from "react";

import ToastContext from "../../context/ToastContext";
// import DeleteAlertContext from "../../context/DeleteAlertContext";

import CompanyForm from "../forms/CompanyForm";

import SearchBar from "./partial/SearchBar";
import TableComponent from "./partial/TableComponent";

const tableColumns = [
  {
    key: "name",
    label: "Company name",
  },
  {
    key: "domain",
    label: "Industry",
  },
  {
    key: "abcCategory",
    label: "ABC categorization",
    xsHide: true,
  },
  {
    key: "budgetPlanningMonth",
    label: "Budget planning month",
    xsHide: true,
  },
  {
    key: "webUrl",
    label: "Webpage URL",
    xsHide: true,
  },
];

export default function Companies() {
  const { handleOpenToast } = useContext(ToastContext);

  const [openFormModal, setOpenFormModal] = useState(false);

  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [loading, setLoading] = useState(true);

  async function populateTable() {
    setLoading(true);

    const JWToken = JSON.parse(localStorage.getItem("loginInfo")).JWT;

    try {
      const serverResponse = await fetch("http://localhost:8080/companies/", {
        method: "GET",
        headers: { googleTokenEncoded: JWToken.credential },
      });

      if (serverResponse.ok) {
        const json = await serverResponse.json();

        setData(json);
        setSearchResults(json);
      } else {
        handleOpenToast({
          type: "error",
          info: "A server error occurred whilst fetching data.",
        });
      }
    } catch (error) {
      handleOpenToast({
        type: "error",
        info: "An error occurred whilst trying to connect to server.",
      });
    }

    setLoading(false);
  }

  // function handleEdit(company) {
  //   setUser(company);
  //   setOpenFormModal(true);
  // }

  // async function handleDelete(company) {
  //   setObject({ type: "Company", name: company.name });
  //   setEndpoint("http://localhost:8080/company/" + company.id);
  //   setPopulateObjects({ function: populateTable });

  //   setOpenDeleteAlert(true);
  // }

  useEffect(() => {
    populateTable();
  }, []);

  return (
    <>
      <CompanyForm
        openModal={openFormModal}
        setOpenModal={setOpenFormModal}
        populateCompanies={populateTable}
      />

      <Container
        maxWidth="false"
        sx={{
          paddingBlock: 1.5,

          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
        }}
      >
        <SearchBar
          type="companies"
          data={data}
          setSearchResults={setSearchResults}
        />

        <Button
          variant="contained"
          size="medium"
          startIcon={<AddCircleIcon />}
          onClick={() => setOpenFormModal(true)}
        >
          Add company
        </Button>
      </Container>

      <Container maxWidth="false">
        {loading ? (
          <Box sx={{ display: "grid", placeItems: "center" }}>
            <CircularProgress size={100} />
          </Box>
        ) : data?.length <= 0 ? (
          <Typography variant="h4" align="center">
            {"No companies :("}
          </Typography>
        ) : (
          <TableComponent
            tableColumns={tableColumns}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
            // handleEdit={handleEdit}
            // handleDelete={handleDelete}
          ></TableComponent>
        )}
      </Container>
    </>
  );
}
