import '@tensorflow/tfjs';
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import * as mobileNet from '@tensorflow-models/mobilenet';

export class Classifier {
    private classifier: knnClassifier.KNNClassifier | undefined;
    private net: mobileNet.MobileNet | undefined;
    public isLoading: boolean = false;
    public examples: number = 0;

    constructor() {
        this.init();
    }

    async init() {
        console.log('Init classifier...');
        this.isLoading = true;
        this.classifier = knnClassifier.create();
        console.log('Classifier created');
        this.net = await mobileNet.load();
        console.log('Mobile net loaded...');
        this.isLoading = false;
    }

    train(imageTensor: any, label: string): void {
        if (this.net && this.classifier) {
            // @ts-ignore
            const logits = this.net.infer(imageTensor, 'conv_preds');
            this.classifier.addExample(logits, label);
            console.log('Example added');
            this.examples++;
        }
    }

    async predict(imageTensor: any): Promise<any> {
        if (this.net && this.classifier) {
            // @ts-ignore
            const logits = this.net.infer(imageTensor, 'conv_preds');

            return await this.classifier.predictClass(logits);
        }
    }

    save() {
        if (this.classifier) {
            const dataset = this.classifier.getClassifierDataset();

            console.log(dataset);
        }
    }
}

const classifier = new Classifier();

export default classifier;
