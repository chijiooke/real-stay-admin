export const GetErrorMessage = (error: any): string => {
  if (!error?.data?.data?.message) {
    console.error("currently in util GetErrorMessage");
    console.error("Unexpected error format:", error);
  }

  return error?.data?.data?.message || "An unexpected error occurred";
};
