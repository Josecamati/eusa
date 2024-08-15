import express from "express";
import dotenv from "dotenv";
import { StreamChat } from "stream-chat";

dotenv.config();

const client = StreamChat.getInstance(
  "uregwa5p2pc2",
  "wddxxz7scr7vytfvkbn8fpnwu3mhkna625h2m93vp34enbzvkcujm2dk9jwp2ghe"
);

const app = express();
app.use(express.json());

// Register user
app.post("/register", async (req, res) => {
  const { email, id, name, image } = req.body;

  // Create user in Stream Chat
  await client.upsertUser({
    id,
    email,
    name: name,
    image: image,
    role: "user",
  });

  // Create token for user
  const token = client.createToken(id);

  return res.json({
    token,
    user: {
      id: id,
      email: email,
    },
  });
});

// Login user
app.post("/login", async (req, res) => {
  const { email, id } = req.body;

  // Create token for user
  const token = client.createToken(id);

  return res.json({
    token,
    user: {
      id: id,
      email: email,
    },
  });
});

app.listen(3000, () => {
  console.log(`App listening on 3000 ${3000}`);
});
