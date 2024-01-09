// Will replace this with rewrites/proxying when eventually supported

export const onRequest = ({ request, next }) => {
  return next("/pages/configuration/build-configuration/index.json", request);
};