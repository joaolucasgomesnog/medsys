import express from "express";
import {router} from './routes'

const app = express();

app.use(express.json())
app.use(router)

app.get("/", (req, res) => {
    return res.json({ hello: 'world' })
})
app.listen(3030, () => console.log('server listening on port 3030'))
