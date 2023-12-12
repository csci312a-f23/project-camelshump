import { createRouter } from "next-connect";
import { onError } from "../../../lib/middleware";
import Game from "../../../../models/Game";

const router = createRouter();

router
  .get(async (req, res) => {
    const game = await Game.query().findById(req.query.id).throwIfNotFound();
    res.status(200).json(game);
  })
  .put(async (req, res) => {
    const game = await Game.query()
      .updateAndFetchById(req.query.id, req.body)
      .throwIfNotFound();
    res.status(200).json(game);
  });

export default router.handler({ onError });
