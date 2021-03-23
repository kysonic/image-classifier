import * as tf from '@tensorflow/tfjs';
import labels from './labels.json';

const IMAGE_SIZE = 128;

export class Classifier {
    private model: any

    constructor() {
        this.init();
    }

    async init() {
        this.model = await tf.loadGraphModel('./assets/model.json');
        console.log('Model loaded');
    }

    async predict(img: any): Promise<any> {
        const t0 = performance.now()
        const image = tf.browser.fromPixels(img).toFloat()
        const resized = tf.image.resizeBilinear(image, [IMAGE_SIZE, IMAGE_SIZE])
        const offset = tf.scalar(255 / 2)
        const normalized = resized.sub(offset).div(offset)
        const input = normalized.expandDims(0)
        const output = await tf.tidy(() => this.model.predict({ input })).data();
        const predictions = labels
            .map((label: string, index: number) => ({ label, accuracy: output[index] }))
            .sort((a: any, b: any) => b.accuracy - a.accuracy)
        const time = `${(performance.now() - t0).toFixed(1)} ms`;
        return { predictions, time }
    }
}

const classifier = new Classifier();

export default classifier;
