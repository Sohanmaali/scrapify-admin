import { useEffect, useState } from "react";
import {
  CForm,
  CFormLabel,
  CFormInput,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CSelect,
  CContainer,
  CRow,
  CCol,
  CFormSelect,
  CCardFooter,
  CButton,
  CFormTextarea,
} from "@coreui/react";
import { toast } from "react-toastify";

import SubHeader from "../../components/custome/SubHeader";
import BasicProvider from "../../constants/BasicProvider";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import TreeNode from "../../helpers/treeHelper/TreeHelper";
import ImagePreview from "../../components/custome/ImagePreview";
import createFormData from "../../helpers/createFormData";

export default function Category() {
  const [category, setCategory] = useState([]);
  const [parentCategory, setParentCategory] = useState([]);
  const [newRegionName, setNewRegionName] = useState("");
  const [expandedNodes, setExpandedNodes] = useState([]);
  const dispatch = useDispatch();

  const id = useParams().id;
  const navigate = useNavigate();

  const [initialvalues, setInitialvalues] = useState({});

  const fetchData = async () => {
    try {
      const response = await new BasicProvider(`cms/category`).getRequest();

      if (response?.status == "success") {
        setCategory(response?.data || []);
      }
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  const fetchById = async (id) => {
    try {
      const response = await new BasicProvider(
        `cms/category/show/${id}`
      ).getRequest();

      if (response?.status == "success") {
        setInitialvalues(response?.data || {});
      }
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  useEffect(() => {
    fetchData();
    if (id) {
      fetchById(id);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setInitialvalues((prevProfile) => ({
        ...prevProfile,
        [name]: files[0],
      }));
    } else {
      setInitialvalues((prevProfile) => ({
        ...prevProfile,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let lines = initialvalues?.name
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");

    console.log("-=-=-=-==-=-=-req.body-=-=-=-=", lines);

    const data = createFormData({ ...initialvalues, name: lines });
    // const data ={}
    if (!data) {
      return;
    }
    try {
      if (id) {
        const response = await new BasicProvider(
          `cms/category/update/${id}`
        ).patchRequest(data);
        toast.success("Category Updated Successfully");
        // navigate("/master/category")
      } else {
        const response = await new BasicProvider(`cms/category`).postRequest(
          data
        );
        toast.success("Category Created Successfully");
      }
      setInitialvalues({
        name: "",
        parent: "",
        type: "",
        price: "",
      });
      fetchData();
    } catch (error) {
      toast.error("Error", error);
      console.error("ERROR", error);
    }
  };

  const findByType = async (type) => {
    try {
      const response = await new BasicProvider(
        `cms/category/type/${type}`
      ).getRequest();

      setParentCategory([]);
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  const handleDeleteRegion = async (id) => {
    try {
      const response = await new BasicProvider(
        `cms/category/multi/delete`,
        dispatch
      ).deleteRequest({ ids: [id] });
      fetchData();
    } catch (error) {}
  };
  const handleToggleExpand = (nodeId) => {
    setExpandedNodes((prev) =>
      prev.includes(nodeId)
        ? prev.filter((id) => id !== nodeId)
        : [...prev, nodeId]
    );
  };
  const navigatere = (id) => {
    navigate(`/master/category/${id}/edit`);
  };

  console.log("--=-===initialvalues-=-=", initialvalues);

  return (
    <>
      <SubHeader
        // subHeaderItems={subHeaderItems}
        name="Category"
        isHideAddButton={true}
        // moduleName="admin"
      />
      <CContainer>
        <CRow className="justify-content-between">
          <CCol md={5}>
            <CCard>
              <CCardHeader className="bg-dark text-white">
                <CCardTitle>Create Category</CCardTitle>
              </CCardHeader>
              <CCardBody>
                <div>
                  <CFormLabel className="">
                    Category Name <span className="text-danger">*</span>
                  </CFormLabel>
                  <CFormTextarea
                    rows={4} // Set number of visible lines
                    name="name"
                    onChange={handleChange}
                    value={initialvalues?.name}
                    placeholder="(should be one line each)"
                  />
                </div>

                <div>
                  <CFormLabel className="mt-2">Category Type</CFormLabel>{" "}
                  <span className="text-danger">*</span>
                  <CFormSelect
                    name="type"
                    value={initialvalues?.type}
                    onChange={(e) => {
                      if (e.target.value != "other") {
                        findByType(e.target.value);
                      }
                      handleChange(e);
                    }}
                  >
                    <option value={""}>Select Type</option>

                    {category.length > 0 &&
                      category.map((cat, idx) => (
                        <option value={cat?.slug} key={idx}>
                          {cat?.slug}
                        </option>
                      ))}
                    <option value={"other"}>Other</option>
                  </CFormSelect>
                </div>

                {initialvalues?.type === "other" && (
                  <div className="mt-2">
                    <CFormLabel className="">
                      Other Type <span className="text-danger">*</span>
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      name="other"
                      onChange={handleChange}
                      value={initialvalues?.other}
                      placeholder="Enter other type"
                    />
                  </div>
                )}
                <div className="mt-2">
                  <CFormLabel className="">
                    parent <span className="text-danger">*</span>
                  </CFormLabel>
                  <CFormSelect
                    name="parent"
                    value={initialvalues?.parent}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    <option value={""}>Select parent</option>

                    {parentCategory.length > 0 &&
                      parentCategory.map((cat, idx) => (
                        <option value={cat?._id} key={idx}>
                          {cat?.name}
                        </option>
                      ))}
                  </CFormSelect>
                </div>

                <div className="mt-2">
                  <CFormLabel className="">Featured Image</CFormLabel>
                  <CFormInput
                    type="file"
                    name="featured_image"
                    onChange={handleChange}
                  />
                </div>
                <div className="mt-3">
                  <div className="">
                    <ImagePreview
                      initialvalues={initialvalues}
                      setInitialvalues={setInitialvalues}
                    />
                  </div>
                </div>
              </CCardBody>
              <CCardFooter>
                <div className="d-flex justify-content-center gap-5">
                  <CButton color="success" onClick={handleSubmit}>
                    {id ? "Update" : "Save"}
                  </CButton>
                  <CButton
                    color="danger"
                    onClick={() => {
                      setInitialvalues({
                        name: "",
                        type: "",
                        parent: "",
                        price: "",
                      });
                      navigate("/master/category");
                    }}
                  >
                    Cancel
                  </CButton>
                </div>
              </CCardFooter>
            </CCard>
          </CCol>
          {/* ======================category Tree==================== */}
          <CCol md={7}>
            {category?.length > 0 &&
              category.map((cat, idx) => (
                <CCard key={idx} className="mb-4">
                  <CCardHeader className="bg-dark text-white">
                    <CCardTitle onClick={() => navigatere(cat?._id)}>
                      <span className="cursor-pointer"> {cat?.name}</span>
                    </CCardTitle>
                  </CCardHeader>
                  <CCardBody>
                    <div className=" ">
                      <TreeNode
                        nodes={cat?.children}
                        handleToggleExpand={handleToggleExpand}
                        handleDeleteRegion={handleDeleteRegion}
                        expandedNodes={expandedNodes}
                        navigatere={navigatere}
                      />
                    </div>
                  </CCardBody>
                </CCard>
              ))}
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
}
