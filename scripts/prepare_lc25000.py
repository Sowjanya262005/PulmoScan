#!/usr/bin/env python3
"""
Prepare LC25000 lung subset to 3-class folder layout:

Input (unzipped from Kaggle LC25000):
  ./LC25000/
    lung_aca/   (adenocarcinoma)
    lung_n/     (normal)
    lung_scc/   (squamous cell carcinoma)

Output (for training/configs/lungcancer.yaml):
  /data/lungcancer/
    train/{normal,adenocarcinoma,squamous}
    val/{normal,adenocarcinoma,squamous}
    test/{normal,adenocarcinoma,squamous}

Usage:
  python scripts/prepare_lc25000.py --src /path/to/LC25000 --dst /data/lungcancer --val 0.1 --test 0.1
"""

import os, argparse, shutil, random
from pathlib import Path

def split_copy(files, dst, val=0.1, test=0.1):
    random.shuffle(files)
    n = len(files)
    n_val, n_test = int(n*val), int(n*test)
    val_files = files[:n_val]
    test_files = files[n_val:n_val+n_test]
    train_files = files[n_val+n_test:]
    return train_files, val_files, test_files

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", required=True)
    ap.add_argument("--dst", required=True)
    ap.add_argument("--val", type=float, default=0.1)
    ap.add_argument("--test", type=float, default=0.1)
    args = ap.parse_args()

    mapping = {
        "lung_n": "normal",
        "lung_aca": "adenocarcinoma",
        "lung_scc": "squamous"
    }
    os.makedirs(args.dst, exist_ok=True)

    for k, cls in mapping.items():
        src_dir = Path(args.src)/k
        imgs = [str(p) for p in src_dir.glob("*") if p.is_file()]
        train, val, test = split_copy(imgs, args.dst, args.val, args.test)
        for split, files in [("train",train),("val",val),("test",test)]:
            outdir = Path(args.dst)/split/cls
            outdir.mkdir(parents=True, exist_ok=True)
            for fp in files:
                shutil.copy(fp, outdir/Path(fp).name)
    print("Done.")

if __name__ == "__main__":
    main()
