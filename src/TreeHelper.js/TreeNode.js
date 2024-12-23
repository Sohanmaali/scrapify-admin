import { cilTrash } from "@coreui/icons"
import CIcon from "@coreui/icons-react"

const TreeNode = ({ node, level = 0, setExpandedNodes, expandedNodes, handleToggleExpand }) => {
    const children = Array.isArray(node.children) ? node.children : []
    const isExpanded = expandedNodes.includes(node.id)

    return (
        <div>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleToggleExpand(node.id)}>
                <div className="w-6" style={{ marginLeft: `${level * 10}px` }}>
                    {level > 0 && <span className="text-muted">└─</span>}
                    <span className="text-muted" style={{ cursor: "pointer" }}>📁</span>
                    <span>{node?.name}</span>
                    <span className='mt-2'> <CIcon
                        className="pointer_cursor"
                        icon={cilTrash}

                    /></span>
                </div>
            </div>
            {isExpanded && children.length > 0 && (
                <div className="pl-5 ms-3">
                    {children.map((child) => (
                        <TreeNode key={child?.id} node={child} level={level + 1} />
                    ))}
                </div>
            )}
        </div>

    )
}

export default TreeNode