import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

const TreeNode = ({ nodes, level = 0,  handleDeleteRegion, expandedNodes, handleToggleExpand,navigatere }) => {

    if (!Array.isArray(nodes)) {
        console.error("The 'nodes' prop should be an array.");
        return null;
    }

    return (
        <div>
            {nodes.map((node) => (
                <div key={node._id}>
                    <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => handleToggleExpand(node._id)}
                    >
                        <div className="w-6" style={{ marginLeft: `${level * 10}px` }}>
                            {level > 0 && <span className="text-muted">└─</span>}
                            <span className="text-muted" style={{ cursor: "pointer" }} >📁</span>
                            <span onClick={() => navigatere(node?._id)} style={{ cursor: "pointer" }}>{node?.name}</span>
                            <span className="mt-2" onClick={() => handleDeleteRegion(node?._id)} >
                                <CIcon className="pointer_cursor" icon={cilTrash} />
                            </span>
                        </div>
                    </div>

                    {expandedNodes?.includes(node._id) && Array.isArray(node.children) && node.children.length > 0 && (
                        <div className="pl-5 ms-3">
                            <TreeNode
                                nodes={node.children}
                                level={level + 1}
                                expandedNodes={expandedNodes}
                                handleToggleExpand={handleToggleExpand}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default TreeNode