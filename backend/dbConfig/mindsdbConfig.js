import MindsDB from "mindsdb-js-sdk";

export async function connectMindsDB() {
  try {
    // No authentication needed for self-hosting
    await MindsDB.default.connect({
      host: "http://127.0.0.1:47334",
    });
    console.log("connected");
  } catch (error) {
    // Failed to connect to local instance
    console.log(error);
  }
}
