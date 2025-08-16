import { useState } from "react";
import { ChevronDown, ChevronRight, Folder } from "lucide-react";

export interface TreeNode {
  id: string;
  name: string;
  count: number;
  children?: TreeNode[];
}

interface TreeViewProps {
  data: TreeNode;
  onSelect?: (node: TreeNode) => void;
}

function TreeItem({
  node,
  onSelect,
}: {
  node: TreeNode;
  onSelect?: (n: TreeNode) => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="ml-4">
      <div
        className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded px-2 py-1"
        onClick={() => {
          if (hasChildren) setExpanded(!expanded);
          if (onSelect) onSelect(node);
        }}
      >
        {hasChildren ? (
          expanded ? (
            <ChevronDown size={16} />
          ) : (
            <ChevronRight size={16} />
          )
        ) : (
          <span className="w-4" />
        )}

        <Folder size={16} className="text-gray-500" />
        <span className="text-sm">{node.name}</span>
        <span className="ml-2 text-xs bg-gray-200 rounded-full px-2">
          {node.count}
        </span>
      </div>

      {hasChildren && expanded && (
        <div className="ml-6 border-l border-gray-200">
          {node.children!.map((child) => (
            <TreeItem key={child.id} node={child} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function TreeView({ data, onSelect }: TreeViewProps) {
  return (
    <div className="border rounded-md p-2 mb-4">
      <div className="font-semibold text-sm bg-gray-800 w-fit px-3 py-1 rounded-md text-white items-center mb-4">
        Group Structure
      </div>
      <TreeItem node={data} onSelect={onSelect} />
    </div>
  );
}
