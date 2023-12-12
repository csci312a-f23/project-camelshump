import { createRouter } from "next-connect";
import { onError } from "../../../lib/middleware";
import Game from "../../../../models/Game";

const router = createRouter();

router
  .get(async (req, res) => {
    const games = await Game.query()
      .where("userid", req.query.userid)
      .throwIfNotFound();
    res.status(200).json(games);
  })
  .post(async (req, res) => {
    const game = await Game.query().insertAndFetch(req.body).throwIfNotFound();
    res.status(200).json(game);
  });

export default router.handler({ onError });
