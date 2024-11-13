export const calculatePaginationData = ({ count = 0, page, perPage }) => {
  const totalPages = Math.ceil(count / perPage);

  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return {
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasNextPage,
    hasPrevPage,
  };
};
