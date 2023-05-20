const getTotalPage = (totalResult: number, limit: number): number => {
  const totalPage = Math.ceil(totalResult / limit);
  return totalPage;
};

export { getTotalPage };
