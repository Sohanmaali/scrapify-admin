
import { useEffect, useState } from 'react'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { toast } from 'react-toastify';

import { cilSpreadsheet, cilTrash } from '@coreui/icons'
import SubHeader from '../../components/custome/SubHeader'
import BasicProvider from '../../constants/BasicProvider'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import TreeNode from '../../helpers/treeHelper/TreeHelper'



export default function Category() {
  const [category, setCategory] = useState([])
  const [parentCategory, setParentCategory] = useState([])
  const [newRegionName, setNewRegionName] = useState('')
  const [expandedNodes, setExpandedNodes] = useState([])
  const dispatch = useDispatch()

  const id = useParams().id
  const navigate = useNavigate();

  const [initialvalues, setInitialvalues] = useState({})

  const fetchData = async () => {
    try {
      const response = await new BasicProvider(`category`).getRequest()
      if (response?.status == "success") {
        setCategory(response?.data || [])
      }
    } catch (error) {
      console.error("ERROR", error);

    }
  }

  const fetchById = async (id) => {
    try {
      const response = await new BasicProvider(`category/show/${id}`).getRequest()
      if (response?.status == "success") {
        setInitialvalues(response?.data || {})
      }
    } catch (error) {
      console.error("ERROR", error);
    }
  }


  useEffect(() => {
    fetchData()
    if (id) {
      fetchById(id)
    }
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special handling for the textarea

    setInitialvalues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    let lines
    if (!id) {

      lines = initialvalues?.name.split("\n").filter((line) => line.trim() !== "");
      setInitialvalues((prevValues) => ({
        ...prevValues,
        name: lines,
      }));
    }

    try {
      if (id) {
        const response = await new BasicProvider(`category/update/${id}`).patchRequest({ ...initialvalues, name: lines })
        toast.success("Category Updated Successfully")
        navigate("/master/category")
      }
      else {
        const response = await new BasicProvider(`category`).postRequest({ ...initialvalues, name: lines })
        toast.success("Category Created Successfully")
      }
      setInitialvalues({
        name: "",
        parent: "",
        type: "",
        price: "",
      })
      fetchData();
    } catch (error) {
      toast.error("Error", error);
      console.error("ERROR", error);
    }
  };

  const findByType = async (type) => {
    try {
      const response = await new BasicProvider(`category/type/${type}`).getRequest()


      if (response?.status == "success") {
        setParentCategory(response?.data || [])
      }
    } catch (error) {
      console.error("ERROR", error);
    }
  }


  const handleDeleteRegion = async (id) => {
    try {

      const response = await new BasicProvider(`category/multi/delete`, dispatch).deleteRequest({ ids: [id] })
      fetchData()
    } catch (error) {

    }
  }
  const handleToggleExpand = (nodeId) => {
    setExpandedNodes((prev) =>
      prev.includes(nodeId) ? prev.filter((id) => id !== nodeId) : [...prev, nodeId]
    )
  }
  const navigatere = (id) => {
    navigate(`/master/category/${id}/edit`)
  }


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
          <CCol md={5} >
            <CCard>
              <CCardHeader className="bg-dark text-white">
                <CCardTitle>Create Category
                </CCardTitle>
              </CCardHeader>
              <CCardBody>

                <div>
                  <CFormLabel className=''>Category Name <span className='text-danger'>*</span></CFormLabel>
                  <CFormTextarea
                    rows={4} // Set number of visible lines
                    name='name'
                    onChange={handleChange}
                    value={initialvalues?.name}
                    placeholder="(should be one line each)"
                  />
                </div>

                <div>
                  <CFormLabel className='mt-2'>Category Type</CFormLabel> <span className='text-danger'>*</span>
                  <CFormSelect name='type' value={initialvalues?.type} onChange={(e) => { findByType(e.target.value); handleChange(e) }}>
                    <option value={""}>Select Type</option>

                    {category.length > 0 && category.map((cat, idx) => (
                      <option value={cat?.slug} key={idx}> {cat?.slug}</option>
                    ))}

                  </CFormSelect>
                </div>


                <div>
                  <div>
                    <CFormLabel className='mt-2'>Parent Category<span className='text-danger'>*</span></CFormLabel>
                    <CFormSelect name='parent' value={initialvalues?.parent} onChange={handleChange}>
                      <option>Select Category</option>
                      {parentCategory?.length > 0 ? (parentCategory.map((parent, idx) => (
                        <option key={idx} value={parent?._id}>{parent?.name}</option>
                      ))) : (category.map((parent, idx) => (
                        <option key={idx} value={parent?._id}>{parent?.name}</option>
                      )))}
                    </CFormSelect>
                  </div>



                </div>

                <div className='mt-2'>
                  <CFormLabel className=''>Price per kg/unit <span className='text-danger'>*</span></CFormLabel>
                  <CFormInput
                    type='text'
                    name='price'
                    onChange={handleChange}
                    value={initialvalues?.price}
                    placeholder="Enter Price per kg/unit"
                  />
                </div>
              </CCardBody>
              <CCardFooter>
                <div className='d-flex justify-content-center gap-5'>
                  <CButton color="success"
                    onClick={handleSubmit}
                  >{id ? "Update" : "Save"}</CButton>
                  <CButton color='danger' onClick={() => {

                    setInitialvalues({ name: "", type: "", parent: "", price: "" });
                    navigate("/master/category")
                  }}>Cancel</CButton>
                </div>
              </CCardFooter>
            </CCard>
          </CCol>
          {/* ======================category Tree==================== */}
          <CCol md={7} >
            {category?.length > 0 && category.map((cat, idx) => (
              <CCard key={idx} className='mb-4'>
                <CCardHeader className="bg-dark text-white">
                  <CCardTitle>{cat?.name}</CCardTitle>
                </CCardHeader>
                <CCardBody>
                  <div className=" ">
                    <TreeNode nodes={cat?.children} handleToggleExpand={handleToggleExpand} handleDeleteRegion={handleDeleteRegion} expandedNodes={expandedNodes} navigatere={navigatere} />
                  </div>
                </CCardBody>
              </CCard>
            ))}
          </CCol>
        </CRow>

      </CContainer>

    </>
  )
}

