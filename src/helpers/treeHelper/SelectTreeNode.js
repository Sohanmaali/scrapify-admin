import { cilCaretBottom, cilCaretRight, cilCheckCircle } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

const SelectTreeNode = ({
    nodes,
    level = 0,
    handleToggleExpand,
    selectedCategoryId,
    handleSelectCategory,
    expandedNodes,  // Accept expandedNodes as a prop
}) => {
    if (!Array.isArray(nodes)) {
        console.error("The 'nodes' prop should be an array.");
        return null;
    }

    return (
        <div className={`tree-container ${level > 0 ? "has-parent" : ""} ml-lg-5`}>
            {nodes.map((node) => (
                <div key={node._id} className="tree-item">
                    <div
                        className={`tree-label flex ${expandedNodes.includes(node._id) ? "expanded" : ""}`}
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
                        >
                            📁
                        </span>

                        {/* Node Name */}
                        <span
                            className="tree-name"
                            onClick={() => handleSelectCategory(node?._id)}
                            style={{ cursor: "pointer" }}
                        >
                            {node?.name}
                        </span>

                        {/* Selected Icon (Checkmark) */}
                        {selectedCategoryId === node._id && (
                            <CIcon icon={cilCheckCircle} className="selected-icon" />
                        )}
                    </div>

                    {/* Child Nodes */}
                    {expandedNodes.includes(node._id) &&
                        Array.isArray(node.children) &&
                        node.children.length > 0 && (
                            <div className="tree-children">
                                <SelectTreeNode
                                    nodes={node.children}
                                    level={level + 1}
                                    expandedNodes={expandedNodes}
                                    handleToggleExpand={handleToggleExpand}
                                    handleSelectCategory={handleSelectCategory}
                                    selectedCategoryId={selectedCategoryId}
                                />
                            </div>
                        )}
                </div>
            ))}
        </div>
    );
};

export default SelectTreeNode;