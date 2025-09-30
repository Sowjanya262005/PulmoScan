import argparse, yaml, os, torch, timm
from torch import nn
from torch.optim import AdamW
from torch.optim.lr_scheduler import CosineAnnealingLR
from sklearn.metrics import classification_report
from datasets import make_loaders
from utils import set_seed, accuracy

def main(cfg_path):
    cfg = yaml.safe_load(open(cfg_path))
    set_seed(42)
    device = 'cuda' if torch.cuda.is_available() else 'cpu'

    model = timm.create_model(cfg['weights'], pretrained=True, num_classes=cfg['num_classes'])
    model.to(device)
    opt = AdamW(model.parameters(), lr=cfg['lr'])
    sch = CosineAnnealingLR(opt, T_max=cfg['epochs'])
    criterion = nn.CrossEntropyLoss(label_smoothing=cfg.get('label_smoothing', 0.0))

    train_loader, val_loader = make_loaders(cfg['dataset_root'], cfg['img_size'], cfg['batch_size'], cfg['augment'])

    best_acc = 0.0
    os.makedirs(os.path.dirname(cfg['export_path']), exist_ok=True)

    for epoch in range(cfg['epochs']):
        model.train()
        total, correct = 0, 0
        for x,y in train_loader:
            x,y = x.to(device), y.to(device)
            opt.zero_grad(set_to_none=True)
            out = model(x)
            loss = criterion(out,y)
            loss.backward()
            opt.step()
            total += y.size(0)
            correct += (out.argmax(1)==y).sum().item()
        sch.step()
        tr_acc = correct/total

        # val
        model.eval()
        v_total, v_correct = 0, 0
        preds, gts = [], []
        with torch.inference_mode():
            for x,y in val_loader:
                x,y = x.to(device), y.to(device)
                out = model(x)
                v_total += y.size(0)
                v_correct += (out.argmax(1)==y).sum().item()
                preds += out.argmax(1).cpu().tolist()
                gts   += y.cpu().tolist()
        val_acc = v_correct/v_total
        print(f"Epoch {epoch+1}/{cfg['epochs']} | train_acc={tr_acc:.3f} val_acc={val_acc:.3f}")
        if val_acc > best_acc:
            torch.save(model.state_dict(), cfg['export_path'])
            best_acc = val_acc
            print(f"  ✓ Saved best to {cfg['export_path']}")

    print("\nValidation classification report:")
    print(classification_report(gts, preds))

if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--config", required=True)
    args = ap.parse_args()
    main(args.config)
