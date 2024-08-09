export default {
  mounted: (el, { value }) => {
    if ([false, ''].includes(value)) return;
    el.focus();
  },
};
