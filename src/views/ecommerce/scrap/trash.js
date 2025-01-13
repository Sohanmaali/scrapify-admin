import { cilPencil, cilReload, cilSpreadsheet, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CContainer } from "@coreui/react";
// import moment from 'moment'
import { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import SubHeader from "../../../components/custome/SubHeader";
import { DeleteModal } from "../../../helpers/DeleteModal";
import BasicProvider from "../../../constants/BasicProvider";

import DateTimeHelper from "../../../helpers/DateTimeHepler";
// const URL = process.env.REACT_APP_NODE_URL

var subHeaderItems = [
  {
    name: "All scrap",
    link: "/scrap/all",
    icon: cilSpreadsheet,
  },
  {
    name: "Create scrap",
    link: "/scrap/create",
    icon: cilPencil,
  },
];

export default function ScrapTrash() {
  const navigate = useNavigate();
  const [rowPerPage, setRowPerPage] = useState(10);
  const location = useLocation();

  const [userId, setuserId] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [visible, setVisible] = useState(false);
  const [searchcurrentPage, setSearchCurrentPage] = useState(null);
  const query = new URLSearchParams(location.search);
  var count = query.get("count") || rowPerPage;
  var currentPage = parseInt(query.get("page") || 1);
  var search = query.get("search") || "";
  let [defaultPage, setDefaultPage] = useState(currentPage);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data?.scrap_trash);
  const toggleCleared = useSelector((state) => state.toggleCleared);
  const totalCount = useSelector((state) => state.totalCount);

  const updatePageQueryParam = (paramName, page) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(paramName, page);
    navigate({ search: searchParams.toString() });
  };

  // console.log("data=========>", data);

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
      // console.log(performSearch);
      if (performSearch) {
        queryData["page"] = currentPage;
        queryData["count"] = count;
        // response = await new BasicProvider(`
        //   customers/onlycustomer?${HelperFunction.convertToQueryString(
        //     queryData
        //   )}`).getRequest();
        // console.log(response);
      } else {
        response = await new BasicProvider(
          `ecommerce/scrap/trash?page=${currentPage}&count=${count}`,
          dispatch
        ).getRequest();
      }
      console.log("response", response);

      dispatch({ type: "set", data: { scrap_trash: response?.data?.data } });
      dispatch({ type: "set", totalCount: response.data.total });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchSelectedRows = async () => {
      const savedSelectedRows = 10; //await handleSelectedRowChange('customers')
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

  const restore = async (id) => {
    const responce = await new BasicProvider(
      `ecommerce/scrap/multi/restore`,
      dispatch
    ).patchRequest({
      ids: [id],
    });

    fetchData();
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => (
        <div
          className="pointer_cursor data_Table_title d-flex py-1"

          // onClick={() => navigate(/customers/${row._id}/info)}
        >
          <div>
            <div className="product_name">
              {row?.first_name} {row?.last_name}
            </div>
            {/* <div className="product_slug"> /{row.slug}</div> */}
          </div>
        </div>
      ),
      // width: "20%",
    },

    {
      name: "Mobile",
      selector: (row) => <div className="data_table_colum">{row.mobile}</div>,
    },
    {
      name: "Work Date",
      selector: (row) => (
        <div className="data_table_colum">
          {DateTimeHelper.formatDate(row.work_date)}
        </div>
      ),
    },
    {
      name: "Price",
      selector: (row) => (
        <div className="data_table_colum">
          {row.price}
          {process.env.REACT_APP_CURRENCY}
        </div>
      ),
    },
    {
      name: "Delete At",
      selector: (row) => (
        <div className="data_table_colum">
          {DateTimeHelper.formatDate(row.delete_at)}
        </div>
      ),
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="action-btn d-flex gap-3">
          <div className="edit-btn">
            <CIcon
              className="pointer_cursor"
              icon={cilReload}
              onClick={() => restore(row?._id)}
            />
          </div>

          <div className="delet-btn">
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
        moduleName="ecommerce/scrap"
        deletionType="delete"
      />

      <CContainer fluid>
        {/* {rowPerPage && data && ( */}
        {isLoading ? (
          <div className="custom-table-shimmer">
            {/* <ShimmerTable row={10} /> */}
          </div>
        ) : (
          <div className="datatable">
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
              // paginationRowsPerPageOptions={RowsPerPage}
              paginationPerPage={rowPerPage}
              onChangeRowsPerPage={(value) => {
                count = value;
                setRowPerPage(value);
                updatePageQueryParam("count", value);
                // setSelectedRowForModule('customers', value)
              }}
              onSelectedRowsChange={(state) => handleRowChange(state)}
              clearSelectedRows={toggleCleared}
            />
          </div>
        )}
        <DeleteModal
          visible={visible}
          userId={userId}
          moduleName="ecommerce/scrap"
          currentPage={currentPage}
          rowPerPage={rowPerPage}
          setVisible={setVisible}
          deletionType="delete"
          handleClose={() => setVisible(false)}
        />
      </CContainer>
    </>
  );
}
