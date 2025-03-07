// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ErrorMetric } from '../../src/error-metric';
import { ImageMagick } from '../../src/image-magick';
import { IMagickImageCollection, MagickImageCollection } from '../../src/magick-image-collection';
import { MagickFormat } from '../../src/magick-format';
import { MagickGeometry } from '../../src/magick-geometry';
import { TestFiles } from '../test-files';

let images: IMagickImageCollection;

beforeEach(() => {
    ImageMagick._api = global.native;
    images = MagickImageCollection.create();
});

afterEach(() => {
    images.dispose();
});

describe('MagickImageCollection#mosaic', () => {
    it('should throw exception when collection is empty', () => {
        expect(() => {
            images.mosaic(() => { /* never reached */ });
        }).toThrowError('operation requires at least one image');
    });

    it('should create a mosaic of the images', () => {
        TestFiles.roseSparkleGif.readCollection(images => {
            images[1].page = new MagickGeometry(100, 100, images[1].width, images[1].height);

            images.mosaic(image => {
                expect(image.format).toBe(MagickFormat.Gif);
                expect(image.width).toBe(170);
                expect(image.height).toBe(146);

                const difference = images[0].compare(image, ErrorMetric.RootMeanSquared);
                expect(difference).toBeCloseTo(0.28644);
            });
        });
    });
});
