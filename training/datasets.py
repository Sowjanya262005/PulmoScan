from torchvision import datasets, transforms
from torch.utils.data import DataLoader

def make_transforms(size, augment):
    t = []
    if augment:
        t += [transforms.RandomResizedCrop(size), transforms.RandomHorizontalFlip()]
    else:
        t += [transforms.Resize((size,size))]
    t += [transforms.ToTensor(), transforms.Normalize([0.485,0.456,0.406],[0.229,0.224,0.225])]
    return transforms.Compose(t)

def make_loaders(root, size, batch_size, augment):
    train_tf = make_transforms(size, augment)
    val_tf   = make_transforms(size, False)
    train_ds = datasets.ImageFolder(f"{root}/train", transform=train_tf)
    val_ds   = datasets.ImageFolder(f"{root}/val",   transform=val_tf)
    train_loader = DataLoader(train_ds, batch_size=batch_size, shuffle=True,  num_workers=4)
    val_loader   = DataLoader(val_ds,   batch_size=batch_size*2, shuffle=False, num_workers=4)
    return train_loader, val_loader
