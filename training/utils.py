import random, numpy as np, torch

def set_seed(seed=42):
    random.seed(seed); np.random.seed(seed); torch.manual_seed(seed)
    torch.cuda.manual_seed_all(seed)

def accuracy(pred, target):
    return (pred.argmax(1) == target).float().mean().item()
