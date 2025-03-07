// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { MagickFormat } from '../../src/magick-format';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = global.native;
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#write', () => {
    it('should save the image to an array async', async () => {
        image.read('wizard:');
        await image.write(async (data) => {
            expect(data.length).toBe(80796);
        }, MagickFormat.Jpeg);
    });

    it('should save the image to an array', () => {
        image.read('logo:');
        image.write((data) => {
            expect(data.length).toBe(27434);
        }, MagickFormat.Png);
    });
});
