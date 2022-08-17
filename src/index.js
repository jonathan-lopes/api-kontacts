const app = require("./server");

app.listen(process.env.PORT || 3000, () =>
  console.log(`Sever runnig at http://localhost:${process.env.PORT}`)
);
