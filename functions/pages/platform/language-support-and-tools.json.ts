// Will replace this with rewrites/proxying when eventually supported

export const onRequest = ({ request, next }) => {
  return next("/pages/configuration/language-support-and-tools/index.json", request);
};
