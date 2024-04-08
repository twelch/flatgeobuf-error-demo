import { deserialize } from "flatgeobuf/lib/mjs/geojson.js";
import { takeAsync } from "flatgeobuf/lib/mjs/streams/utils.js";
import { test, expect } from "vitest"
import { Rect } from "flatgeobuf/lib/mjs/packedrtree.js";

test("flatgeobuf - external world fgb", async () => {
  const r: Rect = { minX: 12, minY: 56, maxX: 12, maxY: 56 };
const features = await takeAsync(
    deserialize(
        'https://gp-global-datasources-datasets.s3.us-west-1.amazonaws.com/world-unstable.fgb',
        r,
        undefined,
    ) as AsyncGenerator,
);
expect(features.length).to.eq(1);
for (const f of features)
    expect(
        (f.geometry.coordinates[0] as number[]).length,
    ).to.be.greaterThan(0);
}, 5000);