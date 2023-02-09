import { createContext, useState } from "react";

const DeleteAlertContext = createContext();

export function DeleteAlertProvider({ children }) {
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [object, setObject] = useState();
  const [endpoint, setEndpoint] = useState();
  const [populateObjects, setPopulateObjects] = useState();

  return (
    <DeleteAlertContext.Provider
      value={{
        openDeleteAlert,
        setOpenDeleteAlert,

        object,
        setObject,

        endpoint,
        setEndpoint,

        populateObjects,
        setPopulateObjects,
      }}
    >
      {children}
    </DeleteAlertContext.Provider>
  );
}

export default DeleteAlertContext;
