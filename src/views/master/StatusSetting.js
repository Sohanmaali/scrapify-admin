import React, { useCallback, useEffect, useState } from "react";
import SubHeader from "../../components/custome/SubHeader";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CContainer,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
  CButton,
  CForm,
} from "@coreui/react";
import BasicProvider from "../../constants/BasicProvider";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import CIcon from "@coreui/icons-react";
import { cilPencil, cilTrash } from "@coreui/icons";
import useUpdatePageQueryParam from "../../hooks/useUpdatePageQueryParam";

export default function StatusSetting() {
  // State to manage form input values
  const [statusData, setStatusData] = useState({
    name: "",
    slug: "",
    color: "",
  });

  const { id } = useParams();

  console.log("id", id);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStatusData({ ...statusData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await new BasicProvider(`status`).postRequest(
        statusData
      );

      toast.success("Status created successfully");
      setStatusData({
        name: "",
        slug: "",
        color: "",
      });

      fetchData();
    } catch (error) {
      toast.error("Error creating status");
      console.error("ERROR", error);
    }
  };

  const fetchById = async () => {
    try {
      const response = await new BasicProvider(
        `status/show/${id}`
      ).getRequest();
      if (response?.status === "success") setStatusData(response?.data);
    } catch (error) {
      console.error("ERROR", error);
      toast.error("Error fetching data");
    }
  };

  useEffect(() => {
    if (id) fetchById();
  }, [id]);

  // ==============================================================
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
  const data = useSelector((state) => state.data?.status);
  const toggleCleared = useSelector((state) => state.toggleCleared);
  const totalCount = useSelector((state) => state.totalCount);
  const updateQueryParam = useUpdatePageQueryParam();

  // const updatePageQueryParam = (paramName, page) => {
  //   const searchParams = new URLSearchParams(location.search);
  //   searchParams.set(paramName, page);
  //   navigate({ search: searchParams.toString() });
  // };
  const updatePageQueryParam = (paramName, page) => {
    updateQueryParam(page, paramName);
  };
  useEffect(() => {
    if (rowPerPage) {
      fetchData();
    }
  }, [currentPage, rowPerPage, searchcurrentPage, search]);

  const fetchData = async () => {
    try {
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
      } else {
        console.log("calling");

        response = await new BasicProvider(
          `status?page=${currentPage}&count=${count}`,
          dispatch
        ).getRequest();
      }
      console.log("response", response);

      dispatch({ type: "set", data: { status: response?.data?.data } });
      dispatch({ type: "set", totalCount: response.data.total });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchSelectedRows = async () => {
      const savedSelectedRows = 10;
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
          </div>
        </div>
      ),
      width: "20%",
    },

    {
      name: "Slug",
      selector: (row) => <div className="data_table_colum">{row.slug}</div>,
      center: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <div
          className={`data_table_colum badge bg-${row?.color} `}
          style={{
            width: "100px",
            height: "20px",
            padding: "5px",
            textTransform: "capitalize",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "15px",
            border: "1px solid #fff",
          }}
        >
          {row.color}
        </div>
      ),
      center: true,
    },

    {
      name: "Create At",
      selector: (row) => (
        <div className="data_table_colum">
          {moment(row?.createdAt).fromNow()}
        </div>
      ),
      center: true,
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="action-btn d-flex gap-3">
          <div className="edit-btn">
            <CIcon
              className="pointer_cursor"
              icon={cilPencil}
              onClick={() => navigate(`/master/status/${row._id}/edit`)}
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
  // ==============================================================
  return (
    <>
      <SubHeader name="Status Setting" isHideAddButton={true} />
      <CContainer>
        <CRow className="justify-content-between">
          <CCol md={5}>
            <CCard>
              <CCardHeader className="bg-dark text-white">
                <CCardTitle>Create Status</CCardTitle>
              </CCardHeader>
              <CCardBody>
                <CForm onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <CFormLabel>
                      Name <span className="text-danger">*</span>
                    </CFormLabel>
                    <CFormInput
                      name="name"
                      placeholder="Enter status name"
                      value={statusData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <CFormLabel>Slug</CFormLabel>
                    <CFormInput
                      placeholder="Enter slug"
                      name="slug"
                      value={statusData.slug}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <CFormLabel>
                      Color <span className="text-danger">*</span>
                    </CFormLabel>
                    <CFormSelect
                      name="color"
                      value={statusData.color}
                      onChange={handleChange}
                    >
                      <option value="">Select color</option>
                      <option value="danger">Danger</option>
                      <option value="primary">Primary</option>
                      <option value="success">Success</option>
                      <option value="info">Info</option>
                      <option value="warning">Warning</option>
                    </CFormSelect>
                  </div>
                  <div className="d-flex justify-content-center gap-5">
                    <CButton type="submit" color="success">
                      Save
                    </CButton>

                    <CButton
                      type="reset"
                      color="danger"
                      onClick={() => {
                        setStatusData({
                          name: "",
                          slug: "",
                          color: "",
                        });
                        navigate(`/master/status`);
                      }}
                    >
                      Reset
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>

          <CCol>
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
                selectableRowsHighlight
                highlightOnHover
                paginationPerPage={rowPerPage}
                onChangeRowsPerPage={(value) => {
                  count = value;
                  setRowPerPage(value);
                  updatePageQueryParam("count", value);
                  setSelectedRowForModule("status", value);
                }}
                onSelectedRowsChange={(state) => handleRowChange(state)}
                clearSelectedRows={toggleCleared}
              />
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
}
