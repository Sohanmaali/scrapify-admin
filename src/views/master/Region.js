
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

const initialRegions = {
  id: '1',
  name: 'India',
  children: [
    {
      id: '2',
      name: 'Andhra Pradesh',
      children: [
        { id: '3', name: 'Visakhapatnam' },
        { id: '4', name: 'Vijayawada' },
        { id: '5', name: 'Dwaraka Nagar' },
        { id: '6', name: 'Waltair Uplands' },
        { id: '7', name: 'Diamond Park' },
        { id: '8', name: 'Maddilapalem' },
        { id: '9', name: 'Asilametta' },
        { id: '10', name: 'Governorpet' },
        { id: '11', name: 'Benz Circle' },
        { id: '12', name: 'Bhavanipuram' },
        { id: '13', name: 'Patamata' },
        { id: '14', name: 'Ajith Singh Nagar' },
        { id: '15', name: 'Gunadala' },
        { id: '16', name: 'Kothapeta' },
        { id: '17', name: 'Moghalrajapuram' },
        { id: '18', name: 'Suryaraopet' },
        { id: '19', name: 'Machavaram' },
        { id: '20', name: 'Labbipet' },
      ]

    }, {
      id: '3',
      name: 'Madhya Pradesh',
      children: [
        { id: '3', name: 'Visakhapatnam' },
        { id: '4', name: 'Vijayawada' },
        { id: '5', name: 'Dwaraka Nagar' },
        { id: '6', name: 'Waltair Uplands' },
        { id: '7', name: 'Diamond Park' },
        { id: '8', name: 'Maddilapalem' },
        { id: '9', name: 'Asilametta' },
        { id: '10', name: 'Governorpet' },
        { id: '11', name: 'Benz Circle' },
        { id: '12', name: 'Bhavanipuram' },
        { id: '13', name: 'Patamata' },
        { id: '14', name: 'Ajith Singh Nagar' },
        { id: '15', name: 'Gunadala' },
        { id: '16', name: 'Kothapeta' },
        { id: '17', name: 'Moghalrajapuram' },
        { id: '18', name: 'Suryaraopet' },
        { id: '19', name: 'Machavaram' },
        { id: '20', name: 'Labbipet' },
      ]

    }
  ]
}
const subHeaderItems = [
  { name: "All admin", link: "/admin/all", icon: cilSpreadsheet },
  { name: "Trash admin", link: "/admin/trash", icon: cilTrash },
];
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
      const response = await new BasicProvider(`region/type/country`).getRequest()
      if (response?.status == "success") {
        // /region/type/country
        setRegions(response?.data || [])
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
  //       setRegions(prevRegions =>
  //         prevRegions.map(region => {
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
      const response = await new BasicProvider(`region/show/${id}`).getRequest()
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
      console.log("initialvalues", {...initialvalues, name: lines});

      const response = await new BasicProvider(`region`).postRequest({...initialvalues, name: lines})
      setInitialvalues({})
      fetchData();
    } catch (error) {
      console.error("ERROR", error);
    }
  };


  const handleDeleteRegion = async (id) => {
    try {
      console.log("-===-===-= -=id", id);

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
  // const TreeNode = ({ node, level = 0 }) => {
  //   const children = Array.isArray(node.children) ? node.children : []
  //   const isExpanded = expandedNodes.includes(node._id)

  //   return (
  //     <div>
  //       <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleToggleExpand(node._id)}>
  //         <div className="w-6" style={{ marginLeft: `${level * 10}px` }}>
  //           {level > 0 && <span className="text-muted">└─</span>}
  //           <span className="text-muted" style={{ cursor: "pointer", }}>📁</span>
  //           <span>{node?.name}</span>
  //           <span className='mt-2'> <CIcon
  //             className="pointer_cursor"
  //             icon={cilTrash}
  //           /></span>
  //         </div>
  //       </div>
  //       {isExpanded && children.length > 0 && (
  //         <div className="pl-5 ms-3">
  //           {children.map((child) => (
  //             <TreeNode key={child?.id} node={child} level={level + 1} />
  //           ))}
  //         </div>
  //       )}
  //     </div>

  //   )
  // }


  // const TreeNode = ({ nodes, level = 0, }) => {


  //   if (!Array.isArray(nodes)) {
  //     console.error("The 'nodes' prop should be an array.");
  //     return null;
  //   }

  //   return (
  //     <div>
  //       {nodes.map((node) => (
  //         <div key={node._id}>
  //           <div
  //             className="flex items-center gap-2 cursor-pointer"
  //             onClick={() => handleToggleExpand(node._id)}
  //           >
  //             <div className="w-6" style={{ marginLeft: `${level * 10}px` }}>
  //               {level > 0 && <span className="text-muted">└─</span>}
  //               <span className="text-muted" style={{ cursor: "pointer" }} >📁</span>
  //               <span onClick={() => navigate(`/master/region/${node?._id}/edit`)} style={{ cursor: "pointer" }}>{node?.name}</span>
  //               <span className="mt-2" onClick={() => handleDeleteRegion(node?._id)} >
  //                 <CIcon className="pointer_cursor" icon={cilTrash} />
  //               </span>
  //             </div>
  //           </div>

  //           {expandedNodes.includes(node._id) && Array.isArray(node.children) && node.children.length > 0 && (
  //             <div className="pl-5 ms-3">
  //               <TreeNode
  //                 nodes={node.children}
  //                 level={level + 1}
  //                 expandedNodes={expandedNodes}
  //                 handleToggleExpand={handleToggleExpand}
  //               />
  //             </div>
  //           )}
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };

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
                    navigate(-1)
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

