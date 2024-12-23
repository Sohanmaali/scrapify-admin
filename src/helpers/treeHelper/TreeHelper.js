import { cilTrash, cilArrowDown, cilArrowRight, cilCaretBottom, cilCaretRight } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

// const TreeNode = ({ nodes, level = 0,  handleDeleteRegion, expandedNodes, handleToggleExpand,navigatere }) => {

//     if (!Array.isArray(nodes)) {
//         console.error("The 'nodes' prop should be an array.");
//         return null;
//     }

//     return (
//         <div>
//             {nodes.map((node) => (
//                 <div key={node._id}>
//                     <div
//                         className="flex items-center gap-2 cursor-pointer"
//                         onClick={() => handleToggleExpand(node._id)}
//                     >
//                         <div className="w-6" style={{ marginLeft: `${level * 10}px` }}>
//                             {level > 0 && <span className="text-muted">└─</span>}
//                             <span className="text-muted" style={{ cursor: "pointer" }} >📁</span>
//                             <span onClick={() => navigatere(node?._id)} style={{ cursor: "pointer" }}>{node?.name}</span>
//                             <span className="mt-2" onClick={() => handleDeleteRegion(node?._id)} >
//                                 <CIcon className="pointer_cursor" icon={cilTrash} />
//                             </span>
//                         </div>
//                     </div>

//                     {expandedNodes?.includes(node._id) && Array.isArray(node.children) && node.children.length > 0 && (
//                         <div className="pl-5 ms-3">
//                             <TreeNode
//                                 nodes={node.children}
//                                 level={level + 1}
//                                 expandedNodes={expandedNodes}
//                                 handleToggleExpand={handleToggleExpand}
//                             />
//                         </div>
//                     )}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default TreeNode

// import { cilTrash, cilChevronDown, cilChevronRight } from "@coreui/icons";
// import CIcon from "@coreui/icons-react";
import React from "react";

const TreeNode = ({
    nodes,
    level = 0,
    handleDeleteRegion,
    expandedNodes,
    handleToggleExpand,
    navigatere,
}) => {
    if (!Array.isArray(nodes)) {
        console.error("The 'nodes' prop should be an array.");
        return null;
    }

    return (
        <div className={`tree-container ${level > 0 ? "has-parent" : ""} ml-lg-5 `}>
            {nodes.map((node) => (
                <div key={node._id} className="tree-item">
                    <div
                        className={`tree-label flex  ${expandedNodes.includes(node._id) ? "expanded" : ""
                            }`}
                    >
                        {/* Toggle Expand Icon */}
                        <span
                            className="tree-toggle"
                            onClick={() => handleToggleExpand(node._id)}
                        >
                            {expandedNodes.includes(node._id) ? (
                                <CIcon icon={cilCaretBottom} />

                            ) : (
                                <CIcon icon={cilCaretRight} />

                            )}
                        </span>

                        {/* Folder Icon */}
                        <span
                            className="tree-icon text-muted"
                            style={{ cursor: "pointer" }}
                            onClick={() => navigatere(node?._id)}
                        >
                            📁
                        </span>

                        {/* Node Name */}
                        <span
                            className="tree-name"
                            onClick={() => navigatere(node?._id)}
                            style={{ cursor: "pointer" }}
                        >
                            {node?.name}
                        </span>

                        {/* Delete Icon */}
                        <span
                            className="tree-delete "
                            onClick={() => handleDeleteRegion(node?._id)}
                        >
                            <CIcon className="pointer_cursor" icon={cilTrash} />
                        </span>
                    </div>

                    {/* Child Nodes */}
                    {expandedNodes.includes(node._id) &&
                        Array.isArray(node.children) &&
                        node.children.length > 0 && (
                            <div className="tree-children">
                                <TreeNode
                                    nodes={node.children}
                                    level={level + 1}
                                    expandedNodes={expandedNodes}
                                    handleToggleExpand={handleToggleExpand}
                                    navigatere={navigatere}
                                    handleDeleteRegion={handleDeleteRegion}
                                />
                            </div>
                        )}
                </div>
            ))}
        </div>
    );
};

export default TreeNode;
