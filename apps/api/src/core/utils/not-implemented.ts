export const notImplemented = (context: string) => {
  return {
    status: "TODO",
    context,
    message: `${context} is scaffolded but not implemented yet.`
  };
};

