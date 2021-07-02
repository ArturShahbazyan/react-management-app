export default function findNode(root, id) {
    let node;
    for (let i = 0; i < root.length; i++) {
        node = root[i];
        if (node.id === id || (node.children && (node = findNode(node.children, id)))) {
            return node;
        }
    }
    return null;
};