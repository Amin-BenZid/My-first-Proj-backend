module.exports = searchProduct = async (req, res) => {
  try {
    let result = await collection
      .aggregate([
        {
          $search: {
            autocomplete: {
              query: `${request.query.query}`,
              path: "productName",
              fuzzy: {
                maxEdits: 2,
                prefixLength: 3,
              },
            },
          },
        },
      ])
      .toArray();
    response.send(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
