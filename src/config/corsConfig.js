import cors from "cors";

const corsOptions = {
    origin: "http://localhost:3000/",
    method: "GET, POST, PATCH, PUT, DELETE",
    credentials: true
}

const corsSetup = cors(corsOptions);

export default corsSetup;