// Will replace this with rewrites/proxying when eventually supported

export const onRequest = ({ request, next }) => {
  return next("/workers/configuration/compatibility-dates/index.json", request);
};
