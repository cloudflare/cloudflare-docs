// Will replace this with rewrites/proxying when eventually supported

export const onRequest = ({ request, next }) => {
  return next("/workers/platform/compatibility-dates/index.json", request);
};
