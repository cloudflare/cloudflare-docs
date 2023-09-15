// Will replace this with rewrites/proxying when eventually supported

export const onRequest = ({ request, next }) => {
  return next("/pages/platform/language-support-and-tools/index.json", request);
};
