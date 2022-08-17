const app = require("./server");

app.listen(process.env.PORT || 3000, () =>
  console.log(`🔥 Server running at http://localhost:${process.env.PORT}`)
);
