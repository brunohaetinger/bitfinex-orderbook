export const UPSERT_BID = "orderBook/UPSERT_BID";
export const UPSERT_ASK = "orderBook/UPSERT_ASK";
export const DELETE_BID = "orderBook/DELETE_BID";
export const DELETE_ASK = "orderBook/DELETE_ASK";

export const upsertBid = (rowData) => ({
  type: UPSERT_BID,
  data: {
    ...rowData,
  },
});

export const upsertAsk = (rowData) => ({
  type: UPSERT_ASK,
  data: {
    ...rowData,
  },
});

export const deleteBid = (rowData) => ({
  type: DELETE_BID,
  data: {
    ...rowData,
  },
});

export const deleteAsk = (rowData) => ({
  type: DELETE_ASK,
  data: {
    ...rowData,
  },
});
