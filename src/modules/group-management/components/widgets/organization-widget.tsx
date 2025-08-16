import TreeView, { TreeNode } from "../ui/tree-list";

const organizationData: TreeNode = {
  id: "1",
  name: "Company",
  count: 284,
  children: [
    {
      id: "2",
      name: "Lorem Department",
      count: 45,
      children: [
        { id: "3", name: "Amet Team", count: 25 },
        { id: "4", name: "Dolor Team", count: 20 },
      ],
    },
    {
      id: "5",
      name: "Ipsum Department",
      count: 15,
    },
    {
      id: "6",
      name: "Dolor Department",
      count: 35,
    },
  ],
};

export default function OrganizationTree() {
  const handleSelect = (node: TreeNode) => {
    console.log("Selected:", node);
  };

  return <TreeView data={organizationData} onSelect={handleSelect} />;
}
