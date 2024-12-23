
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


const subHeaderItems = [
  { name: "All admin", link: "/admin/all", icon: cilSpreadsheet },
  { name: "Trash admin", link: "/admin/trash", icon: cilTrash },
];
export default function Category() {
  const [category, setCategory] = useState([])
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
        // /region/type/country
        setCategory(response?.data || [])
      }
      console.log("response-====-===---=-1111111111111111=", response?.data);
    } catch (error) {
      console.error("ERROR", error);

    }
  }

  // const fetchChildren = async (id) => {
  //   try {
  //     console.log("-=-===-=-==-=-", id);

  //     const response = await new BasicProvider(`region/children/${id}`).getRequest();

  //     if (response?.status === "success") {
  //       setCategory(prevcategory =>
  //         prevcategory.map(region => {
  //           if (region._id === id) {
  //             return {
  //               ...region,
  //               children: [...(region.children || []), ...(response?.data || [])]
  //             };
  //           }
  //           return region;
  //         })
  //       );

  //     }

  //     console.log("response-=-====22222222-=", response);
  //   } catch (error) {
  //     console.error("ERROR", error);
  //   }
  // }





  const fetchById = async (id) => {
    try {
      const response = await new BasicProvider(`category/show/${id}`).getRequest()
      if (response?.status == "success") {
        setInitialvalues(response?.data || {})
      }
      // console.log("response-=-====-=", response);
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

  console.log("initialvalues", initialvalues);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const lines = initialvalues?.name.split("\n").filter((line) => line.trim() !== "");
    setInitialvalues((prevValues) => ({
      ...prevValues,
      name: lines,
    }));

    try {
      console.log("initialvalues", { ...initialvalues, name: lines });

      const response = await new BasicProvider(`category`).postRequest({ ...initialvalues, name: lines })
      setInitialvalues({})
      fetchData();
    } catch (error) {
      console.error("ERROR", error);
    }
  };


  const handleDeleteRegion = async (id) => {
    try {
      console.log("-===-===-= -=id", id);

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
  const navigatere =(id)=> {
    navigate(`/master/category/${id}/edit`)
  }


  return (
    <>
      <SubHeader
        subHeaderItems={subHeaderItems}
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
                  <CFormSelect name='type' value={initialvalues?.type} onChange={handleChange}>
                    <option value={""}>Select Type</option>

                    {category.length>0 && category.map((cat, idx) => (
                       <option value={cat?.type}> {cat?.type}</option>
                    ))}
                   
                  </CFormSelect>
                </div>


                <div>
                  <div>
                    <CFormLabel className='mt-2'>Parent Category<span className='text-danger'>*</span></CFormLabel>
                    <CFormSelect name='parent' value={initialvalues?.parent} onChange={handleChange}>
                      <option>Select Region</option>
                      {category?.length > 0 && category.map((region, idx) => (
                        <option key={idx} value={region?._id}>{region?.name}</option>
                      ))}
                    </CFormSelect>
                  </div>

                </div>
              </CCardBody>
              <CCardFooter>
                <div className='d-flex justify-content-center gap-5'>
                  <CButton color="success"
                    onClick={handleSubmit}
                  >Save</CButton>
                  <CButton color='danger' onClick={() => {

                    setInitialvalues({ name: "", type: "", parent: "", short_name: "" });
                    navigate(-1)
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

            {/* <CCard>
              <CCardHeader className="bg-dark text-white">
                <CCardTitle>Product</CCardTitle>
              </CCardHeader>
              <CCardBody>
                <div className=" ">
                <TreeNode nodes={category} handleToggleExpand={handleToggleExpand} handleDeleteRegion={handleDeleteRegion} expandedNodes={expandedNodes} navigatere={navigatere} />


                </div>
              </CCardBody>
            </CCard> */}
          </CCol>
        </CRow>

      </CContainer>

    </>
  )
}

