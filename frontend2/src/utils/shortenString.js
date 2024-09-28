export const shortenAddress = (st) => {
    st = String(st);
    const newst_1 = st.slice(0, 5);
    const newst_2 = st.slice(st.length - 5, st.length);
    return newst_1 + '....' + newst_2;
  };
  