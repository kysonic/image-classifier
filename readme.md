## Python

### Python envs

curl -sL https://raw.githubusercontent.com/brainsik/virtualenv-burrito/master/virtualenv-burrito.sh | $SHELL
source ~/.venvburrito/startup.sh

mkvirtualenv trainer
deactivate

### TF for poets

workon trainer
(python -m) pip install tensorflow tensorboard tensorflowjs_converter tensorflowjs

### Clone the TensorFlow for Poets repository (MobileNet V1)
git clone https://github.com/googlecodelabs/tensorflow-for-poets-2 retrain-mobilenet-v1
cd retrain-mobilenet-v1

python -m scripts.retrain -h

cp -R /path/to/my-dataset/* tf_files/dataset

###Tensorboard

cd retrain-mobilenet-v1
tensorboard --logdir tf_files/training_summaries

###Retrain

python -m scripts.retrain \
--image_dir=tf_files/dataset \
--model_dir=tf_files/models \
--architecture=mobilenet_0.25_128 \
--output_graph=tf_files/retrained_graph.pb \
--output_labels=tf_files/retrained_labels.txt \
--bottleneck_dir=tf_files/bottlenecks \
--summaries_dir=tf_files/training_summaries/$ARCHITECTURE \
--how_many_training_steps=400 \
--learning_rate=0.001

### Tes model

python ./scripts/label_image.py \
--graph=tf_files/retrained_graph.pb \
--input_width=128 \
--input_height=128 \
--image=tf_files/dataset/player/7.jpeg

### Quantize graph 

python ./scripts/quantize_graph.py \
--input=tf_files/retrained_graph.pb \
--output=tf_files/quantized_graph.pb \
--output_node_names=final_result \
--mode=weights_rounded

### Convert to tfjs 

tensorflowjs_converter \
--input_format=tf_frozen_model \
--output_node_names=final_result \
tf_files/quantized_graph.pb \
tf_files/web

### Labels

cat tf_files/retrained_labels.txt | jq -Rsc '. / "\n" - [""]' > tf_files/web/labels.json

### Troubleshooting

ImportError: No module named posixpath: 
unset PYTHONPATH
