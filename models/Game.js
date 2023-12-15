/* eslint-disable camelcase */
import BaseModel from "./BaseModel";

export default class Game extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "Game";
  }

  // Objection.js assumes primary key is `id` by default

  static get jsonSchema() {
    return {
      type: "object",

      properties: {
        id: { type: "integer" },
        userid: { type: "integer" },
        title: { type: "string" },
        position: { type: "array" },
        map: { type: "array" },
        stats: { type: "object" },
        inventory: { type: "array" },
      },
    };
  }
}
