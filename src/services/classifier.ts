import * as tf from '@tensorflow/tfjs';
import * as use from "@tensorflow-models/universal-sentence-encoder";

export class Classifier {
    private model: any

    constructor() {
        this.init();
    }

    async init() {
        this.model = await tf.loadLayersModel('./names.json/model.json');
        console.log('Model loaded');
    }

    encodeData(data: any) {
        const sentences = data.map((comment: any) => comment.text.toLowerCase());
        const trainingData = use.load()
            .then(model => {
                return model.embed(sentences)
                    .then(embeddings => {
                        return embeddings;
                    });
            })
            .catch(err => console.error('Fit Error:', err));

        return trainingData
    }

    async predict(name: string): Promise<any> {
        const ed = await this.encodeData([
            {
                text: name,
                intent: "name"
            }
        ]);

        const result = await this.model.predict(ed);

        const [nameProbability, none] = await result.data();

        return nameProbability > none;
    }
}

const classifier = new Classifier();

export default classifier;
