import {
  cilBraille,
  cilFilterFrames,
  cilMedicalCross,
  cilPencil,
  cilPrint,
  cilSpreadsheet,
  cilTrash,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CContainer, CModal, CModalBody } from "@coreui/react";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import BasicProvider from "../../constants/BasicProvider";
import HelperFunctions from "../../helpers/HelperFunction";
import SubHeader from "../../components/custome/SubHeader";
import paginationRowsPerPage from "../../constants/paginationRowsPerPage";
import { DeleteModal } from "../../helpers/DeleteModal";
import ContactMessage from "../../components/models/ContactMessage";

var subHeaderItems = [
  {
    name: "All Contact",
    link: "/Contact/all",
    icon: cilSpreadsheet,
  },
];

export default function AllScrap() {
  const navigate = useNavigate();
  const [rowPerPage, setRowPerPage] = useState(10);
  const location = useLocation();

  const [userId, setuserId] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [contactMessage, setContactMessage] = useState(null);

  const [visible, setVisible] = useState(false);
  const [searchcurrentPage, setSearchCurrentPage] = useState(null);
  const query = new URLSearchParams(location.search);
  var count = query.get("count") || rowPerPage;
  var currentPage = parseInt(query.get("page") || 1);
  var search = query.get("search") || "";
  let [defaultPage, setDefaultPage] = useState(currentPage);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data?.contact);
  const toggleCleared = useSelector((state) => state.toggleCleared);
  const totalCount = useSelector((state) => state.totalCount);

  const updatePageQueryParam = (paramName, page) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(paramName, page);
    navigate({ search: searchParams.toString() });
  };

  useEffect(() => {
    if (rowPerPage) {
      fetchData();
    }
  }, [currentPage, rowPerPage, searchcurrentPage, search]);

  const fetchData = async () => {
    try {
      // setDefaultPage(currentPage)
      let performSearch = false;
      var queryData = {};
      for (const [key, value] of query.entries()) {
        if (key !== "page" && key !== "count") {
          queryData[key] = value;
          if (value !== "" && value !== null) {
            performSearch = true;
          }
        }
      }
      var response;
      if (performSearch) {
        queryData["page"] = currentPage;
        queryData["count"] = count;
        response = await new BasicProvider(
          `cms/contact/search?${HelperFunctions.convertToQueryString(
            queryData
          )}`,
          dispatch
        ).getRequest();
        dispatch({ type: "set", data: { contact: response?.data } });
      } else {
        response = await new BasicProvider(
          `cms/contact?page=${currentPage}&count=${count}`,
          dispatch
        ).getRequest();

        dispatch({ type: "set", data: { contact: response?.data?.data } });
        dispatch({ type: "set", totalCount: response.data.total });
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchSelectedRows = async () => {
      const savedSelectedRows = 10; //await handleSelectedRowChange('scraps')
      if (savedSelectedRows && !count) {
        setRowPerPage(savedSelectedRows);
      } else {
        setRowPerPage(count);
      }
    };
    fetchSelectedRows();
  }, [count]);

  const handleRowChange = useCallback((state) => {
    const rows = state.selectedRows;
    const rowsId = rows.map((item) => item._id);
    dispatch({ type: "set", selectedrows: rowsId });
  }, []);

  const handleFilter = async (search) => {
    try {
      const searchParams = new URLSearchParams(location.search);
      if (search) searchParams.set("search", search);
      navigate({ search: searchParams.toString() });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFilterReset = async () => {
    setSearchCurrentPage(1);
    currentPage = 1;
    setDefaultPage(1);
    navigate({ search: "" });
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => (
        <div className="pointer_cursor data_Table_title d-flex py-1">
          <div>
            <div className="product_name">{row?.name}</div>
            {/* <div className="product_slug"> /{row.slug}</div> */}
          </div>
        </div>
      ),
      // width: "20%",
    },

    {
      name: "Email",
      selector: (row) => <div className="data_table_colum">{row.email}</div>,
    },

    {
      name: "Mobile",
      selector: (row) => <div className="data_table_colum">{row.mobile}</div>,
    },

    {
      name: "Message",
      selector: (row) => (
        <div className="action-btn d-flex gap-2 ">
          <div className="edit-btn" style={{ cursor: "pointer" }}>
            <CIcon
              className="pointer_cursor"
              icon={cilFilterFrames}
              onClick={() => setContactMessage(row?.message)}
            />
          </div>
        </div>
      ),
    },

    {
      name: "Create At",
      selector: (row) => (
        <div className="data_table_colum">
          {moment(row?.createdAt).fromNow()}
        </div>
      ),
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="action-btn d-flex gap-2 ">
          <div className="edit-btn" style={{ cursor: "pointer" }}>
            {/* <CIcon
              className="pointer_cursor"
              icon={cilPencil}
              onClick={() => navigate(`/Contact/${row._id}/edit`)}
            /> */}
          </div>

          <div className="delet-btn" style={{ cursor: "pointer" }}>
            <CIcon
              className="pointer_cursor"
              icon={cilTrash}
              onClick={() => {
                setVisible(true);
                setuserId([row._id]);
              }}
            />
          </div>
        </div>
      ),
      ignoreRowClick: true,
      allowoverflow: true,
      button: "true",
    },
  ];

  const [selectedRowsPerModule, setSelectedRowsPerModule] = useState({});

  // Function to set selected rows for a specific module
  const setSelectedRowForModule = (moduleName, selectedRows) => {
    setSelectedRowsPerModule((prevState) => ({
      ...prevState,
      [moduleName]: selectedRows, // Save selected rows for the module
    }));
  };
  return (
    <>
      <SubHeader
        subHeaderItems={subHeaderItems}
        handleFilter={(search) => handleFilter(search)}
        setSearchCurrentPage={setSearchCurrentPage}
        onReset={() => handleFilterReset()}
        searchInput={search}
        rowPerPage={rowPerPage}
        defaultPage={defaultPage}
        moduleName="cms/contact"
        deletionType="delete"
        isHideAddButton={true}
      />

      <CContainer>
        {isLoading ? (
          <div className="custom-table-shimmer"></div>
        ) : (
          <div className="">
            <DataTable
              responsive="true"
              columns={columns}
              data={data}
              paginationServer
              paginationTotalRows={totalCount}
              paginationDefaultPage={defaultPage}
              onChangePage={(page) => {
                currentPage = page;
                setDefaultPage(parseInt(page));
                updatePageQueryParam("page", currentPage);
              }}
              pagination
              selectableRows
              selectableRowsHighlight
              highlightOnHover
              paginationRowsPerPageOptions={paginationRowsPerPage} // Add options here
              paginationPerPage={rowPerPage}
              onChangeRowsPerPage={(value) => {
                count = value;
                setRowPerPage(value);
                updatePageQueryParam("count", value);
                setSelectedRowForModule("Contact", value);
              }}
              onSelectedRowsChange={(state) => handleRowChange(state)}
              clearSelectedRows={toggleCleared}
            />
          </div>
        )}
      </CContainer>
      <DeleteModal
        visible={visible}
        userId={userId}
        moduleName="cms/contact"
        currentPage={currentPage}
        rowPerPage={rowPerPage}
        setVisible={setVisible}
        deletionType="delete"
        handleClose={() => setVisible(false)}
      />
      {contactMessage && (
        <ContactMessage
          contactMessage={contactMessage}
          setContactMessage={setContactMessage}
        />
      )}
    </>
  );
}
