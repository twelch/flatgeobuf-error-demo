import { takeAsync } from "flatgeobuf/lib/mjs/streams/utils.js";
import { BBox, Feature, Geometry } from "geojson";
import { deserialize } from "flatgeobuf/lib/mjs/geojson.js";

export function fgBoundingBox(box: BBox) {
  return {
    minX: box[0],
    maxX: box[2],
    minY: box[1],
    maxY: box[3],
  };
}

/** Fetch features within bounding box and deserializes them
 */
export async function fgbFetchAll<F extends Feature<Geometry>>(
  url: string,
  box?: BBox
) {
  const fgBox = (() => {
    if (!box && !Array.isArray(box)) {
      return fgBoundingBox([-180, -90, 180, 90]); // fallback to entire world
    } else {
      return fgBoundingBox(box);
    }
  })();
  console.log("fgbFetchAll", `url: ${url}`, `box: ${JSON.stringify(fgBox)}`);
  const features = (await takeAsync(
    deserialize(url, fgBox) as AsyncGenerator
  )) as F[];
  if (!Array.isArray(features))
    throw new Error("Unexpected result from fgbFetchAll");
  return features;
}