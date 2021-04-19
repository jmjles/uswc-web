export const createQuery = (array, op) => {
  if (array.length <= 1) return array[0];
  return array.join(` ${op} `);
};

export const getTagsAndOp = (string) => {
  if (!string.includes(" ")) return { tags: [string], operator: "" };
  if (string.includes(" AND "))
    return { tags: string.split(" AND "), operator: "AND" };
  if (string.includes(" OR "))
    return { tags: string.split(" OR "), operator: "OR" };
};
