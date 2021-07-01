export default function getParent(root, id) {
    let node;
    for (let i = 0; i < root.length; i++) {
        node = root[i];
        if (node.id === id || node.children && (node = getParent(node.children, id))) {
            return node;
        }
    }
    return null;
}