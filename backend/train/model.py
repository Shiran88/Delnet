import torch.nn as tnn
from backend.train.activations import ObtainActivationModules
from backend.train.layers import ObtainLayerModule
import torch

class Model(tnn.Module,):
    def __init__(self, layers):
        super(Model, self).__init__()
        self.layers = layers
        print (layers)
        # init modules
        self.init_activation()
        self.init_layers(layers)

    def init_layers(self, layers):
        # holds the modules for the model layers sequentially
        layers_modules = []

        # for each layer element create a corresponding module 
        for layer in layers:
            layer['input'] = self.convertToInt(layer['input'])
            layer['output'] = self.convertToInt(layer['output'])
            layer_module = ObtainLayerModule(layer)
            layers_modules.append(layer_module)
            # insert activation module
            if layer['activation'] != 'None':
                layers_modules.append(self.activations[layer['activation']])
        self.layers_modules = tnn.ModuleList(layers_modules)
            
    def init_activation(self):
        # init modules for activation functions
        self.activations = ObtainActivationModules()
        
    def forward(self, *input):
        cur_input = input[0]
        for module in self.layers_modules:
            cur_input = module(cur_input)
        return cur_input

    def convertToInt(self, array):
        int_array = []
        for element in array:
            int_array.append(int(element))
        return int_array