
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
import { cilSpreadsheet, cilTrash } from '@coreui/icons'
import SubHeader from '../../components/custome/SubHeader'
import BasicProvider from '../../constants/BasicProvider'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import TreeNode from '../../helpers/treeHelper/TreeHelper'


export default function Regions() {
  const [regions, setRegions] = useState([])
  const [newRegionName, setNewRegionName] = useState('')
  const [expandedNodes, setExpandedNodes] = useState([])
  const dispatch = useDispatch()

  const id = useParams().id
  const navigate = useNavigate();

  const [initialvalues, setInitialvalues] = useState({})

  const fetchData = async () => {
    try {
      const response = await new BasicProvider(`cms/region/type/country`).getRequest()
      if (response?.status == "success") {
        // /region/type/country
        setRegions(response?.data || [])
      }
    } catch (error) {
      console.error("ERROR", error);

    }
  }

  const fetchById = async (id) => {
    try {
      const response = await new BasicProvider(`region/show/${id}`).getRequest()
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
    // Handle form submission logic here
    const lines = initialvalues?.name.split("\n").filter((line) => line.trim() !== "");
    setInitialvalues((prevValues) => ({
      ...prevValues,
      name: lines,
    }));
    
    try {
     
      const response = await new BasicProvider(`region`).postRequest({...initialvalues, name: lines})
      setInitialvalues({})
      fetchData();
    } catch (error) {
      console.error("ERROR", error);
    }
  };


  const handleDeleteRegion = async (id) => {
    try {
       const response = await new BasicProvider(`region/multi/delete`, dispatch).deleteRequest({ ids: [id] })
      fetchData()
    } catch (error) {

    }
  }

  const navigatere =(id)=> {
    navigate(`/master/region/${id}/edit`)
  }
  const handleToggleExpand = (nodeId) => {
    setExpandedNodes((prev) =>
      prev.includes(nodeId) ? prev.filter((id) => id !== nodeId) : [...prev, nodeId]
    )
  }
 
  return (
    <>
      <SubHeader
      name = "Region"
      isHideAddButton={true}
      />
      <CContainer>

        <CRow className="justify-content-between">
          <CCol md={5} >
            <CCard>
              <CCardHeader className="bg-dark text-white">
                <CCardTitle>Create Region
                </CCardTitle>
              </CCardHeader>
              <CCardBody>

                <div>
                  <CFormLabel className=''>Region Name <span className='text-danger'>*</span></CFormLabel>
                  <CFormTextarea
                    rows={4} // Set number of visible lines
                    name='name'
                    onChange={handleChange}
                    value={initialvalues?.name}
                    placeholder="(should be one line each)"
                  />
                </div>

                <div>
                  <CFormLabel className='mt-2'>Type</CFormLabel> <span className='text-danger'>*</span>
                  <CFormSelect name='type' value={initialvalues?.type} onChange={handleChange}>
                    <option value={""}>Region Type</option>
                    <option value={"country"}>Country</option>
                    <option value={"state"}>State</option>
                    <option value={"city"}> City</option>
                  </CFormSelect>
                </div>
                {/* {initialvalues?.type && initialvalues?.type != "country" && <div>
                  <CFormLabel className='mt-2'>Parent Region <span className='text-danger'>*</span></CFormLabel>
                  <CFormSelect name='parent' value={initialvalues?.parent} onChange={handleChange} >
                    <option>Region</option>
                    {regions?.length > 0 && regions.map((region, idx) => (<option key={idx} value={region?._id}>{region?.name}</option>))}
                  </CFormSelect>
                </div>} */}
                {initialvalues?.type && (
                  <div>
                    {initialvalues?.type == "state" && (
                      <div>
                        <CFormLabel className='mt-2'>Parent Region 11 <span className='text-danger'>*</span></CFormLabel>
                        <CFormSelect name='parent' value={initialvalues?.parent} onChange={handleChange}>
                          <option>Select Region</option>
                          {regions?.length > 0 && regions.map((region, idx) => (
                            <option key={idx} value={region?._id}>{region?.name}</option>
                          ))}
                        </CFormSelect>
                      </div>
                    )}



                    {initialvalues?.type === "city" && (
                      <div>
                        <CFormLabel className="mt-2">
                          All States <span className="text-danger">*</span>
                        </CFormLabel>
                        <CFormSelect name="parent" value={initialvalues?.regions?.children?._id} onChange={handleChange}>
                          <option>Select State</option>
                          {regions
                            ?.flatMap(region => region.children || []) // Flatten all children arrays
                            .map((child, idx) => (
                              <option key={idx} value={child._id}>
                                {child.name}
                              </option>
                            ))}
                        </CFormSelect>
                      </div>
                    )}

                  </div>
                )}


                {initialvalues?.type && initialvalues?.type != "city" &&
                  <div>
                    <CFormLabel className='mt-2'>Short Name <span className='text-danger'>*</span></CFormLabel>
                    <CFormInput onChange={handleChange}
                      placeholder='Enter Short Name'
                      name='short_name'
                      value={initialvalues?.short_name}
                    />
                  </div>
                }

                {initialvalues?.type && initialvalues?.type == "country" && <div>
                  <CFormLabel className='mt-2'>Country Code <span className='text-danger'>*</span></CFormLabel>
                  <CFormInput onChange={handleChange}
                    placeholder='Enter Country Code'
                    name='country_code'
                    value={initialvalues?.country_code}
                  />
                </div>}

              </CCardBody>
              <CCardFooter>
                <div className='d-flex justify-content-center gap-5'>
                  <CButton color="success"
                    onClick={handleSubmit}
                  >Save</CButton>
                  <CButton color='danger' onClick={() => {

                    setInitialvalues({ name: "", type: "", parent: "", short_name: "" });
                    navigate("/master/region")
                  }}>Cancel</CButton>
                </div>
              </CCardFooter>
            </CCard>
          </CCol>
          {/* ======================Regions Tree==================== */}
          <CCol md={7} >
            <CCard>
              <CCardHeader className="bg-dark text-white">
                <CCardTitle>Regions</CCardTitle>
              </CCardHeader>
              <CCardBody>
                <div className=" ">
                  <TreeNode nodes={regions} handleToggleExpand={handleToggleExpand} handleDeleteRegion={handleDeleteRegion} expandedNodes={expandedNodes} navigatere={navigatere} />

                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

      </CContainer>

    </>
  )
}

